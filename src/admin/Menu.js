import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
  transition: color 0.3s ease;

  &:hover {
    color: #ffcc00;
  }
`;

const Menu = () => {
  return (
    <MenuContainer>
        <img src="/logo.png.png" alt="8" style={{ width: '100px', height: 'auto' }} />
      <MenuList>
    
        <MenuItem>
        <MenuLink to="/">Ir a la tienda</MenuLink>ㅤㅤ
          <MenuLink to="/admin/products">Productos</MenuLink>ㅤㅤ
          <MenuLink to="/admin/users">Usuarios</MenuLink>

        </MenuItem>
        {/* Agrega más enlaces según sea necesario */}
      </MenuList>
    </MenuContainer>
  );
};

export default Menu;
