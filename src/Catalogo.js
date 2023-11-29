import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import AgregarCarrito from './AgregarCarrito';
const Catalogo = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(process.env.PUBLIC_URL + '/products.json');
                const data = await response.json();
                setProductos(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchProductos();
    }, []);
    return (
        <CatalogoContainer>
            <Helmet>
                <title>Catálogo de Productos - RescueMart</title>
                <meta name="description" content="Explora nuestra amplia selección de productos de primeros auxilios en el catálogo de RescueMart. Encuentra productos de alta calidad a los mejores precios." />
                <meta name="keywords" content="Botiquín de primeros auxilios,Productos de seguridad,Equipos de emergencia,Preparación para situaciones críticas,Refacciones para automóviles,Refacciones para motocicletas,Refacciones para camionetas,Herramientas de primeros auxilios,Soluciones confiables" />
            </Helmet>
            <h1>Productos</h1>
            <ProductosList>
                {productos.map((producto) => (
                    <Producto key={producto.id}>
                        <StyledLink to={`/productos/${producto.id}`}>
                            <ImagenProducto src={process.env.PUBLIC_URL + '/' + producto.imagen} alt={producto.nombre} />
                            <Precio>{producto.categoria}</Precio>
                            <Titulo>{producto.nombre}</Titulo>
                            <Precio>Precio: ${producto.precio}</Precio>
                        </StyledLink>
                        <AgregarCarrito selectedProduct={producto} cantidad={1} />
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