import { Stack, Grid, Container } from '@mui/material';
import '../App.css';
import EditorComponent from 'renderer/EditorComponent';
import LIFControlPanel from 'renderer/LIFControlPanel';
import LIFSimulation from 'renderer/LIFSimulation';
import LIFPlotting from 'renderer/LIFPlotting';

export default function LIFPlayground() {
  return (
    <div className="playgroundWrapper">
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
                justifyContent: 'center'
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
