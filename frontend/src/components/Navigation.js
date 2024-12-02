import React, {useState} from 'react';
import './styles/Navigation.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from "../assets/logo.png"; // Importe a imagem da logo

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img 
          src={logo}
          alt="logo" 
          className="logo-image" 
        />
      </div>
      <div
        className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <span className="menu-bar"></span>
        <span className="menu-bar"></span>
        <span className="menu-bar"></span>
      </div>
      <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
        <li>
          <a href="#inicio">Início</a>
        </li>
        <li>
          <a href="#calculadora">Calculadora</a>
        </li>
        <li>
          <a href="#integrantes">Integrantes</a>
        </li>
        <li>
          <a href="#sobre">Sobre</a>
        </li>
        <li className="navbar-login">
          <i className="user-icon"></i>
          <span>Login</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;