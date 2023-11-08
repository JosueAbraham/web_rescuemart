import React from 'react'
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
  min-height: 100vh; /* Establece el alto mínimo para todo el viewport */
`;

const Content = styled.main`
  flex: 1; /* Permite que el contenido principal ocupe el espacio disponible */
`;

const App = () => {
  return (
    <>
    <GoogleAnalytics />
    <Router>
      <AppContainer>
        <Header />
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
    </>
  );
}

export default App;
