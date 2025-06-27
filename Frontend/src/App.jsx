import { ThemeProvider, createTheme } from '@mui/material';
import Chat from './components/Chat';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#646cff',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Chat />
      </div>
    </ThemeProvider>
  );
}

export default App;