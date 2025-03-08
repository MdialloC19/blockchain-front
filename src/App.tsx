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
    overflow-x: hidden;
  }

  #root {
    display: flex;
    flex-direction: column;
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
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: ${props => props.theme.colors.secondary};
  
  & > * {
    width: 100%;
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
