import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import userData from './userData.json';
import ordersData from './ordersData.json';

const OrderPopup = ({ order, onClose }) => {

  // Cambiar el estado de los datos del usuario
  const [userDataState, setUserData] = useState(userData);

  // Estado para las órdenes de compra
  const [orders, setOrders] = useState(ordersData);

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(process.env.PUBLIC_URL + '/products.json');
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <PopupOverlay>
      <PopupContainer>
        <h1>Detalles de la Orden #{order.id}</h1>
        <OrderStatus>
          <p><strong>Estado del Pago:</strong> {order.paymentStatus}</p>
          <p><strong>Estado del Pedido:</strong> {order.orderStatus}</p>
        </OrderStatus>
        <UserInfo>
          <p><strong>Nombre:</strong> {userData.name}</p>
          <p><strong>Teléfono:</strong> {userData.tel}</p>
          <p><strong>Correo:</strong> {userData.email}</p>
          <p><strong>Dirección de Envío:</strong> {userData.address}</p>
        </UserInfo>
        <OrderTable>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.idProduct && (
              <tr key={order.idProduct}>
                <td>{productos.find(producto => producto.id === order.idProduct)?.nombre}</td>
                <td>${productos.find(producto => producto.id === order.idProduct)?.precio}</td>
                <td>{order.cant}</td>
                <td>${(productos.find(producto => producto.id === order.idProduct)?.precio * order.cant)}</td>
              </tr>
            )}
          </tbody>
        </OrderTable>
        <OrderSummary>
          {order.idProduct && (
            <tr key={order.idProduct}>
              <p><strong>Subtotal:</strong> ${(productos.find(producto => producto.id === order.idProduct)?.precio * order.cant)}</p>
              <p><strong>Costo de Envío:</strong> ${order.shippingCost}</p>
              <p><strong>Impuesto (16%):</strong> ${(productos.find(producto => producto.id === order.idProduct)?.precio * order.cant * 0.16)}</p>
              <p><strong>Total:</strong> ${(productos.find(producto => producto.id === order.idProduct)?.precio * order.cant + order.shippingCost + productos.find(producto => producto.id === order.idProduct)?.precio * order.cant * 0.16)}</p>
            </tr>
          )}
        </OrderSummary>
        <CloseButton onClick={onClose}>Cerrar</CloseButton>
      </PopupContainer>
    </PopupOverlay>
  );
};

const PopupContainer = styled.div`
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%; /* 100% para pantallas pequeñas */
  max-width: 700px; /* Ancho máximo para pantallas grandes */
  background-color: white;
  padding: 20px;
  border: 1px solid #007bff; /* Azul */
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.5); /* Efecto de sombra difuminada azul */
  border-radius: 10px; /* Esquinas redondas */
  z-index: 999;

  h1 {
    color: #007bff;
  }
`;

const PopupOverlay = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.5);
z-index: 998;
`;

const UserInfo = styled.div`
text-align: left;
margin-bottom: 20px;
`;

const OrderStatus = styled.div`
  text-align: right;
`;

const OrderTable = styled.table`
width: 100%;
border-collapse: collapse;
margin-top: 10px;

th, td {
  border: 1px solid #007bff;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
`;

const OrderSummary = styled.div`
text-align: right;
margin-top: 20px;
`;

const CloseButton = styled.button`
background-color: #007bff;
color: white;
padding: 10px;
border: none;
cursor: pointer;

 width: 100%;
  max-width: 100px; /* Ancho máximo para pantallas grandes */
  margin-top: 20px;

  &:hover {
    background-color: #0056b3; /* Tonos más oscuros de azul al pasar el ratón */
  }
`;

export default OrderPopup;