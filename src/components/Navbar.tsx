import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaFile, FaHome } from 'react-icons/fa';

const NavContainer = styled.nav`
  background-color: ${props => props.theme.colors.primary};
  padding: 0.8rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.white};
  
  &:hover {
    opacity: 0.9;
  }
`;

const LogoText = styled.span`
  margin-left: 10px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.white};
  font-weight: 500;
  padding: 0.5rem 0.8rem;
  border-radius: ${props => props.theme.borderRadius};
  transition: ${props => props.theme.transition};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Navbar: React.FC = () => {
  return (
    <NavContainer>
      <NavContent>
        <Logo to="/">
          <FaFile />
          <LogoText>GestionDocs</LogoText>
        </Logo>
        <NavLinks>
          <NavLink to="/">Accueil</NavLink>
          <NavLink to="/create">Créer</NavLink>
          <NavLink to="/view">Consulter</NavLink>
          <NavLink to="/update">Mettre à jour</NavLink>
          <NavLink to="/download">Télécharger</NavLink>
          <NavLink to="/delete">Supprimer</NavLink>
        </NavLinks>
      </NavContent>
    </NavContainer>
  );
};

export default Navbar;
