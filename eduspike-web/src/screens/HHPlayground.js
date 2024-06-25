import {
    AppBar,
    Stack,
    Grid,
    Container,
    Toolbar,
    IconButton,
    Divider,
    Drawer,
    List,
    ListItem,
    Button,
    ToggleButtonGroup,
    ToggleButton
  } from '@mui/material';
import HHControlPanel from '../components/HHControlPanel';
import HHPlotting from '../components/HHPlotting';
import PyodideWorker from '../components/PyodideWorker';
import { createTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import PythonEditor from 'codehelium';
import { useEffect, useState, useRef } from 'react';
import { hhDefaultCodeString } from '../defaultCodeStrings';
import { HHSimulation } from '../components/HHSimulation';
import LIFSimulation from '../components/LIFSimulation';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

  // Following code for theme from MUI example
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });
  
  export default function AdExPlayground(props) {
    const [ pyodideInstance, setPyodideInstance ] = useState();
    const [ consoleOutputs, setConsoleOutputs ] = useState([]);
    const [ editorValue, setEditorValue ] = useState(hhDefaultCodeString);
    const [ editorInitialText, setEditorInitialText ] = useState(hhDefaultCodeString);
    const [ menuOpen, setMenuOpen ] = useState(false);
    const [ visualMode, setVisualMode] = useState("AP");
    const [ plotMode, setPlotMode ] = useState("AP");
    
    const handleVisualToggle = () => {
      if (visualMode === "AP") {
        setVisualMode("Ion");
      } else {
        setVisualMode("AP");
      }
    }

    const handlePlotToggle = () => {
      if (plotMode === "AP") {
        setPlotMode("Ion");
      } else {
        setPlotMode("AP");
      }
    }
  
    useEffect(() => {
      console.log(consoleOutputs);
    }, [consoleOutputs, setConsoleOutputs]);
  
    useEffect(() => {
      console.log("rerendering")
    }, [editorInitialText])
  
    const navigate = useNavigate();
    const returnHome = () => {
      navigate('/');
    };
  
    if(pyodideInstance == null) {
      return (
        <div className="h-[100vh] w-[100vw] content-center text-center align-cent">
          <PyodideWorker setterPyodideInstance={setPyodideInstance}/>
            <div className="flex flex-row justify-center">
              <div className="pr-1"> 
                <img 
                  src="logo-transparent-bg.png" 
                  className="w-[5vw] animate-bounce"
                  alt="logo"
                ></img>
              </div>
            </div>
        </div>
      )
    }
  
    return (
      <div className="playgroundWrapper h-screen overscroll-none overflow-hidden">
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
              <div>
              <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setMenuOpen(!menuOpen)}
              sx={{ mr: 1.5 }}
              >
              <MenuIcon />
              </IconButton>
              <Drawer 
                open={menuOpen} 
                onClose={() => setMenuOpen(false)}
              >
                <List>
                  <ListItem>
                    <h1 class="text-xl font-bold w-[18vw]">Hodgkin-Huxley Sandbox</h1>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <button onClick={() => {setEditorValue(""); setMenuOpen(false)}}>
                      Exercise 1: Zero Step Current
                    </button>
                  </ListItem>
                  <ListItem>Exercise 2: Exploring Tau</ListItem>
                </List>
              </Drawer>
              </div>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={returnHome}
              >
                <HomeIcon />
              </IconButton>
              <p>Hodgkin-Huxley Sandbox</p>
            </Toolbar>
          </AppBar>
        <Grid
          container
          spacing={0}
          padding={2}
          alignSelf="center"
          justifyContent="space-evenly"
          className="overscroll-none"
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
                <HHControlPanel 
                  pyodideInstance={pyodideInstance}  
                  consoleOutputSetter={setConsoleOutputs}
                />
              </Container>
              <PythonEditor 
                height="39vh" 
                width="45vw" 
                pyodideInstance={pyodideInstance} 
                consoleOutputSetter={setConsoleOutputs}
                initialValue={editorInitialText}
                editorValue={editorValue}
                editorValueSetter={setEditorValue}
              />
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
                  position: 'relative',
                  paddingLeft: '0!important',
                  paddingRight: '0!important'
                }}
              >
                <HHPlotting simulationDataStr={consoleOutputs} plotMode={plotMode}/>
                <div className="absolute top-[88%] right-[5%]">
                  {/* From Flowbites */}
                  <label class="inline-flex items-center mb-5 cursor-pointer"> 
                    <input type="checkbox" value="" class="sr-only peer" onChange={() => handlePlotToggle()}/>
                    <div class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Ion currents</span>
                  </label>
                </div>
              </Container>
              <Container sx={{
                position: 'relative',
                paddingLeft: '0!important',
                paddingRight: '0!important'
              }}>
                {visualMode === "AP"
                  ? <LIFSimulation simulationDataStr={consoleOutputs}/>
                  : <HHSimulation simulationDataStr={consoleOutputs}/>
                }
                <div className="absolute top-[88%] right-[5%]">
                  {/* From Flowbites */}
                  <label class="inline-flex items-center mb-5 cursor-pointer"> 
                    <input type="checkbox" value="" class="sr-only peer" onChange={() => handleVisualToggle()}/>
                    <div class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Ion currents</span>
                  </label>
                </div>
                {/* </div> */}
              </Container>
            </Stack>
          </Grid>
        </Grid>
      </div>
    );
  }
  