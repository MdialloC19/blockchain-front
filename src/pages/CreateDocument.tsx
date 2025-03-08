import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { FaCloudUploadAlt, FaCheck } from 'react-icons/fa';
import Layout from '../components/Layout';

const CreateDocumentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.success};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormContainer = styled.form`
  background-color: ${props => props.theme.colors.white};
  padding: 2rem;
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.boxShadow};
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
    border-color: ${props => props.theme.colors.success};
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
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
    border-color: ${props => props.theme.colors.success};
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
  }
`;

const FileInputContainer = styled.div`
  margin-bottom: 1.5rem;
  border: 2px dashed #ced4da;
  padding: 2rem;
  text-align: center;
  border-radius: ${props => props.theme.borderRadius};
  transition: ${props => props.theme.transition};
  
  &:hover {
    border-color: ${props => props.theme.colors.success};
  }
`;

const UploadIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.success};
`;

const FileInputText = styled.p`
  margin-bottom: 1rem;
  color: #6c757d;
`;

const FileInfoContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: rgba(40, 167, 69, 0.1);
  border-radius: ${props => props.theme.borderRadius};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const FileName = styled.span`
  font-weight: 500;
  color: ${props => props.theme.colors.dark};
`;

const FileSize = styled.span`
  font-size: 0.875rem;
  color: #6c757d;
`;

const SubmitButton = styled.button`
  background-color: ${props => props.theme.colors.success};
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
    background-color: #218838;
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

const CreateDocument: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulation d'un appel API pour enregistrer le document dans la blockchain
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Document créé:', { ...formData, file });
      setIsSuccess(true);
      
      // Réinitialiser le formulaire après un délai
      setTimeout(() => {
        setFormData({ title: '', description: '' });
        setFile(null);
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Erreur lors de la création du document:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Layout>
      <CreateDocumentContainer>
        <PageTitle>
          <FaCloudUploadAlt /> Créer un document
        </PageTitle>
        
        <FormContainer onSubmit={handleSubmit}>
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
          
          <FileInputContainer>
            <UploadIcon>
              <FaCloudUploadAlt />
            </UploadIcon>
            <FileInputText>
              Glissez et déposez votre fichier ici ou cliquez pour sélectionner
            </FileInputText>
            <Input
              type="file"
              id="document"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <SubmitButton
              type="button"
              onClick={() => document.getElementById('document')?.click()}
              style={{ backgroundColor: '#ced4da', color: '#495057' }}
            >
              Sélectionner un fichier
            </SubmitButton>
            
            {file && (
              <FileInfoContainer>
                <FileInfo>
                  <FileName>{file.name}</FileName>
                  <FileSize>{formatFileSize(file.size)}</FileSize>
                </FileInfo>
              </FileInfoContainer>
            )}
          </FileInputContainer>
          
          <SubmitButton
            type="submit"
            disabled={isSubmitting || !file || !formData.title}
          >
            {isSubmitting ? 'Création en cours...' : 'Créer le document'}
          </SubmitButton>
          
          {isSuccess && (
            <SuccessMessage>
              <FaCheck /> Document créé avec succès et enregistré sur la blockchain!
            </SuccessMessage>
          )}
        </FormContainer>
      </CreateDocumentContainer>
    </Layout>
  );
};

export default CreateDocument;
