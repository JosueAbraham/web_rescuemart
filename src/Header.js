import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faShoppingCart, faSignInAlt, faUserPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <HeaderContainer>
      <LogoNavLink to="/" exact>
        <Logo src="/logo.png.png" alt="Logo de la tienda" />
      </LogoNavLink>
      <Nav>
        <SearchInput type="text" placeholder="Buscar" />


        <StyledNavLink to="/" exact>
          <FontAwesomeIcon icon={faHome} /> Inicio
        </StyledNavLink>
        <StyledNavLink to="/catalogo">
          <FontAwesomeIcon icon={faList} /> Catálogo
        </StyledNavLink>

        <StyledNavLink to="/cart">
          <FontAwesomeIcon icon={faShoppingCart} /> Carrito
        </StyledNavLink>
        <StyledNavLink to="/login">
          <FontAwesomeIcon icon={faSignInAlt} /> Iniciar Sesión
        </StyledNavLink>
        <StyledNavLink to="/register">
          <FontAwesomeIcon icon={faUserPlus} /> Registrarse
        </StyledNavLink>
      </Nav>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: #368591;
  color: #fff;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const LogoNavLink = styled(NavLink)`
  text-decoration: none;
  color: #fff;
`;

const Logo = styled.img`
  width: 100px;
  height: auto;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 20px;
    margin-top: 0;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #fff;
  transition: color 0.3s ease;

  &:hover {
    color: #ffcc00;
  }
`;

const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid #fff;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 10px;

  ::placeholder {
    color: #fff;
  }

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

export default Header;