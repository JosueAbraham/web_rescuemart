
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import Home from './Home';
import Catalogo from './Catalogo';
import DetalleProducto from './DetalleProducto';
import Footer from './Footer';
import GoogleAnalytics from './GoogleAnalytics';
import CookieConsent from 'react-cookie-consent';

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
  display: ${({ cookiesAccepted }) => (cookiesAccepted ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Content = styled.main`
  flex: 1;
  opacity: ${({ cookiesAccepted }) => (cookiesAccepted ? '1' : '0.5')};
  pointer-events: ${({ cookiesAccepted }) => (cookiesAccepted ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
  position: relative;
  z-index: 1;
`;

const HeaderContainer = styled.header`
  opacity: ${({ cookiesAccepted }) => (cookiesAccepted ? '1' : '0.5')};
  pointer-events: ${({ cookiesAccepted }) => (cookiesAccepted ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
`;

const FooterContainer = styled.footer`
  opacity: ${({ cookiesAccepted }) => (cookiesAccepted ? '1' : '0.5')};
  pointer-events: ${({ cookiesAccepted }) => (cookiesAccepted ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
`;

const StyledCookieConsent = styled(CookieConsent)`
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
  display: ${({ cookiesAccepted }) => (cookiesAccepted ? 'none' : 'flex')};
  flex-direction: column;
  align-items: center;

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
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  const handleAcceptCookies = () => {
    setCookiesAccepted(true);
    // También puedes realizar cualquier otra lógica relacionada con las cookies aquí
  };

  return (
    <>
      <GoogleAnalytics />
      <Router>
        <AppContainer>
          <Overlay cookiesAccepted={cookiesAccepted}>
            {!cookiesAccepted && (
              <StyledCookieConsent
                buttonText="Aceptar"
                cookieName="miCookie"
                onAccept={handleAcceptCookies}
              >
                Este sitio web utiliza cookies para mejorar tu experiencia.
                Al continuar utilizando este sitio, aceptas nuestro uso de cookies.
                Para obtener más información, consulta nuestra política de privacidad.
              </StyledCookieConsent>
            )}
          </Overlay>
          <HeaderContainer cookiesAccepted={cookiesAccepted}>
            <Header />
          </HeaderContainer>
          <Content cookiesAccepted={cookiesAccepted}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Catalogo" element={<Catalogo />} />
              <Route path="/productos/1" element={<DetalleProducto />} />
              <Route path="/productos/:id" element={<Catalogo />} />
            </Routes>
          </Content>
          <FooterContainer cookiesAccepted={cookiesAccepted}>
            <Footer />
          </FooterContainer>
        </AppContainer>
      </Router>
    </>
  );
};

export default App;
