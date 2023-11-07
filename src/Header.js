import React from 'react'
import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';




const Header = () => {
  return (
    <HeaderContainer>
      {/* Utiliza la etiqueta <img> para mostrar la imagen de tu tienda */}
      <img src="/logo.png.png" alt="8" style={{ width: '100px', height: 'auto' }} />

      <Nav>
        <StyledNavLink to="/" exact>Inicio</StyledNavLink>
        <StyledNavLink to="/Catalogo">Catálogo</StyledNavLink>
        <input type="text" placeholder="Buscar" />
        <StyledNavLink to="/cart">Carrito</StyledNavLink>
        <StyledNavLink to="/login">Iniciar Sesión</StyledNavLink>
        <StyledNavLink to="/register">Registrarse</StyledNavLink>
      </Nav>
    </HeaderContainer>
  );
}



const HeaderContainer = styled.header`
  background-color: #368591;
  color: #fff;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #ffff; /* Cambia el color de los enlaces a blanco */
  /* Puedes agregar más estilos según tus preferencias, por ejemplo, hover, font-size, etc. */
`;

export default Header;