import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import StarRanking from './StarRanking';
import PaypalButton from './Paypal_Button';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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
  margin-top: 10px;
`;

const QuantityLabel = styled.p`
  font-size: 16px;
  margin-right: 10px;
`;

const QuantityInput = styled.input`
  width: 60px;
  padding: 8px;
  text-align: center;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #e44d26;
    box-shadow: 0 0 5px rgba(228, 77, 38, 0.7);
  }
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

const ProductStock = styled.p`
font-size: 20px;
  color: #2e62b6;

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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPaypalOverlay, setShowPaypalOverlay] = useState(false);
  const [data, setData] = useState([]); // Cambio aquí: usamos un estado para almacenar los datos de productos
  const [carrito, setCarrito] = useState([]);
  const [mensajeAgregado, setMensajeAgregado] = useState(false);

  // Efecto de inicialización para obtener el carrito desde localStorage
  useEffect(() => {
    // Intentar obtener el carrito desde localStorage
    const storedCart = localStorage.getItem('carrito');

    // Si hay un carrito almacenado, actualizar el estado
    if (storedCart) {
      setCarrito(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch('/products.json');
        const jsonData = await response.json();
        setData(jsonData); // Cambio aquí: actualizamos el estado con los datos de productos
        const product = jsonData.find((product) => product.id === parseInt(id));

        if (product) {
          setSelectedProduct(product);
        } else {
          console.error(`Product with id ${id} not found.`);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [id, showPaypalOverlay]);

  const handleComprarAhora = (product) => {
    setSelectedProduct(product);
    setShowPaypalOverlay(true);
  };

  const handleCantidadChange = (event) => {
    const newCantidad = parseInt(event.target.value);
    setCantidad(newCantidad >= 1 ? newCantidad : 1);
  };

  const handleOpinionChange = (event) => {
    setOpinion(event.target.value);
  };

  const handleOpinionSubmit = (event) => {
    event.preventDefault();
    console.log('Opinión enviada:', opinion);
    setOpinion('');
  };

  const handleAgregarAlCarrito = () => {
    // Lógica para agregar al carrito
  
    // Actualizar el estado del carrito
    const nuevoCarrito = [...carrito, { ...selectedProduct, cantidad }];
    setCarrito(nuevoCarrito);
  
    // Actualizar localStorage con el carrito actualizado
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  
    // Mostrar el mensaje de éxito
    setMensajeAgregado(true);
  
    // Puedes reiniciar la cantidad a 1 después de agregar al carrito si lo deseas
    setCantidad(1);
  
    // Ocultar el mensaje después de unos segundos
    setTimeout(() => {
      setMensajeAgregado(false);
    }, 3000); // 3000 milisegundos (3 segundos)
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
              <h1>{selectedProduct.nombre}</h1>
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
                  <ProductTitle>{selectedProduct.nombre}</ProductTitle>
                  <p>Categoría: {selectedProduct.categoria}</p>
                  <Price><strong>Precio habitual:</strong> ${selectedProduct.precio.toFixed(2)} USD</Price>
                  <Quantity>
  <QuantityLabel>Cantidad: </QuantityLabel>
  <QuantityInput
    type="number"
    value={cantidad}
    min="1"
    onChange={handleCantidadChange}
  />
</Quantity>
                  <Buttons>
                  <Button onClick={handleAgregarAlCarrito}>Agregar al carrito</Button>ㅤㅤ
                    <Button onClick={() => handleComprarAhora(selectedProduct)}>Comprar ahora</Button>
                  </Buttons>
                  {mensajeAgregado && <p>Agregado al carrito exitosamente</p>}
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
                  <ProductStock><strong>Cantidad en almacen:</strong> {selectedProduct.stock}</ProductStock>
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
    
      {showPaypalOverlay && selectedProduct.relacionados && (
        <Overlay showOverlay={showPaypalOverlay}>
        <StyledCookieConsent>
          <h2>Comprar ahora</h2>
          <p>
            Nombre: {selectedProduct.nombre}
            <br />
            Precio unitario: ${selectedProduct.precio.toFixed(2)} USD
            <br />
            Cantidad: {cantidad}
            <br />
            Total: ${(selectedProduct.precio * cantidad).toFixed(2)} USD
          </p>
          <img
            src={process.env.PUBLIC_URL + '/' + selectedProduct.imagen}
            alt={selectedProduct.nombre}
            style={{ maxWidth: '100%', maxHeight: '200px' }}
          />
          <PaypalButton
            precio={(selectedProduct.precio * cantidad).toFixed(2)}
            // Agrega otras propiedades necesarias para el componente PaypalButton
          />
          <button onClick={() => setShowPaypalOverlay(false)}>Cerrar</button>
        </StyledCookieConsent>
      </Overlay>
      )}

{selectedProduct && (
        <>
          <h2>Productos Relacionados</h2>
          <ProductosList>
            {selectedProduct.relacionados.map((relatedProductId) => {
              const relatedProduct = data.find(product => product.id === relatedProductId);

              if (relatedProduct) {
                return (
                  <Producto key={relatedProduct.id}>
                    <StyledLink to={`/productos/${relatedProduct.id}`}>
                      <ImagenProducto src={process.env.PUBLIC_URL + '/' + relatedProduct.imagen} alt={relatedProduct.titulo} />
                      <Precio>{relatedProduct.categoria}</Precio>
                      <Titulo>{relatedProduct.nombre}</Titulo>
                      <Precio>Precio: ${relatedProduct.precio}</Precio>
                    </StyledLink>
                  </Producto>
                );
              }

              return null;
            })}
          </ProductosList>
        </>
      )}

    </div>
  );
}

export default DetalleProducto;
