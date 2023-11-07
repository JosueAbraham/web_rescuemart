import React from 'react'

import styled from 'styled-components';



const Footer = () => {
  return (
    <FooterContainer>
      <FooterSection>
        <FooterTitle>Acerca de nosotros</FooterTitle>
        <FooterText>
          En RescueMart, nuestra pasión es tu seguridad y bienestar. Somos un equipo comprometido en proporcionar productos y servicios de primeros auxilios de alta calidad para ayudarte a estar preparado para cualquier situación de emergencia. Tu seguridad es nuestra prioridad número uno.
        </FooterText>
      </FooterSection>
      <FooterSectionCentered> {/* Sección centrada para el contacto */}
        <FooterTitle>Contacto</FooterTitle>
        <FooterTextCentered> {/* Texto centrado */}
          Dirección: 20196, Gral. Lázaro Cárdenas 304, Rodolfo Landeros, Aguascalientes, Ags.<br />
          Teléfono: 449-485-25-14<br />
          Correo Electrónico: <StyledLink href="mailto:rescuemart1@gmail.com">rescuemart1@gmail.com</StyledLink>
        </FooterTextCentered>
      </FooterSectionCentered>
      <FooterSection>
        <FooterTitle>Redes sociales</FooterTitle>
        <SocialMediaLinks>
          <StyledLink href="https://www.facebook.com/profile.php?id=61553175271227" target="_blank">Facebook</StyledLink>
          <StyledLink href="https://twitter.com/MartRescue66150" target="_blank">Twitter</StyledLink>
        </SocialMediaLinks>
      </FooterSection>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  background-color: #368591;
  color: #D9E5E6;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  gap: 20px; /* Separación entre los elementos */
`;

const FooterSection = styled.div`
  flex: 1;
  text-align: center;
`;

const FooterSectionCentered = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterTitle = styled.h3`
  font-weight: bold;
  margin-bottom: 10px;
  color: #D9E5E6; /* Cambia el color a negro */
`;

const FooterText = styled.p`
  color: #000; /* Cambia el color a negro */
  line-height: 1.5; /* Interlineado de 1.5 */
  text-align: justify;
`;

const FooterTextCentered = styled.p`
  color: #000; /* Cambia el color a negro */
  text-align: center; /* Texto centrado */
  line-height: 1.5; /* Interlineado de 1.5 */
`;

const SocialMediaLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledLink = styled.a`
  text-decoration: none; /* Elimina el subrayado de los enlaces */
  color: #000; /* Cambia el color a negro */
`;


export default Footer;
