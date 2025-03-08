import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface ActionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  to: string;
  color: 'primary' | 'success' | 'info' | 'warning' | 'danger';
}

// Filtrer les props personnalisées pour qu'elles ne soient pas passées au DOM
const CardContainer = styled(Link).attrs<{ cardColor: string }>(props => ({
  // Ne pas transmettre la prop cardColor au DOM
  to: props.to
}))<{ cardColor: string }>`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.boxShadow};
  transition: ${props => props.theme.transition};
  border-left: 5px solid ${props => props.theme.colors[props.cardColor]};
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const IconWrapper = styled.div.attrs<{ iconColor: string }>(() => ({}))<{ iconColor: string }>`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors[props.iconColor]};
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.dark};
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 1rem;
`;

const ActionButton = styled.div.attrs<{ btnColor: string }>(() => ({}))<{ btnColor: string }>`
  margin-top: auto;
  padding: 0.6rem 1rem;
  background-color: ${props => props.theme.colors[props.btnColor]};
  color: white;
  border-radius: ${props => props.theme.borderRadius};
  font-weight: 500;
  text-align: center;
  transition: ${props => props.theme.transition};
  
  &:hover {
    opacity: 0.9;
  }
`;

const ActionCard: React.FC<ActionCardProps> = ({ title, description, icon, to, color }) => {
  return (
    <CardContainer to={to} cardColor={color}>
      <IconWrapper iconColor={color}>{icon}</IconWrapper>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <ActionButton btnColor={color}>Accéder</ActionButton>
    </CardContainer>
  );
};

export default ActionCard;
