// CarritoComponent.js

import React, { useState, useEffect } from 'react';

const CarritoComponent = () => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('carrito');
    if (storedCart) {
      setCarrito(JSON.parse(storedCart));
    }
  }, []);

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <ul>
        {carrito.map((item, index) => (
          <li key={index}>
            {item.nombre} - Cantidad: {item.cantidad}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarritoComponent;
