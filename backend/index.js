require('dotenv').config();
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require("cors");
const app = express();

// Função middleware para lidar com JSON
app.use(express.json({ limit: '10mb' })); // Aumenta o limite para 10 megabytes
// Habilita CORS para qualquer origem (ajustável para uma URL específica)
app.use(cors({
  origin: '*', // Permite qualquer origem (melhor para desenvolvimento local, mas em produção use uma origem específica)
  methods: ["GET", "POST"], // Métodos permitidos
  allowedHeaders: ["Content-Type"] // Cabeçalhos permitidos
}));

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post('/pergunte-ao-gemini', async (req, res) => {
  const { prompt, image } = req.body;
  
  if (!prompt || !image) {
    return res.status(400).json({ error: 'Prompt e imagem são necessários.' });
  }

  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Converte imagem base64 para parte binária
    const imageBuffer = Buffer.from(image, 'base64');

    // Chama a API do Gemini com prompt e imagem
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [
        { 
          text: `Analise esta imagem de comida e me diga quais ingredientes estão presentes, com suas respectivas quantidades em gramas. 
          Responda SOMENTE com um array JSON no formato: [{"nome": "Ingrediente", "quantidade": 200}]. 
          Se não conseguir identificar, retorne um array vazio.` 
        },
        { inlineData: { mimeType: 'image/jpeg', data: image } }
      ]}]
    });

    // Extrair texto da resposta
    const responseText = result.response.text();
    console.log("Dados recebidos:", { responseText });

    
    // Tentar parsear o JSON
    let ingredientes = [];
    try {
      // Remove possíveis blocos de código markdown
      const jsonText = responseText.replace(/```json|```/g, '').trim();
      ingredientes = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('Erro ao parsear JSON:', parseError);
      console.log('Resposta original:', responseText);
    }

    res.json({ completion: JSON.stringify(ingredientes) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao se comunicar com a API Gemini.' });
  }
});

app.post('/enviar-dados', async (req, res) => {
  const { altura, peso, sexo, idade } = req.body;
  console.log("Dados recebidos:", { altura, peso, sexo, idade });

  // Inicializando o cliente do Gemini dentro desta rota
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
  });

  try {
    // Gerando a resposta com base nos dados recebidos
    const aiResponse = await model.generateContent(`Dados do usuário: altura ${altura}, peso ${peso}, sexo ${sexo}, idade ${idade}`);
    
    // Retornando a resposta gerada pela IA
    res.json({ data: aiResponse.response.text() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao se comunicar com a API Gemini.' });
  }
});

app.post('/calcular-calorias', async (req, res) => {
  const { dadosUsuario, ingredientes } = req.body;
  
  if (!dadosUsuario || !ingredientes || ingredientes.length === 0) {
    return res.status(400).json({ 
      error: 'Dados do usuário e ingredientes são necessários.' 
    });
  }

  console.log("Dados recebidos:", req.body);

  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
    Analise os seguintes dados e faça os cálculos calóricos solicitados.
    
    DADOS DO USUÁRIO:
    - Altura: ${dadosUsuario.altura}cm
    - Peso: ${dadosUsuario.peso}kg
    - Idade: ${dadosUsuario.idade}
    - Sexo: ${dadosUsuario.sexo}
    
    INGREDIENTES:
    ${ingredientes.map(ing => `- ${ing.nome}: ${ing.quantidade}g`).join('\n')}
    
    Por favor, retorne APENAS um objeto JSON com os seguintes cálculos:
    1. caloriasTotaisIngredientes: Some as calorias de todos os ingredientes listados
    2. caloriasGanhoMassa: Calcule as calorias necessárias para ganho de massa baseado nos dados do usuário (TMB + 500)
    3. caloriasPerdaPeso: Calcule as calorias para perda de peso (TMB - 500)
    4. caloriasManutenção: Calcule a Taxa Metabólica Basal (TMB) usando a fórmula de Harris-Benedict

    Retorne no formato:
    {
      "caloriasTotaisIngredientes": número,
      "caloriasGanhoMassa": número,
      "caloriasPerdaPeso": número,
      "caloriasManutenção": número
    }`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Remove possíveis blocos de código markdown e qualquer texto extra após o JSON
    const jsonText = responseText.replace(/```json|```/g, '').trim();

    // Tentando encontrar o JSON dentro do texto
    const startIdx = jsonText.indexOf("{");
    const endIdx = jsonText.lastIndexOf("}") + 1;
    const cleanJsonText = jsonText.substring(startIdx, endIdx); // Extrai apenas o JSON

    const calorias = JSON.parse(cleanJsonText);

    res.json(calorias);
  } catch (error) {
    console.error('Erro ao calcular calorias:', error);
    res.status(500).json({ 
      error: 'Erro ao calcular calorias. Tente novamente.' 
    });
  }
});

// Iniciando o servidor na porta 4000
app.listen(4000, () => {
  console.log('Servidor rodando na porta 4000');
});