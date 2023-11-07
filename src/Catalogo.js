import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const productos = [
    { id: 1, titulo: 'Botiquín de primeros auxilios según DIN 13169', precio: 700.00, imagen: '8.jpg' },
    { id: 2, titulo: 'Biolight M70C pulsioxímetro de dedo azul', precio: 1000.00, imagen: 's6.1.jpg' },
    { id: 3, titulo: 'Mascarilla RCP con estuche', precio: 500.00, imagen: '21.jpg' },
    { id: 4, titulo: 'Estetoscopio Rappaport negro', precio: 1100.00, imagen: 'Prueba1.jpg' },
    // Agrega más productos aquí
];


const Catalogo = () => {
    return (
        <CatalogoContainer>
            <h1>Productos</h1>
            <ProductosList>
                {productos.map((producto) => (
                    <Producto key={producto.id}>
                        <StyledLink to={`/productos/${producto.id}`}>
                            <ImagenProducto src={process.env.PUBLIC_URL + '/' + producto.imagen} alt={producto.titulo} />
                            <Titulo>{producto.titulo}</Titulo>
                            <Precio>Precio: ${producto.precio}</Precio>
                        </StyledLink>
                    </Producto>
                ))}
            </ProductosList>
        </CatalogoContainer>
    );
}

const CatalogoContainer = styled.div`
    text-align: center;
    margin-bottom: 20px; /* Agrega margen inferior para separar los productos del footer */
`;

const ProductosList = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    justify-content: center;
`;

const Producto = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    text-align: center;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ImagenProducto = styled.img`
    max-width: 100%;
    max-height: 200px;
    width: auto;
    height: auto;
`;

const Precio = styled.p`
    font-weight: bold;
    color: #2D2F30;
`;

const Titulo = styled.h3`
    color: #000;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;


export default Catalogo;