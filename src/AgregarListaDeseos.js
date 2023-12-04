// AgregarListaDeseos.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useAuth } from './AuthContext';

const ButtonListaDeseos = styled.button`
  margin: 10px auto;
  background-color: ${({ isInListaDeseos }) => (isInListaDeseos ? '#ff3333' : '#ffcc00')};
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: ${({ isInListaDeseos }) => (isInListaDeseos ? '#e60000' : '#ffdb4d')};
  }
`;

const AgregadoExitosamente = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #333333;
  color: #fff;
  text-align: center;
  padding: 15px;
  font-size: 18px;
  z-index: 1000;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transform: translateY(${({ show }) => (show ? '0' : '-100%')});
  transition: opacity 0.3s ease, transform 0.3s ease;
`;

const MensajeEliminado = styled(AgregadoExitosamente)`
  background-color: #ff3333; // Fondo rojo para mensaje de eliminación
`;

const AgregarListaDeseos = ({ selectedProduct }) => {
    const [listaDeseos, setListaDeseos] = useState([]);
    const [mensajeAgregado, setMensajeAgregado] = useState(false);
    const [productoAgregado, setProductoAgregado] = useState(false);
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        const storedListaDeseos = localStorage.getItem('listaDeseos');
        if (storedListaDeseos) {
            setListaDeseos(JSON.parse(storedListaDeseos));
        }
    }, []);

    const isInListaDeseos = listaDeseos.some(producto => producto.id === selectedProduct.id);

    const handleAgregarEliminarListaDeseos = () => {
        if (isInListaDeseos) {
            // El producto ya está en la lista, así que lo eliminamos
            const nuevaListaDeseos = listaDeseos.filter(producto => producto.id !== selectedProduct.id);
            setListaDeseos(nuevaListaDeseos);
            localStorage.setItem('listaDeseos', JSON.stringify(nuevaListaDeseos));
            setProductoAgregado(false); // Se ha eliminado un producto
        } else {
            // El producto no está en la lista, así que lo agregamos
            const nuevaListaDeseos = [...listaDeseos, selectedProduct];
            setListaDeseos(nuevaListaDeseos);
            localStorage.setItem('listaDeseos', JSON.stringify(nuevaListaDeseos));
            setProductoAgregado(true); // Se ha agregado un producto
            setMensajeAgregado(true);
            setTimeout(() => {
                setMensajeAgregado(false);
            }, 3000);
        }
    };

    return (
        <>
          {isLoggedIn && (
            <ButtonListaDeseos onClick={handleAgregarEliminarListaDeseos} isInListaDeseos={isInListaDeseos}>
              <FontAwesomeIcon icon={faHeart} /> {isInListaDeseos ? 'Eliminar de Lista de Deseos' : 'Agregar a Lista de Deseos'}
            </ButtonListaDeseos>
          )}
          {mensajeAgregado && (
            <>
              {productoAgregado ? (
                <AgregadoExitosamente show={mensajeAgregado}>
                  <FontAwesomeIcon icon={faHeart} /> Producto agregado a la Lista de Deseos exitosamente
                </AgregadoExitosamente>
              ) : (
                <MensajeEliminado show={mensajeAgregado}>
                  <FontAwesomeIcon icon={faHeart} /> Producto eliminado de la Lista de Deseos exitosamente
                </MensajeEliminado>
              )}
            </>
          )}
        </>
      );
      
};

export default AgregarListaDeseos;


