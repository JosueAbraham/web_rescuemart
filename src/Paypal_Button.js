import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { toast as toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class PaypalButton extends React.Component {
  render() {
    return (
      <PayPalScriptProvider options={{ 'client-id': 'ATX6u_QjOUUmWdB4km6wTxwEGvMlCZXU-i1GwgwChfCxPOQAP2l2Lp406Lx44hvpfooXP2fkTbMPWfc9' }}>
        <div>
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: '700' // Ajusta este valor según tus requisitos
                    }
                  }
                ]
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then(function (details) {
                // Maneja el pago exitoso aquí
                console.log(details);
                // Muestra un mensaje de compra exitosa
                toast.success('Compra hecha exitosamente', { position: toast.POSITION.TOP_CENTER });
              }).catch(function (error) {
                // Maneja el error aquí
                console.log(error);
                // Muestra un mensaje de error
                toast.error('Error al procesar el pago', { position: toast.POSITION.BOTTOM_RIGHT });
              });
            }}
            
          />
        </div>
      </PayPalScriptProvider>
    );
  }
}
export default PaypalButton;
