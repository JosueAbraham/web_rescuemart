import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from "react-helmet";

const DetalleProductoContainer = styled.div`
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
`;

const Header = styled.header`
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 10px;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Product = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
`;

const ProductTitle = styled.h1`
  font-size: 24px;
`;

const ProductDescription = styled.p`
  font-size: 16px;
`;

const Price = styled.div`
  font-size: 20px;
  color: #e44d26;
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityInput = styled.input`
  width: 40px;
  text-align: center;
  border: 1px solid #ccc;
`;

const Buttons = styled.div`
  margin-top: 10px;
`;

const Button = styled.button`
  background-color: #e44d26;
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #ff6a3b;
  }
`;

const DetalleProducto = () => {
  const { id } = useParams();

  return (
    <div>
    <Helmet>
    <title>Botiquín de Primeros Auxilios DIN 13169 - RescueMart</title>
    <meta name='description' content="Explora nuestro completo Botiquín de Primeros Auxilios según DIN 13169, con carcasa resistente, suministro esencial y materiales de alta calidad. Asegura tu preparación para situaciones de emergencia con este botiquín confiable."/>
    <meta name="keywords" content="Botiquín de Primeros Auxilios, DIN 13169, Precio, Detalles del Producto, Materiales de alta calidad, Situaciones de Emergencia, Preparación"/>


  </Helmet>
    <DetalleProductoContainer>
      <Header>
        <h1>Detalles del Producto</h1>
      </Header>
      <Container>
        <img src="/8.jpg" alt="Descripción de la imagen" />
        <Product>
          <ProductTitle>Botiquín de primeros auxilios según DIN 13169</ProductTitle>
          <Price><strong>Precio habitual:</strong> $700.00 MXN</Price>
          <Quantity>
            <p>Cantidad: </p>
            <QuantityInput type="number" value="1" min="1" />
          </Quantity>
          <Buttons>
            <p><Button>Agregar al carrito</Button></p>
            <Button>Comprar ahora</Button>
          </Buttons>
          <h2>Descripción</h2>
          <ProductDescription>

            <p>Botiquín de Söhngen con repuesto de acuerdo con la normativa DIN 13169. La carcasa robusta de plástico ABS de color naranja es resistente a los golpes, la temperatura, no necesita mantenimiento y está cubierta de placas transparentes. Los separadores interiores amovibles pueden ser divididos de acuerdo a las necesidades del usuario. El suministro del botiquín incluye un soporte de pared con bloqueo de 90 °.</p>
            {/* ... Otros detalles del producto ... */}
          </ProductDescription>
          <h2>Resumen del producto</h2>
          <ul>
            <li>Fabricado en plástico de alta resistencia a impactos</li>
            <li>Con material de vendaje especial para niños</li>
            <li>Para las lesiones más comunes en jardines de infancia</li>
            <li>Tapa con bisagra y lengüetas de cierre</li>
            <li>Dimensiones: 26 x 16 x 8 cm</li>
          </ul>
        </Product>
      </Container>
    </DetalleProductoContainer></div>
  );
}

export default DetalleProducto;
