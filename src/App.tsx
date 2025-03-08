import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import styled from "styled-components";
import GlobalStyle from "./assets/styles/GlobalStyle";

// Styles supplémentaires pour forcer le plein écran
const FullscreenStyle = createGlobalStyle`
  html, body, #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    justify-content: center;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    width: 100%;
    align-items: center;
  }

  /* Styles personnalisés pour la barre de défilement */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: #3050cc;
    border-radius: 4px;
    border: 2px solid #f1f1f1;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #2040aa;
  }
  
  /* Fix scrollbar position */
  body::-webkit-scrollbar {
    position: absolute;
    right: 0;
  }
  
  * {
    scrollbar-width: thin;
    scrollbar-color: #3050cc #f1f1f1;
  }
`;

// Pages
import Home from "./pages/Home";
import CreateDocument from "./pages/CreateDocument";
import ViewDocument from "./pages/ViewDocument";
import UpdateDocument from "./pages/UpdateDocument";
import DownloadDocument from "./pages/DownloadDocument";
import DeleteDocument from "./pages/DeleteDocument";

// Theme configuration
const theme = {
  colors: {
    primary: "#3050cc", // Bleu principal
    secondary: "#f8f9fa", // Gris très clair pour le fond
    success: "#28a745", // Vert pour les actions positives
    danger: "#dc3545", // Rouge pour les actions destructives
    warning: "#ffc107", // Jaune pour avertissements/modifications
    info: "#17a2b8", // Bleu clair pour informations
    light: "#f8f9fa", // Blanc cassé
    dark: "#343a40", // Gris foncé pour le texte
    white: "#ffffff", // Blanc pur
  },
  fonts: {
    main: "Roboto, system-ui, -apple-system, sans-serif",
  },
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease-in-out",
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  height: auto;
  position: relative;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
  background-color: ${props => props.theme.colors.secondary};
  overflow-x: hidden;
  justify-content: center;
  align-items: center;
  
  & > * {
    width: 100%;
    max-width: 100%;
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <FullscreenStyle />
      <AppContainer>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateDocument />} />
            <Route path="/view" element={<ViewDocument />} />
            <Route path="/update" element={<UpdateDocument />} />
            <Route path="/download" element={<DownloadDocument />} />
            <Route path="/delete" element={<DeleteDocument />} />
          </Routes>
        </Router>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
