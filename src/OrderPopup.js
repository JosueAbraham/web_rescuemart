import React, { useState } from 'react';
import styled from 'styled-components';
import userData from './userData.json';
import ordersData from './ordersData.json';

const OrderPopup = ({ order, onClose }) => {

  // Cambiar el estado de los datos del usuario
  const [userDataState, setUserData] = useState(userData);

  // Estado para las órdenes de compra
  const [orders, setOrders] = useState(ordersData);

  return (
    <PopupOverlay>
      <PopupContainer>
        <h2>Detalles de la Orden #{order.id}</h2>
        <OrderStatus>
          <p><strong>Estado del Pago:</strong> {order.paymentStatus}</p>
          <p><strong>Estado del Pedido:</strong> {order.orderStatus}</p>
        </OrderStatus>
        <UserInfo>
          <p><strong>Nombre:</strong> {userData.name}</p>
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

        </OrderTable>
        <OrderSummary>
          <p><strong>Subtotal:</strong> ${order.subtotal}</p>
          <p><strong>Costo de Envío:</strong> ${order.shippingCost}</p>
          <p><strong>Impuesto (16%):</strong> ${order.tax}</p>
          <p><strong>Total:</strong> ${order.totalPagar}</p>
        </OrderSummary>
        <button onClick={onClose}>Cerrar</button>
      </PopupContainer>
    </PopupOverlay>
  );
};

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px; /* Ancho fijo de la ventana emergente */
  height: 500px; /* Alto fijo de la ventana emergente */
  background-color: white;
  padding: 20px;
  border: 1px solid #ddd;
  z-index: 999;
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo oscuro semitransparente */
  z-index: 998; /* Asegúrate de que tenga un índice z inferior al contenedor de la ventana emergente */
`;

const UserInfo = styled.div`
  text-align: left;
`;

const OrderStatus = styled.div`
  text-align: right;
`;

const OrderTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  th, td {
    border: 1px solid #ddd;
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

export default OrderPopup;