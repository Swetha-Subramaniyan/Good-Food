
import React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}`;
}

const StarRatings = () => {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  return (
    <>
      <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
        <Rating
          name="hover-feedback"
          value={value}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          
          emptyIcon={<StarIcon style={{ opacity: 0.8, color: 'grey', fontSize: '1rem' }} fontSize="inherit" />}
          icon={<StarIcon style={{ color: '#ffc107' }} fontSize="inherit" />}
          hoverIcon={<StarIcon style={{ color: '#ffc107' }} fontSize="inherit" />}
        />
      </Box>
    </>
  );
};

export default StarRatings;
