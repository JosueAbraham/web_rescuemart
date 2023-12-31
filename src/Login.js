import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [favoriteProducts, setFavoriteProducts] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos de inicio de sesión:', formData);
    login();
    navigate('/Catalogo');
  };

  useEffect(() => {
    // Simular la carga de la lista de deseos al iniciar sesión
    const fetchFavoriteProducts = async () => {
      try {
        // Realizar la solicitud para obtener los datos de products.json
        const response = await fetch('/products.json');
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }

        // Convertir la respuesta a JSON
        const products = await response.json();

        // Filtrar productos favoritos del archivo JSON
        const favorites = products.filter((product) => product.favorito);

        // Guardar la lista de deseos en localStorage
        localStorage.setItem('listaDeseos', JSON.stringify(favorites));

        // Actualizar el estado con la lista de deseos
        setFavoriteProducts(favorites);
      } catch (error) {
        console.error(error);
      }
    };

    // Llamar a la función para cargar la lista de deseos
    fetchFavoriteProducts();
  }, []);
  return (
    <FormContainer>
      <FormTitle>Iniciar Sesión</FormTitle>
      <Form onSubmit={handleSubmit}>
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

        <SubmitButton type="submit">Iniciar Sesión</SubmitButton>
      </Form>


      <SignUpLink>
        ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
      </SignUpLink>

    </FormContainer >


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

const SignUpLink = styled.div`
  text-align: center;
  margin-top: 20px;

  a {
    color: #3498db;
    text-decoration: none;
    font-weight: bold;
  }
`;

export default Login;