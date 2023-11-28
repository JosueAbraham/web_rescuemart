import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import StarRanking from './StarRanking';
import PaypalButton from './Paypal_Button';
import { Carousel } from 'react-responsive-carousel';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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


const StyledCookieConsent = styled.div`
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
    background-color: #ff3055;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 14px;
    border-radius: 4px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ff4b30;
    }
  }
`;

const productos = [
  { id: 2, titulo: 'Biolight M70C pulsioxímetro de dedo azul', precio: 1000.00, imagen: 's6.1.jpg' },
  { id: 5, titulo: 'Cutimed® Sorbion® Sorbact® 10 cm x 10 cm', precio: 400.00, imagen: 'Prueba2.jpg' },
  { id: 6, titulo: 'Octenilin Solución riego heridas 350 ml', precio: 650.00, imagen: 'Prueba3.jpg' },
  { id: 8, titulo: 'tg Vendaje Tubular 5m | 1', precio: 230.00, imagen: 'Prueba5.jpg' },
];

const DetalleProductoContainer = styled.div`
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
`;
const precioProducto = 700; 

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
  flex: 0 0 50%;
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

const OpinionForm = styled.form`
  margin-top: 20px;
`;

const OpinionTextarea = styled.textarea`
  width: 100%;
  height: 80px;
  margin-bottom: 10px;
`;

const OpinionSubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const ProductosList = styled.div`
  display: flex;
  justify-content: space-around; /* Ajusta según tus preferencias de espaciado */
  flex-wrap: wrap;
`;

const Producto = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 200px; /* Ajusta el ancho según tus necesidades */
  margin: 10px; /* Ajusta el margen entre productos según tus necesidades */
`;
const ImagenProducto = styled.img`
  max-width: 100%;
  max-height: 150px; /* Ajusta la altura máxima según tus necesidades */
  width: auto;
  height: auto;
`;

const Precio = styled.p`
  font-weight: bold;
  color: #2D2F30;
  margin-top: 5px; /* Agrega un pequeño margen superior */
`;

const Titulo = styled.h3`
  color: #000;
  margin-top: 5px; /* Agrega un pequeño margen superior */
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const TwoColumnContainer = styled.div`
  display: grid;
  grid-template-columns: 45% 50%; /* Adjust the column widths as needed */
  column-gap: 5%; /* Adjust the gap between columns as needed */
`;

const ImageColumn = styled.div`
  margin-bottom: 20px; /* Add margin for separation */
  height: 100%; /* Ensure the ImageColumn takes full height */
`;

const InfoColumn = styled.div`
  margin-bottom: 20px; /* Add margin for separation */
`;

const CarouselContainer = styled.div`
  height: 100%; /* Ensure the carousel takes full height of ImageColumn */
`;

const DetalleProducto = () => {
  const { id } = useParams();
  const [opinion, setOpinion] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [showPaypalOverlay, setShowPaypalOverlay] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch('/products.json');
        const data = await response.json();
        console.log('Fetched product data:', data);
  
        const selectedProduct = data.find((product) => product.id === parseInt(id));
        console.log('Selected product:', selectedProduct);
  
        if (selectedProduct) {
          setSelectedProduct(selectedProduct);
        } else {
          console.error(`Product with id ${id} not found.`);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
  
    fetchProductData();
  }, [id]);
  
  const handleComprarAhora = (product) => {
    setSelectedProduct(product);
    setShowPaypalOverlay(true);
  };

  const handleOpinionChange = (event) => {
    setOpinion(event.target.value);
  };

  const handleOpinionSubmit = (event) => {
    event.preventDefault();
    console.log('Opinión enviada:', opinion);
    setOpinion('');
  };

  return (
    <div>
      {selectedProduct ? (
        <>
          <Helmet>
            <title>{selectedProduct.nombre}</title>
            <meta name='description' content={selectedProduct.descripcion} />
            <meta name="keywords" content="Botiquín de Primeros Auxilios, DIN 13169, Precio, Detalles del Producto, Materiales de alta calidad, Situaciones de Emergencia, Preparación" />
          </Helmet>
          <DetalleProductoContainer>
            <Header>
              <h1>Detalles del Producto</h1>
            </Header>
    
            <TwoColumnContainer>
              <ImageColumn>
                <Carousel autoPlay infiniteLoop showArrows={false} interval={5000} dynamicHeight={false}>
                  <div>
                    <img
                      src={process.env.PUBLIC_URL + '/' + selectedProduct.imagen}
                      alt={selectedProduct.nombre}
                      style={{ maxHeight: '100%', maxWidth: '100%' }} 
                    />
                  </div>
                </Carousel>
              </ImageColumn>
              <InfoColumn>
                <Product>
                  <ProductTitle>{selectedProduct.nombre}</ProductTitle>
                  <p>Categoría: {selectedProduct.categoria}</p>
                  <Price><strong>Precio habitual:</strong> ${selectedProduct.precio.toFixed(2)} USD</Price>
                  <Quantity>
                    <p>Cantidad: </p>
                    <QuantityInput type="number" value={cantidad} min="1" />
                  </Quantity>
                  <Buttons>
                    <Button>Agregar al carrito</Button>ㅤㅤ
                    <Button onClick={() => handleComprarAhora(selectedProduct)}>Comprar ahora</Button>
                  </Buttons>
                  <h2>Descripción</h2>
                  <ProductDescription>
                    <p>{selectedProduct.descripcion}</p>
                  </ProductDescription>
                  <h2>Resumen del producto</h2>
                  <p>{selectedProduct.resumen}</p>
                </Product>
              </InfoColumn>
            </TwoColumnContainer>
          </DetalleProductoContainer>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <Container>
        <h2>Calificación</h2>
        <StarRanking />
        <OpinionForm onSubmit={handleOpinionSubmit}>
          <h2>Deja tu opinión</h2>
          <OpinionTextarea
            placeholder="Escribe tu opinión..."
            value={opinion}
            onChange={handleOpinionChange}
          />
          <OpinionSubmitButton type="submit">Enviar Opinión</OpinionSubmitButton>
        </OpinionForm>
      </Container>
    
      {showPaypalOverlay && (
        <Overlay showOverlay={showPaypalOverlay}>
          <StyledCookieConsent>
            <h2>Comprar ahora</h2>
            <p>
              Nombre: {selectedProduct?.nombre}
              <br />
              Precio: ${selectedProduct?.precio}
              <br />
              Cantidad: 1
            </p>
            <img
              src={process.env.PUBLIC_URL + '/' + selectedProduct?.imagen}
              alt={selectedProduct?.nombre}
              style={{ maxWidth: '100%', maxHeight: '200px' }} 
            />
            <PaypalButton precio={selectedProduct?.precio.toString()} />
            <button onClick={() => setShowPaypalOverlay(false)}>Cerrar</button>
          </StyledCookieConsent>
        </Overlay>
      )}
      <h2>ㅤㅤProductos Recomendados</h2>
      <ProductosList>
        {/* Productos Recomendados */}
      </ProductosList>
    </div>
  );
  
}

export default DetalleProducto;