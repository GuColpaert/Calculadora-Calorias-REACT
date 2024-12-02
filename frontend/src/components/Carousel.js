import React from "react";
import "./styles/Carousel.css";

const integrantes = [
  { nome: "Gustavo Colpaert", foto: "https://via.placeholder.com/150" },
  { nome: "Maria Silva", foto: "https://via.placeholder.com/150" },
  { nome: "João Souza", foto: "https://via.placeholder.com/150" },
  { nome: "Ana Paula", foto: "https://via.placeholder.com/150" },
  { nome: "Carlos Pereira", foto: "https://via.placeholder.com/150" },
  { nome: "Fernanda Lima", foto: "https://via.placeholder.com/150" },
  { nome: "Lucas Almeida", foto: "https://via.placeholder.com/150" },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const totalItems = integrantes.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % totalItems);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 3 + totalItems) % totalItems
    );
  };

  // Mostrar 3 itens por vez
  const visibleItems = [
    integrantes[currentIndex],
    integrantes[(currentIndex + 1) % totalItems],
    integrantes[(currentIndex + 2) % totalItems],
  ];

  return (
    <div className="carousel-container">
      <h2>INTEGRANTES</h2>
      <div className="carousel-content">
        <button className="carousel-arrow" onClick={handlePrev}>
          &#8249;
        </button>
        <div className="carousel-items">
          {visibleItems.map((integrante, index) => (
            <div key={index} className="carousel-item">
              <img
                src={integrante.foto}
                alt={integrante.nome}
                className="carousel-image"
              />
              <p className="nomes">{integrante.nome}</p>
            </div>
          ))}
        </div>
        <button className="carousel-arrow" onClick={handleNext}>
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Carousel;