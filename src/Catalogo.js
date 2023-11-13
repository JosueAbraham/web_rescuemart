import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

const productos = [
    { id: 1, titulo: 'Botiquín de primeros auxilios según DIN 13169', precio: 700.00, imagen: '8.jpg' },
    { id: 2, titulo: 'Biolight M70C pulsioxímetro de dedo azul', precio: 1000.00, imagen: 's6.1.jpg' },
    { id: 3, titulo: 'Mascarilla RCP con estuche', precio: 500.00, imagen: '21.jpg' },
    { id: 4, titulo: 'Estetoscopio Rappaport negro', precio: 1100.00, imagen: 'Prueba1.jpg' },
    { id: 5, titulo: 'Cutimed® Sorbion® Sorbact® 10 cm x 10 cm', precio: 400.00, imagen: 'Prueba2.jpg' },
    { id: 6, titulo: 'Octenilin Solución riego heridas 350 ml', precio: 650.00, imagen: 'Prueba3.jpg' },
    { id: 7, titulo: 'Pequeño botiquín de primeros auxilios táctico ShuxiuWang 8390605897733', precio: 607.00, imagen: 'Prueba4.jpg' },
    { id: 8, titulo: 'tg Vendaje Tubular 5m | 1', precio: 230.00, imagen: 'Prueba5.jpg' },
    { id: 9, titulo: 'Vendaje de gasa Peha, 4 m 4cm', precio: 150.00, imagen: 'Prueba6.jpg' },
    { id: 4, titulo: 'Vendajes De Emergencia Vendaje Vendajes médicos Transpirable Primeros auxilios para las articulaciones (Color de piel 7.5cmx4.5m) Ndcxsfigh Para Estrenar', precio: 99.99, imagen: 'Prueba7.jpg' },


    // Agrega más productos aquí
];


const Catalogo = () => {
    return (
        <CatalogoContainer>
            <Helmet>
                <title>Catálogo de Productos - RescueMart</title>
                <meta name="description" content="Explora nuestra amplia selección de productos de primeros auxilios en el catálogo de RescueMart. Encuentra productos de alta calidad a los mejores precios." />
            </Helmet>
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