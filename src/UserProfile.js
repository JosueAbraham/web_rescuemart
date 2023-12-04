import React, { useState } from 'react';
import styled from 'styled-components';
import userData from './userData.json';
import ordersData from './ordersData.json';
import OrderPopup from './OrderPopup';
const ChangePasswordForm = ({ onSubmit, onCancel }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(currentPassword, newPassword);
  };

  return (
    <FormContainer>
      <FormTitle>Cambiar Contraseña</FormTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="currentPassword">Contraseña Actual:</Label>
          <Input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="newPassword">Nueva Contraseña:</Label>
          <Input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </FormGroup>
        <ButtonContainer>
          <SubmitButton type="submit">Guardar Cambios</SubmitButton>
          <CancelButton type="button" onClick={onCancel}>
            Cancelar
          </CancelButton>
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const FormTitle = styled.h1`
  color: #007bff;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  color: #007bff;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #007bff;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  flex-grow: 1;

  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled.button`
  background-color: #d9534f;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  flex-grow: 1;

  &:hover {
    background-color: #c9302c;
  }
`;


const UserProfile = () => {
  const [userDataState, setUserData] = useState(userData);
  const [orders, setOrders] = useState(ordersData);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isChangePasswordFormVisible, setChangePasswordFormVisible] = useState(false);

  const handleChangePassword = () => {
    setChangePasswordFormVisible(true);
  };

  const handlePasswordChangeSubmit = (currentPassword, newPassword) => {
    // Lógica para cambiar la contraseña
    console.log('Contraseña actual:', currentPassword);
    console.log('Nueva contraseña:', newPassword);

    // Aquí deberías agregar la lógica para cambiar la contraseña
    // Puedes llamar a una función o hacer una solicitud a tu servidor, por ejemplo.

    // Cerrar el formulario después de cambiar la contraseña
    setChangePasswordFormVisible(false);
  };

  const handlePasswordChangeCancel = () => {
    // Cancelar el cambio de contraseña
    setChangePasswordFormVisible(false);
  };

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleOrderClick = (orderId) => {
    setSelectedOrder(orders.find((order) => order.id === orderId));
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
        {isChangePasswordFormVisible && (
          <ChangePasswordForm
            onSubmit={handlePasswordChangeSubmit}
            onCancel={handlePasswordChangeCancel}
          />
        )}
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
  border: 20px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3; /* Tonos más oscuros de azul al pasar el ratón */
  }
`;

export default UserProfile;
