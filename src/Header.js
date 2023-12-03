// Header.js
import React, { useState} from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faShoppingCart, faSignInAlt, faUserPlus, faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const history = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      // Usar encodeURIComponent para asegurar que los caracteres especiales se manejen correctamente en la URL
      history(`/search/${encodeURIComponent(searchQuery)}`);
      // También puedes realizar acciones adicionales, como la obtención de datos, aquí
    }
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <HeaderContainer>
      <LogoContainer>
        <LogoNavLink to="/" exact>
          <Logo src="logo.png.png" alt="Logo de la tienda" />
        </LogoNavLink>
      </LogoContainer>
      <MobileMenuIcon onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </MobileMenuIcon>
      <Nav menuOpen={menuOpen}>
        <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Buscar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
       
        <SearchButton onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </SearchButton>
      </SearchContainer>
        <NavLinks>
          <NavLinkItem to="/" exact onClick={toggleMenu}>
            <FontAwesomeIcon icon={faHome} /> Inicio
          </NavLinkItem>
          <NavLinkItem to="/catalogo" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faList} /> Catálogo
          </NavLinkItem>
          <NavLinkItem to="/cart" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faShoppingCart} /> Carrito
          </NavLinkItem>
          <NavLinkItem to="/login" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faSignInAlt} /> Iniciar Sesión
          </NavLinkItem>
          <NavLinkItem to="/register" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faUserPlus} /> Registrarse
          </NavLinkItem>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: #368591;
  color: #fff;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoNavLink = styled(NavLink)`
  text-decoration: none;
  color: #fff;
`;

const Logo = styled.img`
  width: 100px;
  height: auto;
`;

const MobileMenuIcon = styled.div`
  display: none;
  cursor: pointer;
  font-size: 24px;

  @media (max-width: 768px) {
    display: block;
    margin-left: auto;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${({ menuOpen }) => (menuOpen ? '10px' : '0')};
    display: ${({ menuOpen }) => (menuOpen ? 'flex' : 'none')};
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;

  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid #fff;
  border-radius: 4px;
  font-size: 14px;
  margin-right: 5px;

  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const SearchButton = styled.button`
  background-color: #36a6f2;
  color: white;
  padding: 10px 12px;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: #6de1ff;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const NavLinkItem = styled(NavLink)`
  text-decoration: none;
  color: #fff;
  transition: color 0.3s ease;

  &:hover {
    color: #ffcc00;
  }
`;

export default Header;
