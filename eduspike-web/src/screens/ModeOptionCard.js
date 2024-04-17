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
      {/* <Box
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
      </Box> */}
      <div className='grid grid-cols-3 w-full h-[293px] rounded-[20px] bg-[#010A22]'>
        <div></div>
        <div className='col-span-2 p-6 content-center'>
          <h1 className='text-2xl text-[#D0DCFF] font-bold'>{props.title}</h1>
          <p className='pt-2 text-[#D0DCFF]'>{props.description}</p>
          <div className='flex content-center justify-center mt-4 h-8 w-4/12 \
          bg-[#D0DCFF] rounded-lg hover:bg-green'>
            <button>
              <p className='font-bold '>EXPLORE</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
