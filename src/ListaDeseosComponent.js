// ListaDeseosComponent.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import AgregarCarrito from './AgregarCarrito';

const ListaDeseosContainer = styled.div`
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  
`;

const TituloListaDeseos = styled.h1`
  margin: 40px auto;
  padding: 20px;
  text-align: center;
  font-size: 34px;
  margin-bottom: 40px;
`;

const ListaDeseosList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 40px;

`;

const ListaDeseosItem = styled.li`
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
`;

const ItemImage = styled.img`
  max-width: 150px;
  margin-right: 10px;
  margin-bottom: 40px;

`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  margin-bottom: 40px;

`;

const StyledButtonDelete = styled.button`
  margin: 10px 0; /* Ajustamos la separación */
  background-color: #dd2a62;
  color: white;
  padding: 12px 10px;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  cursor: pointer;
  

  &:hover {
    background-color: #ff6630;
  }
`;

const EmptyListaDeseosMessage = styled.p`
  font-size: 18px;
  text-align: center;
  color: #555;
  margin-bottom: 20%;
  
`;

const ListaDeseosComponent = () => {
    const [listaDeseos, setListaDeseos] = useState([]);
    const [setProductosDestacados] = useState([]);

    useEffect(() => {
        const fetchProductosDestacados = async () => {
            try {
                const response = await fetch(process.env.PUBLIC_URL + '/products.json');
                if (!response.ok) {
                    throw new Error('Error al cargar productos destacados');
                }
                const data = await response.json();
                const favoritos = data.filter(producto => producto.favorito);

                // Obtén la lista de deseos actual del almacenamiento local
                const storedListaDeseos = localStorage.getItem('listaDeseos');
                const listaDeseosActual = storedListaDeseos ? JSON.parse(storedListaDeseos) : [];

                // Verifica si cada producto favorito ya está en la lista de deseos antes de agregarlo
                const nuevosFavoritos = favoritos.filter(favorito => (
                    !listaDeseosActual.some(producto => producto.id === favorito.id)
                ));

                // Combina los nuevos productos favoritos con la lista de deseos actual
                const nuevaListaDeseos = [...listaDeseosActual, ...nuevosFavoritos];
                setListaDeseos(nuevaListaDeseos);
                localStorage.setItem('listaDeseos', JSON.stringify(nuevaListaDeseos));

                setProductosDestacados(nuevosFavoritos);
            } catch (error) {
                console.error('Error al cargar productos destacados:', error.message);
            }
        };

        fetchProductosDestacados();
    }, []);


    useEffect(() => {
        const storedListaDeseos = localStorage.getItem('listaDeseos');
        if (storedListaDeseos) {
            setListaDeseos(JSON.parse(storedListaDeseos));
        }
    }, []);

    const handleEliminarProducto = (index) => {
        const nuevaListaDeseos = [...listaDeseos];
        nuevaListaDeseos.splice(index, 1);
        setListaDeseos(nuevaListaDeseos);
        localStorage.setItem('listaDeseos', JSON.stringify(nuevaListaDeseos));
    };

    const handleVaciarListaDeseos = () => {
        setListaDeseos([]);
        localStorage.removeItem('listaDeseos');
    };

    return (
        <ListaDeseosContainer>
            <TituloListaDeseos><FontAwesomeIcon icon={faHeart} /> Lista de Deseos</TituloListaDeseos>
            {listaDeseos.length > 0 ? (
                <ListaDeseosList>
                    {listaDeseos.map((item, index) => (
                        <ListaDeseosItem key={index}>
                            <ItemInfo>
                                <ItemImage
                                    src={process.env.PUBLIC_URL + '/' + item.imagen}
                                    alt={item.nombre}
                                />
                                <ItemDetails>
                                    <strong>{item.nombre}</strong>
                                    <p><strong>Precio: </strong>${item.precio.toFixed(2)}</p>
                                </ItemDetails>
                                <StyledButtonDelete onClick={() => handleEliminarProducto(index)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </StyledButtonDelete>
                                <AgregarCarrito selectedProduct={item} cantidad={1} />
                            </ItemInfo>
                        </ListaDeseosItem>
                    ))}
                </ListaDeseosList>
            ) : (
                <EmptyListaDeseosMessage>¡Ups! Parece que tu lista de deseos está vacía. ¿Por qué no agregas algunos productos?</EmptyListaDeseosMessage>
            )}
            {listaDeseos.length > 0 && (
                <div>
                    <StyledButtonDelete onClick={handleVaciarListaDeseos}>
                        <FontAwesomeIcon icon={faTrash} /> Vaciar Lista de Deseos
                    </StyledButtonDelete>
                </div>
            )}
        </ListaDeseosContainer>
    );
};

export default ListaDeseosComponent;
