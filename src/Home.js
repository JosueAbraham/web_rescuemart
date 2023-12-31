import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styled from 'styled-components';
import AgregarCarrito from './AgregarCarrito';
import AgregarListaDeseos from './AgregarListaDeseos';

const Home = () => {
  const [productosDestacados, setProductosDestacados] = useState([]);
  const [carouselKey, setCarouselKey] = useState(0);


  useEffect(() => {
    const fetchProductosDestacados = async () => {
      try {
        const response = await fetch(process.env.PUBLIC_URL + '/products.json');
        const data = await response.json();
        const destacados = data.filter((producto) => producto.destacado);
        setProductosDestacados(destacados);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProductosDestacados();
  }, []);

  useEffect(() => {
    setCarouselKey((prevKey) => prevKey + 1);
  }, [productosDestacados]);

  return (
    <div>
      <Helmet>
        <title>RescueMart - Tu Tienda de Productos de Primeros Auxilios</title>
        <meta
          name="description"
          content="Bienvenido a RescueMart, tu fuente confiable para productos de primeros auxilios de alta calidad. Estamos comprometidos en proporcionar los mejores productos y servicios para tu seguridad y bienestar."
        />
        <meta
          name="keywords"
          content="Rescuemart, Productos de primeros auxilios, Seguridad y bienestar, Misión y visión, Preparación en situaciones de emergencia, Excelencia, innovación, compromiso con la seguridad"
        />
      </Helmet>
      <CustomCarousel key={carouselKey} autoPlay infiniteLoop showArrows={false} interval={2000} dynamicHeight={false}>
        {productosDestacados.map((producto) => (
          <Link to={`/productos/${producto.id}`} key={producto.id}>
            <div>
              <img src={process.env.PUBLIC_URL + '/' + producto.imagen} alt={producto.nombre} />
            </div>
          </Link>
        ))}
      </CustomCarousel>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Productos destacados</h1>
      <ProductosList>
        {productosDestacados.map((producto) => (
          <Producto key={producto.id}>
            <StyledLink to={`/productos/${producto.id}`}>
              <ImagenProducto src={process.env.PUBLIC_URL + '/' + producto.imagen} alt={producto.nombre} />
              <Precio>{producto.categoria}</Precio>
              <Titulo>{producto.nombre}</Titulo>
              <Precio>Precio: ${producto.precio}</Precio>
            </StyledLink>
            <AgregarCarrito selectedProduct={producto} cantidad={1} />
            <AgregarListaDeseos selectedProduct={producto} />
          </Producto>
        ))}
      </ProductosList>
      <InformationContainer>
        <InformationRow>
          <InformationTextContainer>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>¿Quiénes somos?</h1>
            <InformationText>
              En Rescuemart, nos dedicamos a la venta de productos de primeros auxilios de alta calidad. Nuestra pasión es tu seguridad y bienestar. Estamos comprometidos en proporcionar productos y servicios que te ayudarán a estar preparado para cualquier situación de emergencia. Tu seguridad es nuestra prioridad número uno.
            </InformationText>
          </InformationTextContainer>
          <InformationImageContainer reverse>
            <img src="Inicio1.jpg" alt="Inicio 1" />
          </InformationImageContainer>
        </InformationRow>

        <InformationRow>
          <InformationTextContainer>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>¿Qué nos motiva?</h1>
            <InformationText>
              Lo que motiva a nuestra empresa, Rescuemart, es nuestra pasión por la seguridad y el bienestar de las personas. Estamos impulsados por un profundo compromiso con la idea de que todos merecen estar preparados para cualquier situación de emergencia. Nuestra principal motivación es la seguridad de nuestros clientes, y trabajamos incansablemente para proporcionar productos y servicios de primeros auxilios de la más alta calidad.
            </InformationText>
          </InformationTextContainer>
          <InformationImageContainer>
            <img src="Inicio11.jpg" alt="Inicio 2" />
          </InformationImageContainer>
        </InformationRow>

        <InformationRow>
          <InformationTextContainer>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Misión</h1>
            <InformationText>
              Nuestra misión en Rescuemart es proporcionar a nuestros clientes los productos de primeros auxilios de la más alta calidad, brindando las herramientas y el conocimiento necesarios para estar preparados en situaciones de emergencia. Nos comprometemos a garantizar la seguridad y el bienestar de nuestros clientes, ofreciendo soluciones confiables y efectivas para situaciones críticas.
            </InformationText>
          </InformationTextContainer>
          <InformationImageContainer reverse>
            <img src="Inicio12.jpg" alt="Inicio 3" />
          </InformationImageContainer>
        </InformationRow>

        <InformationRow>
          <InformationTextContainer>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Visión</h1>
            <InformationText>
              Nuestra visión en Rescuemart es convertirnos en un referente líder en la industria de productos de primeros auxilios y seguridad. Buscamos expandir nuestra presencia y alcance a nivel nacional e internacional, brindando a las personas y organizaciones las mejores opciones para la preparación en situaciones de emergencia. Nos esforzamos por ser reconocidos por la excelencia, la innovación y el compromiso con la seguridad, contribuyendo a un mundo más seguro y preparado para afrontar cualquier desafío.
            </InformationText>
          </InformationTextContainer>
          <InformationImageContainer>
            <img src="Inicio13.jpg" alt="Inicio 4" />
          </InformationImageContainer>
        </InformationRow>
      </InformationContainer>
    </div>
  );
};

const CustomCarousel = styled(Carousel)`
width: 100%;
max-height: 650px;
overflow: hidden;
margin-bottom: 20px;

.carousel {
  border-radius: 8px;
  overflow: hidden;
}

.slide {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fffff;
  border-radius: 8px;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
}

@media (max-width: 768px) {
  max-height: 300px;
}
`;

const InformationContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const InformationRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InformationTextContainer = styled.div`
  flex: 1;

  h1 {
    text-align: center;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      text-align: left;
    }
  }
`;

const InformationImageContainer = styled.div`
  flex: 1;
  margin-left: 20px;
  order: ${(props) => (props.reverse ? -1 : 1)};

  img {
    max-width: 100%;
    height: auto;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    order: initial;
    margin-top: 20px;
  }
`;

const InformationText = styled.p`
  font-size: 16px;
  line-height: 1.5;
  text-align: justify;
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

  @media (min-width: 768px) {
    width: calc(33.33% - 20px);
    margin: 10px;
  }
`;

const ImagenProducto = styled.img`
  max-width: 100%;
  max-height: 150px;
  width: auto;
  object-fit: cover; // Ajusta la imagen para cubrir completamente el contenedor sin deformarse
`;

const Precio = styled.p`
  font-weight: bold;
  color: #2d2f30;
  margin-top: 5px;
`;

const Titulo = styled.h3`
  color: #000;
  margin-top: 5px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default Home;