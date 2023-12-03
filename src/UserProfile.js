import React, { useState } from 'react';
import styled from 'styled-components';
import userData from './userData.json';
import ordersData from './ordersData.json';
import OrderPopup from './OrderPopup';

const UserProfile = () => {

  // Cambiar el estado de los datos del usuario
  const [userDataState, setUserData] = useState(userData);

  // Estado para las órdenes de compra
  const [orders, setOrders] = useState(ordersData);

  const handleChangePassword = () => {
    // Lógica para cambiar la contraseña
    console.log('Cambio de contraseña');
  };

  // Estado para la orden seleccionada
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Nuevo estado para la ventana emergente
  const [isPopupOpen, setPopupOpen] = useState(false);

  // Función para abrir la ventana emergente
  const openPopup = () => {
    setPopupOpen(true);
  };

  // Función para cerrar la ventana emergente
  const closePopup = () => {
    setPopupOpen(false);
  };

  // Función para manejar el clic en el número de pedido
  const handleOrderClick = (orderId) => {
    // Establece la orden seleccionada
    setSelectedOrder(orders.find(order => order.id === orderId));
    // Abre la ventana emergente
    openPopup();
  };

  return (
    <UserProfileContainer>
      <UserInfo>
        <h1>Perfil de Usuario</h1>
        <p><strong>Nombre:</strong> {userData.name}</p>
        <p><strong>Edad:</strong> {userData.edad}</p>
        <p><strong>Teléfono:</strong> {userData.tel}</p>
        <p><strong>Correo:</strong> {userData.email}</p>
        <p><strong>Dirección de Envío:</strong> {userData.address}</p>
      </UserInfo>
      <OrdersContainer>
        <h1>Órdenes de Compra</h1>
        <OrderTable>
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Fecha</th>
              <th>Estado de Pago</th>
              <th>Estado del Pedido</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>
                  <OrderLink onClick={() => handleOrderClick(order.id)}>
                    {order.id}
                  </OrderLink>
                </td>
                <td>{order.date}</td>
                <td>{order.paymentStatus}</td>
                <td>{order.orderStatus}</td>
                <td>${order.total}</td>
              </tr>
            ))}
          </tbody>
        </OrderTable>
      </OrdersContainer>
      <ChangePasswordContainer>
        <h1>Cambiar Contraseña</h1>
        <ChangePasswordButton onClick={handleChangePassword}>Cambiar Contraseña</ChangePasswordButton>
      </ChangePasswordContainer>

      {isPopupOpen && selectedOrder && (
        <OrderPopup order={{ ...selectedOrder, userData }} onClose={closePopup} />
      )}
    </UserProfileContainer>
  );
};

const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const UserInfo = styled.div`
  text-align: left;
  margin-bottom: 20px;
  align-self: flex-start;

  @media screen and (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 20px;
  }

  h1 {
    color: #007bff;
  }
`;

const OrdersContainer = styled.div`
  text-align: left;
  align-self: flex-start;

  h1 {
    color: #007bff;
  }
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

const OrderLink = styled.a`
  text-decoration: none;
  color: #007bff;
  cursor: pointer;
`;

const ChangePasswordContainer = styled.div`
  text-align: left;
  align-self: flex-start;
  
  h1 {
    color: #007bff;
  }
`;

const ChangePasswordButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3; /* Tonos más oscuros de azul al pasar el ratón */
  }
`;

export default UserProfile;