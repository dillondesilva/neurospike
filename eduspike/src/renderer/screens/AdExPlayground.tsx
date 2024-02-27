import {
  AppBar,
  Stack,
  Grid,
  Container,
  Toolbar,
  IconButton,
  Typography,
} from '@mui/material';
import '../App.css';
import EditorComponent from 'renderer/EditorComponent';
import LIFControlPanel from 'renderer/LIFControlPanel';
import LIFSimulation from 'renderer/LIFSimulation';
import LIFPlotting from 'renderer/LIFPlotting';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

// Following code for theme from MUI example
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

export default function AdExPlayground() {
  const navigate = useNavigate();
  const returnHome = () => {
    navigate('/');
  };

  return (
    <div className="playgroundWrapper">
      <ThemeProvider theme={darkTheme}>
        <AppBar
          position="static"
          color="primary"
          sx={{
            height: '6vh',
            justifyContent: 'center',
            boxShadow: 0,
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={returnHome}
            >
              <HomeIcon />
            </IconButton>
            <p>Adaptive Exponential Integrate-and-Fire (AdEx) Playground</p>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <Grid
        container
        spacing={0}
        padding={2}
        alignSelf="center"
        justifyContent="space-evenly"
      >
        <Grid item>
          <Stack spacing={2}>
            <Container
              sx={{
                height: '42vh',
                width: '45vw',
                border: '1px solid #e0e0e0',
                borderRadius: '10px',
              }}
            >
              <LIFControlPanel />
            </Container>
            <EditorComponent />
          </Stack>
        </Grid>
        <Grid item>
          <Stack spacing={2}>
            <Container
              sx={{
                display: 'flex',
                height: '42vh',
                width: '45vw',
                border: '1px solid #e0e0e0',
                borderRadius: '10px',
                alignContent: 'center',
                justifyContent: 'center',
              }}
            >
              <LIFPlotting />
            </Container>
            <Container
              sx={{
                height: '45vh',
                width: '45vw',
                border: '1px solid #e0e0e0',
                borderRadius: '10px',
                padding: '0!important',
                overflowY: 'auto',
              }}
            >
              <LIFSimulation />
            </Container>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}
