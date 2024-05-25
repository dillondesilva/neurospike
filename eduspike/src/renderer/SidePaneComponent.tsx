import { Container } from '@mui/material';

export default function SidePaneComponent() {
  return (
    <div>
      <Container
        sx={{
          width: '2vw',
          height: '100vh',
          left: '0',
          backgroundColor: 'red',
        }}
      />
    </div>
  );
}
