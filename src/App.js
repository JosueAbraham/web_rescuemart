import React from 'react'
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
  min-height: 100vh; /* Establece el alto mínimo para todo el viewport */
`;

const Content = styled.main`
  flex: 1; /* Permite que el contenido principal ocupe el espacio disponible */
`;

const StyledCookieConsent = styled(CookieConsent)`
  /* Estilos personalizados aquí */
  background-color: #2b2b2b;
  color: #fff;
  padding: 40px; /* Aumenté el padding */
  font-size: 24px; /* Aumenté el tamaño de la fuente */
  text-align: center;

  & button {
    background-color: #4caf50;
    color: #fff;
    border: none;
    padding: 20px 40px; /* Aumenté el padding del botón */
    cursor: pointer;
    font-size: 18px; /* Aumenté el tamaño de la fuente del botón */
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #45a049;
    }
  }
`;

const App = () => {
  return (
    <>
    <GoogleAnalytics />
    <Router>
      <AppContainer>
        <Header>
        <meta name="description" content="Bienvenido a RescueMart, tu fuente confiable para productos de primeros auxilios de alta calidad. Estamos comprometidos en proporcionar los mejores productos y servicios para tu seguridad y bienestar." />
        </Header>
        <Content>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Catalogo" element={<Catalogo />} />
            <Route path="/productos/1" element={<DetalleProducto />} />
            <Route path="/productos/:id" element={<Catalogo />} />
          </Routes>
        </Content>
        <Footer />
      </AppContainer>
    </Router>
    <StyledCookieConsent
        location="bottom"
        buttonText="Aceptar"
        cookieName="miCookie"
        enableDeclineButton
        declineButtonText="Rechazar"
      >
       Este sitio web utiliza cookies para mejorar tu experiencia. 
       Al continuar utilizando este sitio, aceptas nuestro uso de cookies. 
       Para obtener más información, consulta nuestra política de privacidad.
     
      </StyledCookieConsent>
    </>
  );
}

export default App;
