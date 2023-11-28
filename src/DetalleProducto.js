import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import StarRanking from './StarRanking';
import PaypalButton from './Paypal_Button';
import { Carousel } from 'react-responsive-carousel';
import productosData from './productos_detalles.json'; // Ajusta la ruta según la ubicación real de tu archivo JSON

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
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Producto = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 200px;
  margin: 10px;
`;

const ImagenProducto = styled.img`
  max-width: 100%;
  max-height: 150px;
  width: auto;
  height: auto;
`;

const Precio = styled.p`
  font-weight: bold;
  color: #2D2F30;
  margin-top: 5px;
`;

const Titulo = styled.h3`
  color: #000;
  margin-top: 5px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const TwoColumnContainer = styled.div`
  display: grid;
  grid-template-columns: 45% 50%;
  column-gap: 5%;
`;

const ImageColumn = styled.div`
  margin-bottom: 20px;
  height: 100%;
`;

const InfoColumn = styled.div`
  margin-bottom: 20px;
`;

const CarouselContainer = styled.div`
  height: 100%;
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

  const selectedProduct = productosData.productos.find(producto => producto.id === parseInt(id, 10));

  if (!selectedProduct) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <div>
      <Helmet>
        <title>{selectedProduct.titulo} - RescueMart</title>
        <meta name='description' content={selectedProduct.descripcion} />
        <meta name="keywords" content={`Product, ${selectedProduct.titulo}, Price, Details`} />
      </Helmet>
      <DetalleProductoContainer>
        <Header>
          <h1>{selectedProduct.titulo}</h1>
        </Header>

        <TwoColumnContainer>
          <ImageColumn>
            <CarouselContainer>
              <Carousel autoPlay infiniteLoop showArrows={false} interval={5000} dynamicHeight={false}>
                {selectedProduct.imagenes.map((imagen, index) => (
                  <div key={index}>
                    <img src={imagen} alt={`Imagen ${index + 1}`} />
                  </div>
                ))}
              </Carousel>
            </CarouselContainer>
          </ImageColumn>
          <InfoColumn>
            <Product>
              <ProductTitle>{selectedProduct.titulo}</ProductTitle>
              <Price><strong>Precio habitual:</strong> ${selectedProduct.precio.toFixed(2)} MXN</Price>
              <Quantity>
                <p>Cantidad: </p>
                <QuantityInput type="number" value={cantidad} min="1" onChange={(e) => setCantidad(e.target.value)} />
              </Quantity>
              <Buttons>
                <Button>Agregar al carrito</Button>
                <Button>Comprar ahora</Button>
                <PaypalButton productData={selectedProduct} />
              </Buttons>
              <h2>Descripción</h2>
              <ProductDescription>
                <p>{selectedProduct.descripcion}</p>
              </ProductDescription>
              <h2>Características</h2>
              <ul>
                {selectedProduct.caracteristicas.map((caracteristica, index) => (
                  <li key={index}>{caracteristica}</li>
                ))}
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

        <h2>Productos Recomendados</h2>
        <ProductosList>
          {productosData.productos.map((producto) => (
            <Producto key={producto.id}>
              <StyledLink to={`/productos/${producto.id}`}>
                <ImagenProducto src={process.env.PUBLIC_URL + '/' + producto.imagenes[0]} alt={producto.titulo} />
                <Titulo>{producto.titulo}</Titulo>
                <Precio>Precio: ${producto.precio.toFixed(2)}</Precio>
              </StyledLink>
            </Producto>
          ))}
        </ProductosList>
      </DetalleProductoContainer>
    </div>
  );
};

export default DetalleProducto;


