import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import Tabela from "./Tabela";
import EnviarImagem from "./EnviarImagem";
import Ingredientes from "./Ingredientes";
import Resultado from "./Resultado";
import "./styles/Calculadora.css";

function Calculadora() {
  const [ingredientesDetectados, setIngredientesDetectados] = useState([]);
  const [dadosUsuario, setDadosUsuario] = useState(null);
  const [resultadoCalorias, setResultadoCalorias] = useState(null);
  const [step, setStep] = useState("inicio");
  const [typedText, setTypedText] = useState("");
  const descriptionText = `Olá, sou sua calculadora de calorias inteligente e estou aqui pra te ajudar! Para começarmos clique em iniciar.`;

  useEffect(() => {
    if (step === "inicio") {
      let index = 0;

      const typeWriterEffect = () => {
        if (index < descriptionText.length) {
          setTypedText((prev) => descriptionText.slice(0, index + 1));
          index++;
          setTimeout(typeWriterEffect, 50);
        }
      };

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            typeWriterEffect();
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      const element = document.querySelector(".description");
      if (element) {
        observer.observe(element);
      }

      return () => observer.disconnect();
    }
  }, [step]);

  const handleStart = () => setStep("formulario");
  const handleBack = () => setStep("inicio");
  const formBack = () => setStep("formulario");
  const handleNext = () => setStep("enviarImagem");
  const handleImageNext = () => setStep("ingredientes"); // Passa para a tela de ingredientes
  const handleContinue = () => setStep("resultado"); // Passa para a tela de resultado

  const handleFormSubmit = (dados) => {
    setDadosUsuario(dados);
    setStep("enviarImagem");
  };

  const handleIngredientesSubmit = async (ingredientes) => {
    if (!ingredientes || !Array.isArray(ingredientes) || ingredientes.length === 0) {
      console.error("Erro: Ingredientes ausentes ou inválidos.");
      alert("Por favor, adicione pelo menos um ingrediente válido.");
      return;
    }
  
    if (!dadosUsuario) {
      console.error("Erro: Dados do usuário ausentes.");
      alert("Por favor, preencha os dados do usuário antes de continuar.");
      return;
    }
  
    // Verifique o que está sendo enviado
    console.log("Enviando dados:", { dadosUsuario, ingredientes });
  
    try {
      const response = await fetch("http://localhost:4000/calcular-calorias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dadosUsuario,
          ingredientes,
        }),
      });
  
      // Verifique o status da resposta e o conteúdo retornado
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Erro desconhecido no servidor.");
      }
  
      // Verifique a resposta do servidor
      const resultado = await response.json();
      console.log("Resultado recebido do servidor:", resultado);
  
      setResultadoCalorias(resultado);
      setStep("resultado");
    } catch (error) {
      console.error("Erro ao calcular calorias:", error.message || error);
      alert(`Erro ao calcular calorias: ${error.message || "Erro desconhecido."}`);
    }
  };

  return (
    <div className="calculadora-container">
      {step === "inicio" ? (
        <>
          <h1 className="title">CALCULADORA</h1>
          <div className="robot-container">
            <FontAwesomeIcon icon={faRobot} className="robot-icon" />
            <div className="speech-bubble">
              <p className="description">{typedText}</p>
            </div>
          </div>
          <button className="start-button" onClick={handleStart}>
            Iniciar
          </button>
        </>
      ) : step === "formulario" ? (
        <Tabela 
          onNext={handleNext}
          onBack={handleBack} 
          onSubmit={handleFormSubmit} 
        />
      ) : step === "enviarImagem" ? (
        <EnviarImagem 
          onBack={formBack} 
          onNext={handleImageNext}
          setIngredientesDetectados={setIngredientesDetectados}
        />
      ) : step === "ingredientes" ? (
        <Ingredientes 
          onContinue={handleIngredientesSubmit}
          ingredientesIniciais={ingredientesDetectados}
        />
      ) : step === "resultado" ? (
        <Resultado 
          onBack={handleBack}
          resultados={resultadoCalorias}
        />
      ) : null}
    </div>
  );
}

export default Calculadora;