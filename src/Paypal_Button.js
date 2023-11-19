import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

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
              });
            }}
          />
        </div>
      </PayPalScriptProvider>
    );
  }
}

export default PaypalButton;
