import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Registro = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    phone: '',
    direccion: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulando la lógica de guardado exitoso
    // Puedes agregar la lógica real aquí (por ejemplo, llamadas a API, etc.)
    console.log('Datos enviados:', formData);

    // Mostrar el cuadro emergente de éxito
    setShowSuccessPopup(true);
  };

  const handlePopupClose = () => {
    setShowSuccessPopup(false);
  };

  return (
    <FormContainer>
      <FormTitle>Crear Cuenta</FormTitle>
      <Form onSubmit={handleSubmit}>
        <InputLabel>Nombre</InputLabel>
        <Input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Tu nombre"
        />

        <InputLabel>Apellido</InputLabel>
        <Input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Tu apellido"
        />

        <InputLabel>Edad</InputLabel>
        <Input
          type="text"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Tu edad"
        />

        <InputLabel>Teléfono</InputLabel>
        <Input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Tu teléfono"
        />

        <InputLabel>Dirección</InputLabel>
        <Input
          type="text"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          placeholder="Tu dirección"
        />

        <InputLabel>Correo Electrónico</InputLabel>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Tu correo electrónico"
        />

        <InputLabel>Contraseña</InputLabel>
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Tu contraseña"
        />

        <InputLabel>Confirmar Contraseña</InputLabel>
        <Input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirmar contraseña"
        />

        <SubmitButton type="submit">Crear Cuenta</SubmitButton>
      </Form>

      {showSuccessPopup && (
        <SuccessPopup>
          <SuccessContent>
            <p>Felicidades, tus datos se guardaron correctamente.</p>
            <Link to="/Login" onClick={handlePopupClose}>
              Iniciar Sesión
            </Link>
          </SuccessContent>
        </SuccessPopup>
      )}

      <SignInLink>
        ¿Ya tienes una cuenta? <Link to="/Login">Iniciar Sesión</Link>
      </SignInLink>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  position: relative;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  text-align: center;
  color: #2c3e50;
  font-size: 28px;
  margin-bottom: 30px;
  font-family: 'Arial', sans-serif;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const InputLabel = styled.label`
  font-size: 16px;
  color: #34495e;
`;

const Input = styled.input`
  padding: 15px;
  font-size: 16px;
  border: 1px solid #3498db;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const SubmitButton = styled.button`
  background-color: #3498db;
  color: #fff;
  padding: 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #2980b9;
    transform: scale(1.05);
  }
`;

const SuccessPopup = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  color: #000;
  font-weight: bold;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SuccessContent = styled.div`
  background-color: #2ecc71;
  padding: 30px;
  border-radius: 10px;
  text-align: center;

  p {
    margin-bottom: 20px;
  }

  a {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
  }
`;

const SignInLink = styled.div`
  text-align: center;
  margin-top: 20px;

  a {
    color: #3498db;
    text-decoration: none;
    font-weight: bold;
  }
`;

export default Registro;