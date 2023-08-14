import { Box, Container } from '@mui/material';
import SidePaneComponent from 'renderer/SidePaneComponent';
import '../App.css';

export default function LIFPlayground() {
  return (
    <div className="playgroundWrapper">
      <Container
        sx={{
          left: '0vw',
          position: 'absolute',
          height: '100vh',
          padding: '2vw',
        }}
      >
        <Box
          sx={{
            width: '4vw',
            height: '90vh',
            display: 'flex',
            justifyContent: 'center',
            borderRadius: '1vw',
            backgroundColor: '#212121',
          }}
       />
      </Container>
    </div>
  );
}
