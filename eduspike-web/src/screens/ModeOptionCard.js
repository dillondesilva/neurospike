import { Button, Box, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export default function ModeOptionCard(props) {
  const navigate = useNavigate();
  const handlePlaygroundSelect = () => {
    navigate(props.playgroundRef);
  };

  return (
    <div>
      <div className='content-center w-full h-[30vh] rounded-[20px] bg-[#010A22]'>
        <div></div>
        <div className='col-span-2 p-9 content-center'>
          <h1 className='text-2xl text-[#D0DCFF] font-bold'>{props.title}</h1>
          <p className='pt-2 text-[#D0DCFF]'>{props.description}</p>
          <div className='animate-bounce flex float-right justify-center mt-4 h-8 w-[10vw] \
          bg-[#D0DCFF] rounded-lg hover:bg-[#010A22] hover:text-[#D0DCFF] \
          hover:bg-emerald-500'>
            <button onClick={handlePlaygroundSelect}>
              <div className="flex flex-row">
                <p className='font-bold '>EXPLORE</p>
                <ArrowRightAltIcon className='ml-1' />     
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
