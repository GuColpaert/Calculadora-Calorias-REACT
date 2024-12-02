import React, { useState } from "react";
import axios from "axios";
import "./styles/EnviarImagem.css";

function EnviarImagem({ onBack, onNext, setIngredientesDetectados }) {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      alert("Por favor, envie uma imagem!");
      return;
    }

    setIsLoading(true);
    
    try {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = async () => {
        const base64Image = reader.result.split(',')[1];

        try {
          const response = await axios.post('http://localhost:4000/pergunte-ao-gemini', {
            prompt: "Analise esta imagem de comida",
            image: base64Image
          });

          // Parse seguro da resposta
          let ingredientes = [];
          try {
            ingredientes = JSON.parse(response.data.completion);
          } catch (parseError) {
            console.error('Erro ao parsear ingredientes:', parseError);
            ingredientes = []; // Garante um array vazio em caso de erro
          }

          // Filtra ingredientes inválidos
          ingredientes = ingredientes.filter(ing => 
            ing.nome && 
            ing.quantidade && 
            typeof ing.nome === 'string' && 
            typeof ing.quantidade === 'number'
          );

          // Se não tiver ingredientes, mostra mensagem
          if (ingredientes.length === 0) {
            alert("Não foi possível identificar ingredientes na imagem.");
            setIsLoading(false);
            return;
          }
          
          // Passa os ingredientes para o componente pai
          // IMPORTANTE: Verifica se a função existe antes de chamar
          if (typeof setIngredientesDetectados === 'function') {
            setIngredientesDetectados(ingredientes);
          } else {
            console.error('setIngredientesDetectados não é uma função');
          }
          
          onNext();
        } catch (error) {
          console.error("Erro ao processar imagem:", error);
          alert("Erro ao processar imagem. Tente novamente.");
        }
      };
    } catch (error) {
      console.error("Erro ao carregar imagem:", error);
      alert("Erro ao carregar imagem. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="enviar-imagem-container">
      <div className="robot">
        <p>Olá! Por favor, envie uma imagem do seu prato para continuarmos.</p>
      </div>
      <div className="upload-area">
        {image ? (
          <img src={image} alt="Pré-visualização" className="image-preview" />
        ) : (
          <label htmlFor="image-upload" className="upload-label">
            <span className="upload-icon">📷</span>
            Clique para enviar sua imagem
          </label>
        )}
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>
      <div className="form-buttons">
        <button type="button" onClick={onBack} className="voltar-button">
          Voltar
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="continuar-button"
          disabled={!image || isLoading}
        >
          {isLoading ? 'Processando...' : 'Continuar'}
        </button>
      </div>
    </div>
  );
}

export default EnviarImagem;