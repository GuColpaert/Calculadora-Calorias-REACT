import React from 'react';
import Navigation from './components/Navigation';
import MainScreen from './components/MainScreen';
import Carousel from './components/Carousel'
import Calculadora from './components/Calculadora.js'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './App.css';

//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.bundle.min.js';
//import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
    return (
        <div>
        < Navigation/>
        < MainScreen/>
        < Carousel/>
        < Calculadora/>
      </div>
    );
  }

export default App;