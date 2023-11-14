import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import Home from './Home';
import Catalogo from './Catalogo';
import DetalleProducto from './DetalleProducto';
import Footer from './Footer';
import GoogleAnalytics from './GoogleAnalytics';

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: ${({ showOverlay }) => (showOverlay ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const StyledCookieConsent = styled.div`
  background-color: #333;
  color: #fff;
  padding: 20px;
  font-size: 16px;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;

  & button {
    background-color: #4caf50;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 14px;
    margin-top: 10px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #45a049;
    }
  }
`;

const App = () => {
  const [showOverlay, setShowOverlay] = useState(true);

  const handleAccept = () => {
    setShowOverlay(false);
  };

  return (
    <>
      <GoogleAnalytics />
      <Router>
        <AppContainer>
          <Overlay showOverlay={showOverlay}>
            <StyledCookieConsent>
              <p>
                Este sitio web utiliza un diseño de consentimiento para mejorar tu experiencia.
                Al continuar utilizando este sitio, aceptas nuestro uso del diseño.
                Para obtener más información, consulta nuestra política de privacidad.
              </p>
              <button onClick={handleAccept}>Aceptar</button>
            </StyledCookieConsent>
          </Overlay>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Catalogo" element={<Catalogo />} />
            <Route path="/productos/1" element={<DetalleProducto />} />
            <Route path="/productos/:id" element={<Catalogo />} />
          </Routes>
          <Footer />
        </AppContainer>
      </Router>
    </>
  );
};

export default App;

