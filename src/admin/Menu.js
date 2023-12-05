import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faBox, faUsers, faListAlt, faBars, faClose } from '@fortawesome/free-solid-svg-icons';

const MenuContainer = styled.nav`
  background-color: #333;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0px;
`;

const MenuList = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuItem = styled.li`
  margin-right: 20px;
`;

const MenuLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;

  &:hover {
    color: #ffcc00;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
`;

const BurgerIcon = styled(FontAwesomeIcon)`
  display: none;
  cursor: pointer;
  color: #fff;
  font-size: 24px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  color:  #333;
  top: 60px;
  left: 0;
  
  background-color: #333;
  display: ${(props) => (props.open ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  padding: 10px;
margin-top: 0px;
  @media (min-width: 769px) {
    display: none;
  }
`;

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <MenuContainer>
        <img
          src="/logo.png.png"
          alt="8"
          style={{ width: '100px', height: 'auto' }}
        />
        <MenuList>
          <MenuItem>
            <MenuLink to="/">
              <Icon icon={faStore} /> Ir a la tienda
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/admin/products">
              <Icon icon={faBox} /> Productos
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/admin/users">
              <Icon icon={faUsers} /> Usuarios
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/admin/categories">
              <Icon icon={faListAlt} /> Categorías
            </MenuLink>
          </MenuItem>
        </MenuList>
        <BurgerIcon icon={faBars} onClick={toggleMenu} />
      </MenuContainer>
      <MobileMenu open={menuOpen}>
        <MenuItem>
          <MenuLink to="/">
            <Icon icon={faStore} /> Ir a la tienda
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/admin/products">
            <Icon icon={faBox} /> Productos
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/admin/users">
            <Icon icon={faUsers} /> Usuarios
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/admin/categories">
            <Icon icon={faListAlt} /> Categorías
          </MenuLink>
        </MenuItem>
      </MobileMenu>
    </>
  );
};

export default Menu;
