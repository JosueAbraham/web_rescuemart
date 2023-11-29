// CarritoComponent.js

import React, { useState, useEffect } from 'react';
import PaypalButton from './Paypal_Button';
import styled from 'styled-components';

const CarritoContainer = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const CarritoList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CarritoItem = styled.li`
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ItemImage = styled.img`
  max-width: 50px;
  margin-right: 10px;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const CarritoTotal = styled.div`
  margin-top: 20px;
  text-align: right;
`;

const StyledButton = styled.button`
  background-color: #dd2a62;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #ff6630;
  }
`;
const CarritoComponent = () => {

  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('carrito');
    if (storedCart) {
      setCarrito(JSON.parse(storedCart));
    }
  }, []);

  const handleEliminarProducto = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const handleEditarCantidad = (index, nuevaCantidad) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito[index].cantidad = nuevaCantidad;
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const handleVaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem('carrito');
  };

  const calcularPrecioTotal = (productos) => {
    return productos.reduce((total, producto) => {
      return total + producto.precio * producto.cantidad;
    }, 0);
  };

  return (
    <CarritoContainer>
      <h2>Carrito de Compras</h2>
      {carrito.length > 0 ? (
        <CarritoList>
          {carrito.map((item, index) => (
            <CarritoItem key={index}>
              <ItemInfo>
                <ItemImage
                  src={process.env.PUBLIC_URL + '/' + item.imagen}
                  alt={item.nombre}
                />
                <ItemDetails>
                  <strong>{item.nombre}</strong>
                  <p>
                    Cantidad:{' '}
                    <input
                      type="number"
                      value={item.cantidad}
                      onChange={(e) =>
                        handleEditarCantidad(
                          index,
                          parseInt(e.target.value, 10)
                        )
                      }
                    />
                  </p>
                  <p>Precio: ${item.precio.toFixed(2)}</p>
                  <StyledButton onClick={() => handleEliminarProducto(index)}>
                    Eliminar
                  </StyledButton>
                </ItemDetails>
              </ItemInfo>
            </CarritoItem>
          ))}
        </CarritoList>
      ) : (
        <p>El carrito está vacío</p>
      )}
      {carrito.length > 0 && (
        <CarritoTotal>
          <p>Total: ${calcularPrecioTotal(carrito).toFixed(2)}</p>
          <PaypalButton precio={calcularPrecioTotal(carrito).toFixed(2)} />
          <StyledButton onClick={handleVaciarCarrito}>Vaciar Carrito</StyledButton>
        </CarritoTotal>
      )}
    </CarritoContainer>
  );
};

export default CarritoComponent;