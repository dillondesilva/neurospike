import {
  AppBar,
  Stack,
  Grid,
  Container,
  Toolbar,
  IconButton,
} from '@mui/material';
import '../App.css';
import LIFControlPanel from '../components/LIFControlPanel';
import LIFSimulation from '../components/LIFSimulation';
import LIFPlotting from '../components/LIFPlotting';
import PyodideWorker from '../components/PyodideWorker';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import PythonEditor from 'codehelium';
import { Loading } from 'react-loading-dot'
import { lifDefaultCodeString } from '../defaultCodeStrings';
import { useEffect, useState } from 'react';

// Following code for theme from MUI example
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

export default function LIFPlayground() {
  const [ pyodideInstance, setPyodideInstance ] = useState();
  const [ consoleOutputs, setConsoleOutputs ] = useState([]);
  const [ isPyodideLoaded, setPyodideLoaded ] = useState(false);

  // if(!componentMounted){
  //   return (
  //     <div className="content-center">
  //       <h1>Just hold on</h1>
  //     </div>
  //   )
  // }


  useEffect(() => {
    console.log("Output change");
    console.log(consoleOutputs);
  }, [consoleOutputs, setConsoleOutputs]);

  const navigate = useNavigate();
  const returnHome = () => {
    navigate('/');
  };

  if(pyodideInstance == null) {
    return (
      <div className="h-[100vh] w-[100vw] content-center text-center">
        <PyodideWorker setterPyodideInstance={setPyodideInstance}/>
          <div className="flex flex-row">
            {/* <div>
              <h1 className="animate-bounce text-4xl font-bold">🧠 is loading LIF sandbox</h1>
            </div> */}
            <div>
              <Loading background="#000000" size="0.5em" margin="0.3em"/>
            </div>
          </div>
      </div>
    )
  }

  return (
    <div className="playgroundWrapper overscroll-none overflow-y-hidden">
        <AppBar
          position="static"
          className="bg-[#010A22]"
          sx={{
            height: '6vh',
            justifyContent: 'center',
            boxShadow: 0,
            backgroundColor: '#010A22'
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
            <p>Leaky Integrate and Fire (LIF) Playground</p>
          </Toolbar>
        </AppBar>
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
                padding: '0!important'
              }}
            >
              <LIFControlPanel 
                pyodideInstance={pyodideInstance}  
                consoleOutputSetter={setConsoleOutputs}
              />
            </Container>
            <PythonEditor 
              height="39vh" 
              width="45vw" 
              pyodideInstance={pyodideInstance} 
              consoleOutputSetter={setConsoleOutputs}
              initialValue={lifDefaultCodeString}
            />
            {/* <EditorComponent /> */}
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
              <LIFPlotting simulationDataStr={consoleOutputs} />
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
