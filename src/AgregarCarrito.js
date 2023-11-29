import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const ButtonCarrito = styled.button`
margin: 10px auto; // Margen superior e inferior de 10px, y margen automático en los lados para centrar
background-color: #333333;
color: white;
padding: 12px 20px; // Aumenta el tamaño del botón
border: none;
border-radius: 6px;
font-size: 18px; // Aumenta el tamaño del texto
cursor: pointer;

&:hover {
  background-color: #0C6DA7;
}
`;

const AgregadoExitosamente = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #333333;
  color: #fff;
  text-align: center;
  padding: 15px;
  font-size: 18px;
  z-index: 1000;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transform: translateY(${({ show }) => (show ? '0' : '-100%')});
  transition: opacity 0.3s ease, transform 0.3s ease;
`;

const AgregarCarrito = ({ selectedProduct, cantidad }) => {
  const [carrito, setCarrito] = useState([]);
  const [mensajeAgregado, setMensajeAgregado] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem('carrito');
    if (storedCart) {
      setCarrito(JSON.parse(storedCart));
    }
  }, []);

  const handleAgregarAlCarrito = () => {
    // Lógica para agregar al carrito
    const nuevoCarrito = [...carrito, { ...selectedProduct, cantidad }];
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    setMensajeAgregado(true);
    setTimeout(() => {
      setMensajeAgregado(false);
    }, 3000);
  };

  return (
    <>
     
      <ButtonCarrito onClick={handleAgregarAlCarrito}>
        <FontAwesomeIcon icon={faShoppingCart} /> Agregar al carrito
      </ButtonCarrito>
      {mensajeAgregado && (
        <AgregadoExitosamente show={mensajeAgregado}>
          <FontAwesomeIcon icon={faShoppingCart} /> Producto agregado al carrito exitosamente
        </AgregadoExitosamente>
      )}
    </>
  );
};

export default AgregarCarrito;
