import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Registro = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    phone: '',
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
          <p>Felicidades, tus datos se guardaron correctamente.</p>
          <Link to="/Login">Ir a Iniciar Sesión</Link>
        </SuccessPopup>
      )}

      <SignInLink>
        ¿Ya tienes una cuenta? <Link to="/Login">Iniciar Sesión</Link>
      </SignInLink>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  max-width: 500px;
  margin: 50px auto; /* Aumentado para separar del borde superior */
  padding: 20px;
  position: relative;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  text-align: center;
  color: #368591;
  margin-bottom: 20px; /* Aumentado para separar del formulario */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputLabel = styled.label`
  font-size: 16px;
  color: #555;
`;

const Input = styled.input`
  padding: 15px; /* Aumentado el espacio alrededor del texto en el input */
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px; /* Aumentado el radio de borde para un aspecto más suave */
`;

const SubmitButton = styled.button`
  background-color: #368591;
  color: #fff;
  padding: 15px; /* Aumentado el espacio alrededor del texto en el botón */
  border: none;
  border-radius: 8px; /* Aumentado el radio de borde para un aspecto más suave */
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #30777d;
  }
`;

const SuccessPopup = styled.div`
  background-color: #4caf50;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  position: absolute;
  top: 70%; /* Ajustado para separar del borde inferior */
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  animation: fadeIn 0.5s forwards;

  p {
    margin-bottom: 10px;
  }

  a {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const SignInLink = styled.div`
  text-align: center;
  margin-top: 20px;

  a {
    color: #368591;
    text-decoration: none;
    font-weight: bold;
  }
`;

export default Registro;