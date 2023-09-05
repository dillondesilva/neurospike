import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Slider,
  Stack,
} from '@mui/material';

export default function LIFControlPanel() {
  return (
    <div>
      <h3>Control Panel</h3>
      <Stack
        direction="row"
        spacing={4}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <p>Input current:</p>
        <Slider
          sx={{
            width: '20vw',
          }}
        />
      </Stack>
      <Stack
        direction="row"
        spacing={4}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <p>Pulse duration:</p>
        <Slider
          sx={{
            width: '20vw',
          }}
        />
      </Stack>
      <Stack
        direction="row"
        spacing={4}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <p>Membrane threshold:</p>
        <Slider
          sx={{
            width: '20vw',
          }}
        />
      </Stack>
      <Stack
        direction="row"
        spacing={4}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <p>Simultation duration:</p>
        <Slider
          sx={{
            width: '20vw',
          }}
        />
      </Stack>
      <Stack
        direction="row"
        spacing={4}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <p>Pulse entrypoint:</p>
        <Slider
          sx={{
            width: '20vw',
          }}
        />
      </Stack>
      <Stack
        direction="row"
        spacing={10}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '7vh',
        }}
      >
        <Button
          variant="outlined"
          sx={{
            height: '5vh',
          }}
        >
          <p>Run Simulation</p>
        </Button>
        <ToggleButtonGroup
          sx={{
            height: '5vh',
          }}
          value="linear"
        >
          <ToggleButton size="small" value="linear">
            <p>Linear</p>
          </ToggleButton>
          <ToggleButton size="small">
            <p>Non-linear</p>
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </div>
  );
}
