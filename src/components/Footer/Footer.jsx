import React from 'react';
import {
  StyledFooter,
  FooterText,
  FooterCredits,
  SocialLinks,
  SocialIcon,
  FooterNavLink, 
  LinksColumn 
} from './Footer.styles';

const Footer = () => {
  return (
    <StyledFooter
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 10, delay: 0.5 }}
    >
      

      <FooterText>
        © {new Date().getFullYear()} YouChef. Tous droits réservés.
      </FooterText>

      
      <FooterCredits>
        Créé par Jean Fabrice ZARA
      </FooterCredits>

      <SocialLinks>
        <SocialIcon href="https://facebook.com" target="_blank" aria-label="Facebook">
          <i className="fab fa-facebook"></i>
        </SocialIcon>
        <SocialIcon href="https://instagram.com" target="_blank" aria-label="Instagram">
          <i className="fab fa-instagram"></i>
        </SocialIcon>
        <SocialIcon href="https://twitter.com" target="_blank" aria-label="Twitter">
          <i className="fab fa-twitter"></i>
        </SocialIcon>
      </SocialLinks>
    </StyledFooter>
  );
};

export default Footer;