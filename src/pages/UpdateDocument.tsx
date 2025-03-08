import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaEdit, FaCheckCircle, FaSearch } from 'react-icons/fa';
import Layout from '../components/Layout';

const UpdateDocumentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.warning};
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
    border-color: ${props => props.theme.colors.warning};
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.25);
  }
`;

const SearchButton = styled.button`
  background-color: ${props => props.theme.colors.warning};
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
    background-color: #e0a800;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: ${props => props.theme.borderRadius};
  font-size: 1rem;
  
  &:focus {
    border-color: ${props => props.theme.colors.warning};
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.25);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: ${props => props.theme.borderRadius};
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    border-color: ${props => props.theme.colors.warning};
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.25);
  }
`;

const DocumentInfo = styled.div`
  background-color: rgba(255, 193, 7, 0.1);
  padding: 1rem;
  border-radius: ${props => props.theme.borderRadius};
  margin-bottom: 1.5rem;
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

const DocumentHashInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #6c757d;
  background-color: #f8f9fa;
  padding: 0.5rem;
  border-radius: ${props => props.theme.borderRadius};
  margin-top: 0.5rem;
`;

const UpdateButton = styled.button`
  background-color: ${props => props.theme.colors.warning};
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
    background-color: #e0a800;
  }
  
  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
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

const NoDocumentMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6c757d;
`;

// Données factices pour simuler un document trouvé
const mockDocument = {
  id: '2',
  title: 'Contrat de partenariat',
  description: 'Contrat de partenariat avec Société ABC.',
  date: '2025-02-15',
  hash: '0x2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
};

const UpdateDocument: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [document, setDocument] = useState<typeof mockDocument | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Fonction pour simuler la recherche d'un document
  const handleSearchDocument = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Dans un cas réel, on ferait un appel API ici
    if (searchTerm.toLowerCase().includes('contrat')) {
      setDocument(mockDocument);
      setFormData({
        title: mockDocument.title,
        description: mockDocument.description,
      });
    } else {
      setDocument(null);
      setFormData({
        title: '',
        description: '',
      });
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulation d'un appel API pour mettre à jour le document
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Document mis à jour:', { id: document?.id, ...formData });
      setIsSuccess(true);
      
      // Réinitialiser après un délai
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du document:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Layout>
      <UpdateDocumentContainer>
        <PageTitle>
          <FaEdit /> Mettre à jour un document
        </PageTitle>
        
        <Card>
          <SearchForm onSubmit={handleSearchDocument}>
            <SearchInput
              type="text"
              placeholder="Rechercher un document par ID ou titre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchButton type="submit">
              <FaSearch /> Rechercher
            </SearchButton>
          </SearchForm>
          
          {document ? (
            <>
              <DocumentInfo>
                <DocumentTitle>Document trouvé: {document.title}</DocumentTitle>
                <DocumentDate>Créé le {document.date}</DocumentDate>
                <DocumentHashInfo>
                  Hash blockchain: {document.hash}
                </DocumentHashInfo>
              </DocumentInfo>
              
              <form onSubmit={handleUpdate}>
                <FormGroup>
                  <Label htmlFor="title">Titre du document</Label>
                  <Input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="description">Description</Label>
                  <TextArea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <UpdateButton
                  type="submit"
                  disabled={isSubmitting || !formData.title}
                >
                  {isSubmitting ? 'Mise à jour en cours...' : 'Mettre à jour le document'}
                </UpdateButton>
                
                {isSuccess && (
                  <SuccessMessage>
                    <FaCheckCircle /> Document mis à jour avec succès!
                  </SuccessMessage>
                )}
              </form>
            </>
          ) : searchTerm && (
            <NoDocumentMessage>
              Aucun document trouvé pour "{searchTerm}".
            </NoDocumentMessage>
          )}
        </Card>
      </UpdateDocumentContainer>
    </Layout>
  );
};

export default UpdateDocument;
