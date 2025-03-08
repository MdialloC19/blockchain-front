import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTrash, FaSearch, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import Layout from '../components/Layout';

const DeleteDocumentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.danger};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Card = styled.div`
  background-color: ${props => props.theme.colors.white};
  padding: 2rem;
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.boxShadow};
  margin-bottom: 2rem;
`;

const SearchForm = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: ${props => props.theme.borderRadius};
  font-size: 1rem;
  
  &:focus {
    border-color: ${props => props.theme.colors.danger};
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
  }
`;

const SearchButton = styled.button`
  background-color: ${props => props.theme.colors.danger};
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
    background-color: #c82333;
  }
`;

const DocumentsContainer = styled.div`
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
    border-color: ${props => props.theme.colors.danger};
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

const DocumentDescription = styled.p`
  margin-bottom: 1.5rem;
  color: #495057;
`;

const DeleteConfirmation = styled.div`
  background-color: rgba(220, 53, 69, 0.1);
  padding: 1rem;
  border-radius: ${props => props.theme.borderRadius};
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const WarningMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  color: ${props => props.theme.colors.danger};
  margin-bottom: 1rem;
`;

const DeleteActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const DeleteButton = styled.button`
  background-color: ${props => props.theme.colors.danger};
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
    background-color: #c82333;
  }
  
  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  background-color: #6c757d;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: ${props => props.theme.transition};
  
  &:hover {
    background-color: #5a6268;
  }
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

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6c757d;
`;

const ConfirmCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  
  input {
    width: 18px;
    height: 18px;
  }
  
  label {
    font-size: 0.9rem;
    color: ${props => props.theme.colors.danger};
  }
`;

// Données factices pour les documents
const mockDocuments = [
  {
    id: '1',
    title: 'Rapport Q1 2025',
    description: 'Rapport financier du premier trimestre 2025.',
    date: '2025-03-06',
  },
  {
    id: '2',
    title: 'Contrat de partenariat',
    description: 'Contrat de partenariat avec Société ABC.',
    date: '2025-02-15',
  },
  {
    id: '3',
    title: 'Document confidentiel',
    description: 'Document interne confidentiel concernant le projet XYZ.',
    date: '2025-01-28',
  },
];

const DeleteDocument: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [documents, setDocuments] = useState<typeof mockDocuments>([]);
  const [selectedDocument, setSelectedDocument] = useState<(typeof mockDocuments)[0] | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Réinitialiser les états
    setSelectedDocument(null);
    setIsConfirming(false);
    setIsConfirmed(false);
    
    // Simulation de recherche de documents
    if (searchTerm.trim() === '') {
      setDocuments([]);
    } else {
      const filteredDocs = mockDocuments.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDocuments(filteredDocs);
    }
  };
  
  const handleSelectDocument = (document: (typeof mockDocuments)[0]) => {
    setSelectedDocument(document);
    setIsConfirming(true);
    setIsConfirmed(false);
  };
  
  const handleCancelDelete = () => {
    setIsConfirming(false);
    setSelectedDocument(null);
    setIsConfirmed(false);
  };
  
  const handleDelete = async () => {
    if (!isConfirmed || !selectedDocument) return;
    
    setIsDeleting(true);
    
    try {
      // Simulation d'un appel API pour supprimer le document
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mise à jour de la liste des documents
      setDocuments(prev => prev.filter(doc => doc.id !== selectedDocument.id));
      setIsSuccess(true);
      setIsConfirming(false);
      setSelectedDocument(null);
      
      // Réinitialiser après un délai
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Erreur lors de la suppression du document:', error);
    } finally {
      setIsDeleting(false);
      setIsConfirmed(false);
    }
  };
  
  return (
    <Layout>
      <DeleteDocumentContainer>
        <PageTitle>
          <FaTrash /> Supprimer un document
        </PageTitle>
        
        <Card>
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
          
          {isSuccess && (
            <SuccessMessage>
              <FaCheckCircle /> Document supprimé avec succès!
            </SuccessMessage>
          )}
          
          {isConfirming && selectedDocument ? (
            <DeleteConfirmation>
              <WarningMessage>
                <FaExclamationTriangle /> Attention! Cette action est irréversible.
              </WarningMessage>
              <DocumentTitle>
                Voulez-vous vraiment supprimer le document "{selectedDocument.title}" ?
              </DocumentTitle>
              <DocumentDescription>
                {selectedDocument.description}
              </DocumentDescription>
              
              <ConfirmCheckbox>
                <input
                  type="checkbox"
                  id="confirm-delete"
                  checked={isConfirmed}
                  onChange={(e) => setIsConfirmed(e.target.checked)}
                />
                <label htmlFor="confirm-delete">
                  Je comprends que cette action est permanente et que les données seront supprimées de façon irréversible.
                </label>
              </ConfirmCheckbox>
              
              <DeleteActions>
                <DeleteButton
                  onClick={handleDelete}
                  disabled={!isConfirmed || isDeleting}
                >
                  {isDeleting ? 'Suppression en cours...' : 'Confirmer la suppression'}
                </DeleteButton>
                <CancelButton onClick={handleCancelDelete}>
                  Annuler
                </CancelButton>
              </DeleteActions>
            </DeleteConfirmation>
          ) : documents.length > 0 ? (
            <DocumentsContainer>
              {documents.map((doc) => (
                <DocumentCard key={doc.id}>
                  <DocumentHeader>
                    <div>
                      <DocumentTitle>{doc.title}</DocumentTitle>
                      <DocumentDate>Créé le {doc.date}</DocumentDate>
                    </div>
                  </DocumentHeader>
                  
                  <DocumentDescription>{doc.description}</DocumentDescription>
                  
                  <DeleteButton onClick={() => handleSelectDocument(doc)}>
                    <FaTrash /> Supprimer
                  </DeleteButton>
                </DocumentCard>
              ))}
            </DocumentsContainer>
          ) : searchTerm && (
            <EmptyState>
              Aucun document trouvé pour votre recherche.
            </EmptyState>
          )}
        </Card>
      </DeleteDocumentContainer>
    </Layout>
  );
};

export default DeleteDocument;
