import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faBox, faUsers, faListAlt } from '@fortawesome/free-solid-svg-icons';

const MenuContainer = styled.nav`
  background-color: #333;
  padding: 10px;
`;

const MenuList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
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

const Menu = () => {
  return (
    <MenuContainer>
      <img src="/logo.png.png" alt="8" style={{ width: '100px', height: 'auto' }} />
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
        {/* Agrega más enlaces según sea necesario */}
      </MenuList>
    </MenuContainer>
  );
};

export default Menu;
