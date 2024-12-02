import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./styles/Ingredientes.css";

function Ingredientes({ onContinue, ingredientesIniciais = [] }) {
  const [ingredients, setIngredients] = useState(
    ingredientesIniciais.length > 0 
      ? ingredientesIniciais.map((ing, index) => ({
          id: index + 1,
          nome: ing.nome,
          quantidade: ing.quantidade
        }))
      : [{ id: 1, nome: "", quantidade: "" }]
  );
  
  const [error, setError] = useState(false);

  const handleIngredientChange = (id, value) => {
    const updatedIngredients = ingredients.map((ingredient) =>
      ingredient.id === id ? { ...ingredient, nome: value } : ingredient
    );
    setIngredients(updatedIngredients);
  };

  const handleQuantityChange = (id, value) => {
    const updatedIngredients = ingredients.map((ingredient) =>
      ingredient.id === id ? { ...ingredient, quantidade: value } : ingredient
    );
    setIngredients(updatedIngredients);
  };

  const handleAddIngredient = () => {
    const newIngredient = {
      id: ingredients.length + 1,
      nome: "",
      quantidade: "",
    };
    setIngredients([...ingredients, newIngredient]);
  };

  const handleRemoveIngredient = (id) => {
    const updatedIngredients = ingredients.filter(
      (ingredient) => ingredient.id !== id
    );
    setIngredients(updatedIngredients);
  };

  const handleContinue = () => {
    // Verifica se há pelo menos um ingrediente válido
    if (ingredients.length === 0 || ingredients.some((ingredient) => !ingredient.nome || !ingredient.quantidade)) {
      setError(true);
    } else {
      setError(false);
      // Passe os ingredientes para o próximo passo
      onContinue(ingredients);
    }
  };

  return (
    <div className="ingredientes-container">
      <h2>Ingredientes da Imagem</h2>
      {error && (
        <div className="error-message">
          <p>Por favor, adicione pelo menos um ingrediente com a quantidade!</p>
        </div>
      )}
      <table className="ingredients-table">
        <thead>
          <tr>
            <th>Ingrediente</th>
            <th>Quantidade (em gramas)</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient) => (
            <tr key={ingredient.id}>
              <td>
                <input
                  type="text"
                  value={ingredient.nome}
                  onChange={(e) => handleIngredientChange(ingredient.id, e.target.value)}
                  className="ingredient-input"
                />
              </td>
              <td className="quantity-cell">
                <input
                  type="number"
                  value={ingredient.quantidade}
                  onChange={(e) => handleQuantityChange(ingredient.id, e.target.value)}
                  className="quantity-input"
                />
                <span className="unit">g</span> {/* Colocando o "g" ao lado */}
              </td>
              <td>
                <button
                  className="remove-button"
                  onClick={() => handleRemoveIngredient(ingredient.id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="actions">
        <button className="add-button" onClick={handleAddIngredient}>
          Adicionar Ingrediente
        </button>
        <button className="continue-button" onClick={handleContinue}>
          Continuar
        </button>
      </div>
    </div>
  );
}

export default Ingredientes;