import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome, faList, faShoppingCart, faSignInAlt, faUserPlus, faSearch, faBars, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from './AuthContext'; // Importa tu contexto de autenticación

const Header = () => {
  const history = useNavigate();
  const { isLoggedIn, logout } = useAuth(); // Utiliza el contexto de autenticación

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      history(`/search/${encodeURIComponent(searchQuery)}`);
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
          {isLoggedIn ? (
            <>
              <NavLinkItem to="/WishList" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faHeart} /> Lista de deseos
              </NavLinkItem>
              <NavLinkItem to="/perfil" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faUser} /> Perfil
              </NavLinkItem>
              <NavLinkItem to="/" onClick={toggleMenu}>
              <LogoutButton onClick={logout}>Cerrar Sesión</LogoutButton>
              </NavLinkItem>
            </>
          ) : (
            <>
              <NavLinkItem to="/login" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faSignInAlt} /> Iniciar Sesión
              </NavLinkItem>
              <NavLinkItem to="/register" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faUserPlus} /> Registrarse
              </NavLinkItem>
            </>
          )}
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

const LogoutButton = styled.button`
  background-color: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ffcc00;
  }
`;

export default Header;
