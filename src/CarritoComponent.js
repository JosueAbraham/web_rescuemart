// CarritoComponent.js

import React, { useState, useEffect } from 'react';
import PaypalButton from './Paypal_Button';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart,faTrash} from '@fortawesome/free-solid-svg-icons';

const CarritoContainer = styled.div`
max-width: 1000px;
margin: 20px 10% 20px 10%; // Cambiado a 'auto' en el eje horizontal
padding: 20px;
// Agregado para utilizar align-items
align-items: center;
justify-content: center; // Agregado para centrar en el eje horizontal
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
  justify-content: space-between; // Alinea los elementos al final (derecha) del contenedor
`;


const ItemImage = styled.img`
  max-width: 150px;
  margin-right: 10px;
`;

const CarritoTotal = styled.div`
  margin-top: 20px;
  text-align: right;
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column; // Alinea los elementos en columna
  font-size: 16px;
`;
const StyledButtonDeleteAll = styled.button`
margin: 10px auto; // Margen superior e inferior de 10px, y margen automático en los lados para centrar
background-color: #dd2a62;
color: white;
padding: 12px 20px; // Aumenta el tamaño del botón
border: none;
border-radius: 6px;
font-size: 18px; // Aumenta el tamaño del texto
cursor: pointer;

&:hover {
  background-color: #ff6630;
}
`;
const StyledButtonDelete = styled.button`
  margin: 10px auto; // Margen superior e inferior de 10px, y margen automático en los lados para centrar
  background-color: #dd2a62;
  color: white;
  padding: 12px 10px; // Aumenta el tamaño del botón
  border: none;
  border-radius: 6px;
  font-size: 18px; // Aumenta el tamaño del texto
  cursor: pointer;

  &:hover {
    background-color: #ff6630;
  }
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const QuantityLabel = styled.p`
  font-size: 16px;
  margin-right: 10px;
`;

const QuantityInput = styled.input`
  width: 60px;
  padding: 8px;
  text-align: center;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #e44d26;
    box-shadow: 0 0 5px rgba(228, 77, 38, 0.7);
  }
`;
const Header = styled.header`
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 10px;
`;
const Price = styled.div`
  font-size: 20px;
  color: #e44d26;
`;

const EmptyCartMessage = styled.p`
  font-size: 18px;
  text-align: center;
  color: #555;
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
    <>
    <Helmet>
        <title>Carrito de compras - RescueMart</title>
        <meta name="description" content="Bienvenido al carrito de compras de RescueMart, tu fuente confiable para productos de primeros auxilios de alta calidad. Estamos comprometidos en proporcionar los mejores productos y servicios para tu seguridad y bienestar." />
        <meta name="keywords" content="Rescuemart,
Productos de primeros auxilios,
Seguridad y bienestar,
Misión y visión,
Preparación en situaciones de emergencia,
Excelencia, innovación, compromiso con la seguridad,
Carrito de compras" />

      </Helmet>
    <CarritoContainer>
      <Header>
              <h1><FontAwesomeIcon icon={faShoppingCart} /> Carrito de compras</h1>
            </Header>
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
                  <Quantity>
  <QuantityLabel><strong>Cantidad: </strong></QuantityLabel>
                    <QuantityInput
                      type="number"
                      value={item.cantidad}
                      onChange={(e) =>
                        handleEditarCantidad(
                          index,
                          parseInt(e.target.value, 10)
                        )
                      }
                    />
  </Quantity>
                  </p>
                  <p><strong>Precio: </strong>${item.precio.toFixed(2)}</p></ItemDetails>
                  <StyledButtonDelete onClick={() => handleEliminarProducto(index)}>
                  <FontAwesomeIcon icon={faTrash} /> 
                  </StyledButtonDelete>
                
              </ItemInfo>
            </CarritoItem>
          ))}
        </CarritoList>
      ) : (
        <EmptyCartMessage>¡Ups! Parece que tu carrito está vacío. ¿Por qué no agregas algunos productos?</EmptyCartMessage>
     
      )}
      {carrito.length > 0 && (
        <CarritoTotal>
          <Price><strong>Total: </strong>${calcularPrecioTotal(carrito).toFixed(2)}</Price><br></br>
          <PaypalButton key={calcularPrecioTotal(carrito)} precio={calcularPrecioTotal(carrito).toFixed(2)} />
          <StyledButtonDeleteAll onClick={handleVaciarCarrito}><FontAwesomeIcon icon={faTrash} /> Vaciar Carrito</StyledButtonDeleteAll>
        </CarritoTotal>
      )}
    </CarritoContainer></>
  );
};

export default CarritoComponent;