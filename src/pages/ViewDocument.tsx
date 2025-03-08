import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaCheckCircle, FaTimesCircle, FaDownload, FaEdit, FaTrash } from 'react-icons/fa';
import Layout from '../components/Layout';

const ViewDocumentContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SearchContainer = styled.div`
  background-color: ${props => props.theme.colors.white};
  padding: 1.5rem;
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.boxShadow};
  margin-bottom: 2rem;
`;

const SearchForm = styled.form`
  display: flex;
  gap: 1rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: ${props => props.theme.borderRadius};
  font-size: 1rem;
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(48, 80, 204, 0.25);
  }
`;

const SearchButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: ${props => props.theme.transition};
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #2440a0;
  }
`;

const DocumentsContainer = styled.div`
  background-color: ${props => props.theme.colors.white};
  padding: 1.5rem;
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.boxShadow};
`;

const DocumentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DocumentCard = styled.div`
  border: 1px solid #ced4da;
  border-radius: ${props => props.theme.borderRadius};
  padding: 1.5rem;
  transition: ${props => props.theme.transition};
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const DocumentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const DocumentTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.dark};
`;

const DocumentDate = styled.p`
  font-size: 0.875rem;
  color: #6c757d;
`;

const DocumentHashContainer = styled.div`
  background-color: #f8f9fa;
  padding: 0.75rem;
  border-radius: ${props => props.theme.borderRadius};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DocumentHash = styled.code`
  font-size: 0.875rem;
  color: #495057;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BlockchainStatus = styled.div<{ verified: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: ${props => props.verified ? props.theme.colors.success : props.theme.colors.danger};
`;

const DocumentDescription = styled.p`
  margin-bottom: 1.5rem;
  color: #495057;
`;

const DocumentActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button<{ btnColor: string }>`
  background-color: ${props => props.theme.colors[props.btnColor]};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: ${props => props.theme.transition};
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    opacity: 0.9;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6c757d;
`;

// Données factices pour les documents
const mockDocuments = [
  {
    id: '1',
    title: 'Rapport Q1 2025',
    description: 'Rapport financier du premier trimestre 2025.',
    date: '2025-03-06',
    hash: '0x8f7d8b9c2e1a3f4d5e6b7c8d9e0f1a2b3c4d5e6f7',
    verified: true,
  },
  {
    id: '2',
    title: 'Contrat de partenariat',
    description: 'Contrat de partenariat avec Société ABC.',
    date: '2025-02-15',
    hash: '0x2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
    verified: true,
  },
  {
    id: '3',
    title: 'Document confidentiel',
    description: 'Document interne confidentiel concernant le projet XYZ.',
    date: '2025-01-28',
    hash: '0xc1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e',
    verified: false,
  },
];

const ViewDocument: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [documents, setDocuments] = useState(mockDocuments);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulation de recherche de documents
    if (searchTerm.trim() === '') {
      setDocuments(mockDocuments);
    } else {
      const filteredDocs = mockDocuments.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDocuments(filteredDocs);
    }
  };
  
  return (
    <Layout>
      <ViewDocumentContainer>
        <PageTitle>
          <FaSearch /> Consulter les documents
        </PageTitle>
        
        <SearchContainer>
          <SearchForm onSubmit={handleSearch}>
            <SearchInput
              type="text"
              placeholder="Rechercher un document par titre ou description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchButton type="submit">
              <FaSearch /> Rechercher
            </SearchButton>
          </SearchForm>
        </SearchContainer>
        
        <DocumentsContainer>
          {documents.length > 0 ? (
            <DocumentsList>
              {documents.map((doc) => (
                <DocumentCard key={doc.id}>
                  <DocumentHeader>
                    <div>
                      <DocumentTitle>{doc.title}</DocumentTitle>
                      <DocumentDate>Créé le {doc.date}</DocumentDate>
                    </div>
                    <BlockchainStatus verified={doc.verified}>
                      {doc.verified ? (
                        <>
                          <FaCheckCircle /> Vérifié sur blockchain
                        </>
                      ) : (
                        <>
                          <FaTimesCircle /> Non vérifié
                        </>
                      )}
                    </BlockchainStatus>
                  </DocumentHeader>
                  
                  <DocumentHashContainer>
                    <DocumentHash>{doc.hash}</DocumentHash>
                  </DocumentHashContainer>
                  
                  <DocumentDescription>{doc.description}</DocumentDescription>
                  
                  <DocumentActions>
                    <ActionButton btnColor="info">
                      <FaDownload /> Télécharger
                    </ActionButton>
                    <ActionButton btnColor="warning">
                      <FaEdit /> Modifier
                    </ActionButton>
                    <ActionButton btnColor="danger">
                      <FaTrash /> Supprimer
                    </ActionButton>
                  </DocumentActions>
                </DocumentCard>
              ))}
            </DocumentsList>
          ) : (
            <EmptyState>
              Aucun document trouvé pour votre recherche.
            </EmptyState>
          )}
        </DocumentsContainer>
      </ViewDocumentContainer>
    </Layout>
  );
};

export default ViewDocument;
