import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from "react-helmet";
import StarRanking from './StarRanking';
import PaypalButton from './Paypal_Button';
import { Carousel } from 'react-responsive-carousel';
import { useEffect } from 'react';

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

  const handleOpinionChange = (event) => {
    setOpinion(event.target.value);
  };

  const handleOpinionSubmit = (event) => {
    event.preventDefault();
    console.log('Opinión enviada:', opinion);
    setOpinion('');
  };
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    // Fetch product data from the JSON file
    const fetchProductData = async () => {
      try {
        const response = await fetch('/product.json'); // Adjust the path based on your project structure
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Botiquín de Primeros Auxilios DIN 13169 - RescueMart</title>
        <meta name='description' content="Explora nuestro completo Botiquín de Primeros Auxilios según DIN 13169, con carcasa resistente, suministro esencial y materiales de alta calidad. Asegura tu preparación para situaciones de emergencia con este botiquín confiable." />
        <meta name="keywords" content="Botiquín de Primeros Auxilios, DIN 13169, Precio, Detalles del Producto, Materiales de alta calidad, Situaciones de Emergencia, Preparación" />
      </Helmet>
      <DetalleProductoContainer>
        <Header>
          <h1>Detalles del Producto</h1>
        </Header>

        <TwoColumnContainer>
          <ImageColumn>
            <CarouselContainer>
              <Carousel autoPlay infiniteLoop showArrows={false} interval={5000} dynamicHeight={false}>
                <div>
                  <img src="/8.jpg" alt="Imagen 8" />
                </div>
                <div>
                  <img src="/82.jpg" alt="Imagen 2" />
                </div>
                <div>
                  <img src="/81.png" alt="Imagen 3" />
                </div>
                <div>
                  <img src="/83.jpg" alt="Imagen 4" />
                </div>
              </Carousel></CarouselContainer>
          </ImageColumn>
          <InfoColumn>
            <Product>

              <ProductTitle>Botiquín de primeros auxilios según DIN 13169</ProductTitle>
              <Price><strong>Precio habitual:</strong> $700.00 MXN</Price>
              <Quantity>
                <p>Cantidad: </p>
                <QuantityInput type="number" value="1" min="1" />
              </Quantity>
              <Buttons>
                <Button>Agregar al carrito</Button>ㅤㅤ
                <Button>Comprar ahora</Button>
                {productData ? (
        <PaypalButton productData={productData} />
      ) : (
        <p>Loading product data...</p>
      )}
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
          </InfoColumn>
        </TwoColumnContainer>
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

        <h2>ㅤㅤProductos Recomendados</h2>
        <ProductosList>
          {productos.map((producto) => (
            <Producto key={producto.id}>
              <StyledLink to={`/productos/${producto.id}`}>
                <ImagenProducto src={process.env.PUBLIC_URL + '/' + producto.imagen} alt={producto.titulo} />
                <Titulo>{producto.titulo}</Titulo>
                <Precio>Precio: ${producto.precio}</Precio>
              </StyledLink>
            </Producto>
          ))}
        </ProductosList>
      </DetalleProductoContainer>
    </div>
  );
};

export default DetalleProducto;
