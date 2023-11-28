import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: ${({ showOverlay }) => (showOverlay ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const StyledPayPalConsent = styled.div`
  background-color: #fff;
  color: #333;
  padding: 20px;
  font-size: 16px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  max-width: 400px;

  & p {
    margin-bottom: 20px;
  }

  & button {
    background-color: #4caf50;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 14px;
    border-radius: 4px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #45a049;
    }
  }
`;

const PaypalButton = (props) => {
  const [pagoRealizado, setPagoRealizado] = useState(false);
  const { precio } = props;

  const handlePaymentSuccess = () => {
    // Handle successful payment here
    toast.success('Compra hecha exitosamente', { position: toast.POSITION.TOP_CENTER });
    // Update state to indicate that the payment has been made
    setPagoRealizado(true);
  };

  const handlePaymentError = (error) => {
    // Handle error here
    console.log(error);
    // Show error message
    toast.error('Error al procesar el pago', { position: toast.POSITION.BOTTOM_RIGHT });
  };

  const [showOverlay, setShowOverlay] = useState(true);

  const handleAccept = () => {
    // Reset the payment status when continuing shopping
    setPagoRealizado(false);
    setShowOverlay(false);
  };

  return (
    <PayPalScriptProvider options={{ 'client-id': 'YOUR_CLIENT_ID' }}>
      <div>
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: precio.toString(), // Adjust this value according to your requirements
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              handlePaymentSuccess();
            }).catch((error) => {
              handlePaymentError(error);
            });
          }}
        />

        {pagoRealizado && (
          <Overlay showOverlay={showOverlay}>
            <StyledPayPalConsent>
              <h2>Pago realizado </h2>
              <p>
                Gracias por tu compra. El pago se ha realizado exitosamente.
              </p>
              <button onClick={handleAccept}>Continuar comprando</button>
            </StyledPayPalConsent>
          </Overlay>
        )}
      </div>
    </PayPalScriptProvider>
  );
};

export default PaypalButton;
