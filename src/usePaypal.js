// Crear un hook personalizado para manejar el estado de PayPal
import { useState } from 'react';

export const usePaypal = () => {
  const [pagoRealizado, setPagoRealizado] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  const handlePaymentSuccess = () => {
    // Actualizar el estado para indicar que el pago se ha realizado
    setPagoRealizado(true);
  };

  const handlePaymentError = (error) => {
    // Manejar el error aquí
    console.log(error);
    // Mostrar mensaje de error si es necesario
  };

  const handleAccept = () => {
    // Restablecer el estado de pago cuando se continúa comprando
    setPagoRealizado(false);
    setShowOverlay(false);
  };

  return {
    pagoRealizado,
    showOverlay,
    handlePaymentSuccess,
    handlePaymentError,
    handleAccept,
  };
};
