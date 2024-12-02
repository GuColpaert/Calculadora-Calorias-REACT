import React, { useState } from "react";
import "./styles/Tabela.css";

function Tabela({ onBack, onSubmit }) {
  const [formData, setFormData] = useState({
    altura: "",
    peso: "",
    sexo: "",
    idade: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSexoChange = (sexo) => {
    setFormData({ ...formData, sexo });
  };

const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Dados preenchidos:", formData);
  
  // Agora enviamos os dados diretamente para o componente pai
  onSubmit(formData);
};

  return (
    <div className="tabela-container">
      <h2>Preencha suas Informações</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Altura (cm):</label>
          <input
            type="number"
            name="altura"
            value={formData.altura}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Peso Atual (kg):</label>
          <input
            type="number"
            name="peso"
            value={formData.peso}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Sexo:</label>
          <div className="sexo-buttons">
            <button
              type="button"
              className={`sexo-button ${formData.sexo === "Masculino" ? "selected" : ""}`}
              onClick={() => handleSexoChange("Masculino")}
            >
              Masculino
            </button>
            <button
              type="button"
              className={`sexo-button ${formData.sexo === "Feminino" ? "selected" : ""}`}
              onClick={() => handleSexoChange("Feminino")}
            >
              Feminino
            </button>
          </div>
        </div>
        <div className="form-group">
          <label>Idade:</label>
          <input
            type="number"
            name="idade"
            value={formData.idade}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-buttons">
          <button type="button" onClick={onBack} className="voltar-button">
            Voltar
          </button>
          <button type="submit" className="continuar-button">
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Tabela;