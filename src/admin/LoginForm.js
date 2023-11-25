import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoginForm = styled.div`
  max-width: 800px;
  width: 100%;
  padding: 20px;
  background-color: #333;
  border-radius: 8px;
  color: #fff;
  text-align: center;
`;

const LoginHeader = styled.h2`
  color: #ff0000; /* Red color */
`;

const InputLabel = styled.label`
  display: block;
  margin-top: 10px;
`;

const InputField = styled.input`
  width: 90%;
  padding: 8px;
  margin-top: 5px;
`;

const SubmitButton = styled.button`
  background-color: #ff0000; /* Red color */
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 10px;
`;

const ErrorMessage = styled.p`
  color: #ff0000; /* Red color */
  margin-top: 10px;
`;

const Login = ({ users, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const user = users.find((u) => u.email === email && u.pass === password);

    if (user) {
      onLogin(user);
      setError('');
    } else {
      setError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <LoginContainer>
      <LoginForm>
      <img src="/logo.png.png" alt="8" style={{ width: '200px', height: 'auto' }} />
      <LoginHeader>Iniciar Sesión - Administrador</LoginHeader>
      <InputLabel>Email:</InputLabel>
      <InputField type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <InputLabel>Contraseña:</InputLabel>
      <InputField type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <SubmitButton onClick={handleLogin}>Iniciar Sesión</SubmitButton>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      </LoginForm>
    </LoginContainer>
  );
};

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const loadUsers = async () => {
    try {
      const response = await fetch('/users.json');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    // Después de iniciar sesión con éxito, navegar a la ruta deseada
    navigate('/admin/products');
  };

  // Si ya hay un usuario actual, redirige a la página de administrador
  useEffect(() => {
    if (currentUser) {
      navigate('/admin/products');
    }
  }, [currentUser, navigate]);

  return (
    <div>
      <Login users={users} onLogin={handleLogin} />
    </div>
  );
};

export default App;
