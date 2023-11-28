import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderContainer>
      {/* Utiliza la etiqueta <img> para mostrar la imagen de tu tienda */}
      <Logo src="/logo.png.png" alt="Logo de la tienda" />

      <Nav>
        <StyledNavLink to="/" exact>
          Inicio
        </StyledNavLink>
        <StyledNavLink to="/catalogo">Catálogo</StyledNavLink>
        <SearchInput type="text" placeholder="Buscar" />
        <StyledNavLink to="/cart">Carrito</StyledNavLink>
        <StyledNavLink to="/login">Iniciar Sesión</StyledNavLink>
        <StyledNavLink to="/register">Registrarse</StyledNavLink>
      </Nav>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: #368591;
  color: #fff;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  width: 100px;
  height: auto;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #fff;
  transition: color 0.3s ease; /* Añade una transición suave al color */

  &:hover {
    color: #ffcc00; /* Cambia el color al pasar el ratón */
  }
`;

const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid #fff;
  border-radius: 4px;
  margin-right: 10px;
  font-size: 14px;

  ::placeholder {
    color: #fff;
  }
`;

export default Header;
