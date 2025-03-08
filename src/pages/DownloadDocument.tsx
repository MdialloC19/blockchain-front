import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaCheckCircle, FaTimesCircle, FaDownload } from 'react-icons/fa';
import Layout from '../components/Layout';

const DownloadDocumentContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.info};
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
    border-color: ${props => props.theme.colors.info};
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.25);
  }
`;

const SearchButton = styled.button`
  background-color: ${props => props.theme.colors.info};
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
    background-color: #138496;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const DocumentInfo = styled.div`
  flex: 1;
`;

const DocumentTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.dark};
`;

const DocumentDate = styled.p`
  font-size: 0.875rem;
  color: #6c757d;
  margin-bottom: 0.5rem;
`;

const BlockchainStatus = styled.div<{ verified: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: ${props => props.verified ? props.theme.colors.success : props.theme.colors.danger};
  margin-bottom: 0.5rem;
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6c757d;
`;

const DownloadButton = styled.button`
  background-color: ${props => props.theme.colors.info};
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
    background-color: #138496;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6c757d;
`;

const SuccessMessage = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: rgba(40, 167, 69, 0.1);
  color: ${props => props.theme.colors.success};
  border-radius: ${props => props.theme.borderRadius};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// Données factices pour les documents
const mockDocuments = [
  {
    id: '1',
    title: 'Rapport Q1 2025',
    description: 'Rapport financier du premier trimestre 2025.',
    date: '2025-03-06',
    fileSize: '2.4 MB',
    fileType: 'PDF',
    verified: true,
  },
  {
    id: '2',
    title: 'Contrat de partenariat',
    description: 'Contrat de partenariat avec Société ABC.',
    date: '2025-02-15',
    fileSize: '1.7 MB',
    fileType: 'DOCX',
    verified: true,
  },
  {
    id: '3',
    title: 'Document confidentiel',
    description: 'Document interne confidentiel concernant le projet XYZ.',
    date: '2025-01-28',
    fileSize: '3.8 MB',
    fileType: 'PDF',
    verified: false,
  },
];

const DownloadDocument: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [documents, setDocuments] = useState(mockDocuments);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  
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
  
  const handleDownload = (docId: string, docTitle: string) => {
    // Simuler un téléchargement
    console.log(`Téléchargement du document ${docId}`);
    setDownloadSuccess(docTitle);
    
    // Réinitialiser le message après 5 secondes
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 5000);
  };
  
  return (
    <Layout>
      <DownloadDocumentContainer>
        <PageTitle>
          <FaDownload /> Télécharger des documents
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
        
        {downloadSuccess && (
          <SuccessMessage>
            <FaCheckCircle /> Le document "{downloadSuccess}" a été téléchargé avec succès!
          </SuccessMessage>
        )}
        
        <DocumentsContainer>
          {documents.length > 0 ? (
            <DocumentsList>
              {documents.map((doc) => (
                <DocumentCard key={doc.id}>
                  <DocumentInfo>
                    <DocumentTitle>{doc.title}</DocumentTitle>
                    <DocumentDate>Créé le {doc.date}</DocumentDate>
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
                    <FileInfo>
                      Type: {doc.fileType} | Taille: {doc.fileSize}
                    </FileInfo>
                  </DocumentInfo>
                  
                  <DownloadButton onClick={() => handleDownload(doc.id, doc.title)}>
                    <FaDownload /> Télécharger
                  </DownloadButton>
                </DocumentCard>
              ))}
            </DocumentsList>
          ) : (
            <EmptyState>
              Aucun document trouvé pour votre recherche.
            </EmptyState>
          )}
        </DocumentsContainer>
      </DownloadDocumentContainer>
    </Layout>
  );
};

export default DownloadDocument;
