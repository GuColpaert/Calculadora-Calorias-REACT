import React, { useEffect, useState } from "react";
import "./styles/MainScreen.css";
import raio from "../assets/raio.png";
import wifi from "../assets/wifi.png";
import ai from "../assets/ai.png";
import inovativa from "../assets/inovativa.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const MainScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 4); // Altera o índice do ícone ativo
    }, 900); // Altera a cada 3 segundos

    return () => clearInterval(interval); // Limpa o intervalo quando o componente for desmontado
  }, []);

  return (
    <div className="main-container">
      <h1>
        CALCULE SUA DIETA EM SEGUNDOS <br /> COM A <span className="highlight">NUTRI AI</span>
      </h1>
      <div className="features">
        <div className={`circle-container ${activeIndex === 0 ? "active" : ""}`}>
          <div className="icon-circle">
            <img src={raio} alt="Rápido e Prático" />
          </div>
          <p>RÁPIDO E PRÁTICO</p>
        </div>
        <div className={`circle-container ${activeIndex === 1 ? "active" : ""}`}>
          <div className="icon-circle">
            <img src={wifi} alt="Online" />
          </div>
          <p>ONLINE</p>
        </div>
        <div className={`circle-container ${activeIndex === 2 ? "active" : ""}`}>
          <div className="icon-circle">
            <img src={ai} alt="Utiliza IA" />
          </div>
          <p>UTILIZA IA</p>
        </div>
        <div className={`circle-container ${activeIndex === 3 ? "active" : ""}`}>
          <div className="icon-circle">
            <img src={inovativa} alt="Inovador" />
          </div>
          <p>INOVADOR</p>
        </div>
      </div>
      <button className="calculate-button">
        CALCULE AGORA <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
      </button>
    </div>
  );
};

export default MainScreen;