import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import AgregarCarrito from './AgregarCarrito';
import AgregarListaDeseos from './AgregarListaDeseos';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox } from '@fortawesome/free-solid-svg-icons';

const Catalogo = () => {
    const [productos, setProductos] = useState([]);
    const [productosOriginales, setProductosOriginales] = useState([]);
    const [mostrarOpciones, setMostrarOpciones] = useState(false);

    const opcionesRef = useRef();

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(process.env.PUBLIC_URL + '/products.json');
                const data = await response.json();
                setProductos(data);
                setProductosOriginales(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchProductos();
    }, []);

    const ordenarProductos = (tipoOrden) => {
        const productosOrdenados = [...productos].sort((a, b) => {
            switch (tipoOrden) {
                case 'menor-mayor':
                    return a.precio - b.precio;
                case 'mayor-menor':
                    return b.precio - a.precio;
                case 'Alfabeticoa-z':
                    return a.nombre.localeCompare(b.nombre);
                case 'Alfabeticoz-a':
                    return b.nombre.localeCompare(a.nombre);
                default:
                    return 0;
            }
        });

        setProductos(productosOrdenados);
        setMostrarOpciones(false);
    };

    const restaurarProductos = () => {
        setProductos([...productosOriginales]);
        setMostrarOpciones(false);
    };

    const handleClickBoton = () => {
        setMostrarOpciones(!mostrarOpciones);
    };

    const handleClickFuera = (e) => {
        if (opcionesRef.current && !opcionesRef.current.contains(e.target)) {
            setMostrarOpciones(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickFuera);
        return () => {
            document.removeEventListener('mousedown', handleClickFuera);
        };
    }, []);

    return (<>
        <Title>
            <h1>
                <FontAwesomeIcon icon={faBox} /> Productos
            </h1>
            </Title>
        <CatalogoContainer>
            <Helmet>
                <title>Catálogo de Productos - RescueMart</title>
                <meta name="description" content="Explora nuestra amplia selección de productos de primeros auxilios en el catálogo de RescueMart. Encuentra productos de alta calidad a los mejores precios." />
                <meta name="keywords" content="Botiquín de primeros auxilios,Productos de seguridad,Equipos de emergencia,Preparación para situaciones críticas,Refacciones para automóviles,Refacciones para motocicletas,Refacciones para camionetas,Herramientas de primeros auxilios,Soluciones confiables" />
            </Helmet>
          
            <OrdenarButton onClick={handleClickBoton}>
                Ordenar por
            </OrdenarButton>
            {mostrarOpciones && (
                <OpcionesDesplegables ref={opcionesRef}>
                    <Opcion onClick={() => ordenarProductos('menor-mayor')}>Precio menor a mayor</Opcion>
                    <Opcion onClick={() => ordenarProductos('mayor-menor')}>Precio mayor a menor</Opcion>
                    <Opcion onClick={() => ordenarProductos('Alfabeticoa-z')}>A-Z</Opcion>
                    <Opcion onClick={() => ordenarProductos('Alfabeticoz-a')}>Z-A</Opcion>
                    <Opcion onClick={restaurarProductos}>Restaurar</Opcion>
                </OpcionesDesplegables>
            )}
            <ProductosList>
                {productos.map((producto) => (
                    <Producto key={producto.id}>
                        <StyledLink to={`/productos/${producto.id}`}>
                            <ImagenProducto src={process.env.PUBLIC_URL + '/' + producto.imagen} alt={producto.nombre} />
                            <Precio>{producto.categoria}</Precio>
                            <Titulo>{producto.nombre}</Titulo>
                            <Precio>Precio: ${producto.precio}</Precio>
                        </StyledLink>
                        <AgregarCarrito selectedProduct={producto} cantidad={1} /><br/>
                        <AgregarListaDeseos selectedProduct={producto} />
                    </Producto>
                ))}
            </ProductosList>
        </CatalogoContainer></>
    );
};

const CatalogoContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
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
const Title = styled.h3`
background-color: #333;
  color: #fff;
  text-align: center;
  padding: 10px;
  margin-top: 0;
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

const OrdenarButton = styled.button`
  background-color: #368591;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
`;

const OpcionesDesplegables = styled.div`
  position: absolute;
  top: 80px;
  right: 80px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const Opcion = styled.div`
  padding: 20px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default Catalogo;