import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styled from 'styled-components';





const Home = () => {

  // Obtén solo los primeros 5 productos

 

  return (
    <div>
      <Helmet>
        <title>RescueMart - Tu Tienda de Productos de Primeros Auxilios</title>
        <meta name="description" content="Bienvenido a RescueMart, tu fuente confiable para productos de primeros auxilios de alta calidad. Estamos comprometidos en proporcionar los mejores productos y servicios para tu seguridad y bienestar." />
        <meta name="keywords" content="Rescuemart, Productos de primeros auxilios, Seguridad y bienestar, Misión y visión, Preparación en situaciones de emergencia, Excelencia, innovación, compromiso con la seguridad" />
      </Helmet>

      <CustomCarousel autoPlay infiniteLoop showArrows={false} interval={2000} dynamicHeight={false}>
        <div>
          <img src="im2.jpg" alt="Imagen 2" />
        </div>
        <div>
          <img src="im3.jpg" alt="Imagen 3" />
        </div>
        <div>
          <img src="im4.jpg" alt="Imagen 4" />
        </div>
      </CustomCarousel>

      <InformationContainer>
        <ContentWrapper>
          <InformationText>
            <h1>¿Quiénes somos?</h1>
            <p>
              En Rescuemart, nos dedicamos a la venta de productos de primeros auxilios de alta calidad. Nuestra pasión es tu seguridad y bienestar. Estamos comprometidos en proporcionar productos y servicios que te ayudarán a estar preparado para cualquier situación de emergencia. Tu seguridad es nuestra prioridad número uno.
            </p>
          </InformationText>
          <ImageWrapper>
            <img src="inicio1.2.jpg" alt="Imagen 1.2" />
          </ImageWrapper>
        </ContentWrapper>

        <ContentWrapper reversed>
          <InformationText>
            <h1>¿Qué nos motiva?</h1>
            <p>
              Lo que motiva a nuestra empresa, Rescuemart, es nuestra pasión por la seguridad y el bienestar de las personas. Estamos impulsados por un profundo compromiso con la idea de que todos merecen estar preparados para cualquier situación de emergencia. Nuestra principal motivación es la seguridad de nuestros clientes, y trabajamos incansablemente para proporcionar productos y servicios de primeros auxilios de la más alta calidad.
            </p>
          </InformationText>
          <ImageWrapper>
            <img src="inicio1.1.jpg" alt="Imagen 1" />
          </ImageWrapper>
        </ContentWrapper>

        <ContentWrapper>
          <InformationText>
            <h1>Misión</h1>
            <p>
              Nuestra misión en Rescuemart es proporcionar a nuestros clientes los productos de primeros auxilios de la más alta calidad, brindando las herramientas y el conocimiento necesarios para estar preparados en situaciones de emergencia. Nos comprometemos a garantizar la seguridad y el bienestar de nuestros clientes, ofreciendo soluciones confiables y efectivas para situaciones críticas.
            </p>
          </InformationText>
          <ImageWrapper>
            <img src="inicio1.2.jpg" alt="Imagen 1.2" />
          </ImageWrapper>
        </ContentWrapper>

        <ContentWrapper reversed>
          <InformationText>
            <h1>Visión</h1>
            <p>
              Nuestra visión en Rescuemart es convertirnos en un referente líder en la industria de productos de primeros auxilios y seguridad. Buscamos expandir nuestra presencia y alcance a nivel nacional e internacional, brindando a las personas y organizaciones las mejores opciones para la preparación en situaciones de emergencia. Nos esforzamos por ser reconocidos por la excelencia, la innovación y el compromiso con la seguridad, contribuyendo a un mundo más seguro y preparado para afrontar cualquier desafío.
            </p>
          </InformationText>
          <ImageWrapper>
            <img src="inicio1.3.jpg" alt="Imagen 1.3" />
          </ImageWrapper>
        </ContentWrapper>
      </InformationContainer>
      
    </div>
  );
}

// const productos = [
//   { id: 1, titulo: 'Botiquín de primeros auxilios según DIN 13169', precio: 700.00, imagen: 'Botiquín1.jpg' },
// ];

const CustomCarousel = styled(Carousel)`
  width: 100%;
  max-height: 500px;
  overflow: hidden;
`;

const InformationContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 28px;
  margin-top: 30px;
  margin-bottom: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap-reverse;
  margin-bottom: 30px;
  ${({ reversed }) => reversed && 'flex-direction: row-reverse;'}

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  margin: 10px;
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

const InformationText = styled.div`
  flex: 1;
  max-width: 600px;
  text-align: justify;
  margin-right: 20px;
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

export default Home;