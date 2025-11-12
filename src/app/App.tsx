import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import { Header } from '@/widgets/header';
import { Router } from './router/router';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2'
    }
  }
});

/** Корневой компонент */
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
