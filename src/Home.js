import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styled from 'styled-components';

const CarouselContainer = styled.div`
    max-width: 600px;
    margin: 0 auto;
`;

const Home = () => {
    return (
        <CarouselContainer>
            <Carousel autoPlay infiniteLoop showArrows={false} interval={5000} dynamicHeight={false}>
                <div>
                    <img src="im1.jpg" alt="Imagen 1" />
                </div>
                <div>
                    <img src="im2.jpg" alt="Imagen 2" />
                </div>
                <div>
                    <img src="im3.jpg" alt="Imagen 3" />
                </div>
            </Carousel>
            <InformationContainer>
                <InformationTitle>¿Quiénes somos?</InformationTitle>
                <InformationText>
                    En Rescuemart, nos dedicamos a la venta de productos de primeros auxilios de alta calidad. Nuestra pasión es tu seguridad y bienestar. Estamos comprometidos en proporcionar productos y servicios que te ayudarán a estar preparado para cualquier situación de emergencia. Tu seguridad es nuestra prioridad número uno.
                </InformationText>
                <InformationTitle>¿Qué nos motiva?</InformationTitle>
                <InformationText>
                    Lo que motiva a nuestra empresa, Rescuemart, es nuestra pasión por la seguridad y el bienestar de las personas. Estamos impulsados por un profundo compromiso con la idea de que todos merecen estar preparados para cualquier situación de emergencia. Nuestra principal motivación es la seguridad de nuestros clientes, y trabajamos incansablemente para proporcionar productos y servicios de primeros auxilios de la más alta calidad.
                </InformationText>
                <InformationTitle>Misión</InformationTitle>
                <InformationText>
                    Nuestra misión en Rescuemart es proporcionar a nuestros clientes los productos de primeros auxilios de la más alta calidad, brindando las herramientas y el conocimiento necesarios para estar preparados en situaciones de emergencia. Nos comprometemos a garantizar la seguridad y el bienestar de nuestros clientes, ofreciendo soluciones confiables y efectivas para situaciones críticas.
                </InformationText>
                <InformationTitle>Visión</InformationTitle>
                <InformationText>
                    Nuestra visión en Rescuemart es convertirnos en un referente líder en la industria de productos de primeros auxilios y seguridad. Buscamos expandir nuestra presencia y alcance a nivel nacional e internacional, brindando a las personas y organizaciones las mejores opciones para la preparación en situaciones de emergencia. Nos esforzamos por ser reconocidos por la excelencia, la innovación y el compromiso con la seguridad, contribuyendo a un mundo más seguro y preparado para afrontar cualquier desafío.
                </InformationText>
            </InformationContainer>
        </CarouselContainer>
    );
}

const InformationContainer = styled.div`
    margin-top: 20px;
    text-align: center;
`;

const InformationTitle = styled.h2`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
`;

const InformationText = styled.p`
    font-size: 16px;
    line-height: 1.5;
    text-align: justify;
`;

export default Home;