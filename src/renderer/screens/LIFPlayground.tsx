import { AppBar, Stack, Grid, Container, Toolbar, IconButton, Typography } from '@mui/material';
import '../App.css';
import EditorComponent from 'renderer/EditorComponent';
import LIFControlPanel from 'renderer/LIFControlPanel';
import LIFSimulation from 'renderer/LIFSimulation';
import LIFPlotting from 'renderer/LIFPlotting';
// import MenuIcon from '@mui/icons-material/Menu';

import App from 'renderer/App';

export default function LIFPlayground() {
  return (
    <div className="playgroundWrapper">
      <AppBar position="static" color="primary" sx={{
        height: '6vh'
      }}>
        <Toolbar>
        {/* <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton> */}
        <p>Yo</p>
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
                height: '45vh',
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
                height: '45vh',
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
