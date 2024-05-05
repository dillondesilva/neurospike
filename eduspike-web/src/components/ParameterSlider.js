import { Stack, Tooltip, Slider } from '@mui/material';

export default function ParameterSlider(props) {
    return (
      <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Tooltip title={props.tooltipText} placement="right">
            <p className="text-white font-bold">{props.parameterName}: </p>
          </Tooltip>
          <Slider
            sx={{
              width: '20vw',
              color: 'white'
            }}
            min={props.rangeData[0]}
            max={props.rangeData[1]}
            step={props.rangeData[2]}
            value={props.defaultValue}
            onChange={(_, newValue) => props.setter(newValue)}
            valueLabelDisplay="auto"
            ref={props.ref}
          />
      </Stack>       
    )
}