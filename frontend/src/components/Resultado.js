import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faArrowUp, faWeight, faBalanceScale } from "@fortawesome/free-solid-svg-icons";
import "./styles/Resultado.css";

function Resultado({ onBack, resultados }) {
  // Se não houver resultados, mostra um placeholder ou mensagem de carregamento
  if (!resultados) {
    return (
      <div className="resultado-container">
        <h2>Calculando resultados...</h2>
        <button onClick={onBack} className="go-back-button">Voltar</button>
      </div>
    );
  }

  return (
    <div className="resultado-container">
      <h2>Resultados do Prato</h2>
      
      <div className="result-card">
        <h3>Calorias Totais</h3>
        <p className="result-value">{resultados.caloriasTotaisIngredientes} kcal</p>
        <FontAwesomeIcon icon={faFire} className="result-icon" />
      </div>
      
      <div className="result-card">
        <h3>Calorias para Ganho de Massa</h3>
        <p className="result-value">{resultados.caloriasGanhoMassa} kcal</p>
        <FontAwesomeIcon icon={faArrowUp} className="result-icon" />
      </div>
      
      <div className="result-card">
        <h3>Calorias para Perda de Peso</h3>
        <p className="result-value">{resultados.caloriasPerdaPeso} kcal</p>
        <FontAwesomeIcon icon={faWeight} className="result-icon" />
      </div>
      
      <div className="result-card">
        <h3>Calorias para Manutenção</h3>
        <p className="result-value">{resultados.caloriasManutenção} kcal</p>
        <FontAwesomeIcon icon={faBalanceScale} className="result-icon" />
      </div>

      <div className="actions">
        <button onClick={onBack} className="go-back-button">Voltar</button>
      </div>
    </div>
  );
}

export default Resultado;