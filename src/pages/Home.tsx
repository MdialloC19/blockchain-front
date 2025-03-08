import React from 'react';
import styled from 'styled-components';
import { FaFileAlt, FaSearch, FaEdit, FaDownload, FaTrashAlt } from 'react-icons/fa';
import Layout from '../components/Layout';
import ActionCard from '../components/ActionCard';

const HomeContainer = styled.div`
  padding: 2rem 0;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.primary};
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto;
  color: #6c757d;
`;

const Icon = styled.div`
  font-size: 4rem;
  color: ${props => props.theme.colors.primary};
  margin: 1rem 0;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const Home: React.FC = () => {
  return (
    <Layout>
      <HomeContainer>
        <HeaderSection>
          <Icon>
            <FaFileAlt />
          </Icon>
          <Title>Gestion de Documents</Title>
          <Subtitle>
            Système sécurisé de gestion de documents avec intégration blockchain pour garantir l'intégrité et la traçabilité de vos données.
          </Subtitle>
        </HeaderSection>
        
        <CardsGrid>
          <ActionCard
            title="Créer un document"
            description="Téléverser un nouveau document avec les informations associées."
            icon={<FaFileAlt />}
            to="/create"
            color="success"
          />
          
          <ActionCard
            title="Consulter un document"
            description="Rechercher et afficher les détails d'un document existant."
            icon={<FaSearch />}
            to="/view"
            color="primary"
          />
          
          <ActionCard
            title="Mettre à jour un document"
            description="Modifier les informations d'un document existant."
            icon={<FaEdit />}
            to="/update"
            color="warning"
          />
          
          <ActionCard
            title="Télécharger un fichier"
            description="Accéder et télécharger des documents stockés."
            icon={<FaDownload />}
            to="/download"
            color="info"
          />
          
          <ActionCard
            title="Supprimer un document"
            description="Retirer un document du système."
            icon={<FaTrashAlt />}
            to="/delete"
            color="danger"
          />
        </CardsGrid>
      </HomeContainer>
    </Layout>
  );
};

export default Home;
