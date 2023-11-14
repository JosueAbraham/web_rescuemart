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
  background-color: #fff;
  color: #333;
  padding: 20px;
  font-size: 16px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  max-width: 400px;

  & p {
    margin-bottom: 20px;
  }

  & button {
    background-color: #4caf50;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 14px;
    border-radius: 4px;
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
              <h2>Términos y condiciones de "RescueMart" </h2>
              <p>
                Nosotros, en RescueMart, nos comprometemos a proteger tu privacidad. Para obtener detalles específicos sobre cómo recopilamos, utilizamos y protegemos tu información personal, te invitamos a revisar nuestra política de privacidad.

En RescueMart, valoramos la confianza que depositas en nosotros al utilizar nuestros servicios. Estamos aquí para proporcionarte productos y servicios de alta calidad que contribuyan a tu seguridad y bienestar en situaciones de emergencia.

Al aceptar estos términos, reconoces y aceptas las prácticas descritas en nuestros términos y condiciones, así como en nuestra política de privacidad. Si no estás de acuerdo con alguno de estos términos, te recomendamos que no utilices nuestros servicios.
              </p>
              <button onClick={handleAccept}>Aceptar cookies</button>
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

