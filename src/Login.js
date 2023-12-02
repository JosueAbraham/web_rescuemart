import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

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

        navigate('/Catalogo');
    };

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
        </FormContainer>
    );
};

const FormContainer = styled.div`
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    text-align: center;
`;

const FormTitle = styled.h2`
    color: #368591;
    margin-bottom: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const InputLabel = styled.label`
    font-size: 14px;
    color: #555;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 6px;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: #368591;
    }
`;

const SubmitButton = styled.button`
    background-color: #368591;
    color: #fff;
    padding: 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #30777d;
    }
`;

export default Login;
