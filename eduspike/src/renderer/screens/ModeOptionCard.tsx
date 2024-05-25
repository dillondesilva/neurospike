import { Button, Box, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ModeOptionCard(props: {
  title: string;
  description: string;
  playgroundRef: string;
}) {
  const navigate = useNavigate();
  const handlePlaygroundSelect = () => {
    navigate(props.playgroundRef);
  };

  return (
    <div>
      <Box
        sx={{
          padding: '1.5vw',
        }}
      >
        <Card
          variant="outlined"
          sx={{
            width: '25vw',
            height: '20vw',
          }}
        >
          <CardContent>
            <h1>{props.title}</h1>
            <p>{props.description}</p>
            <Button
              color="success"
              variant="outlined"
              onClick={handlePlaygroundSelect}
            >
              Explore
            </Button>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}
