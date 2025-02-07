
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import StarRatings from './StarRatings';
import Button from '@mui/material/Button';

const FoodCard = ({ image, name, description, onAddToCart }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' }, 
        alignItems: 'center',
        width: { xs: '90%', sm: '60%' },
        maxWidth: 400,
        margin: '10px auto',
        textAlign: 'center',
        boxShadow: 3,
      }}
    >
      
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
          width: { xs: '100%', sm: '40%' }, 
        }}
      >
        <CardMedia
          component="img"
          sx={{
            height: { xs: 100, sm: 150 },
            width: { xs: 120, sm: 150 },
            marginBottom: 1, 
          }}
          image={image}
          alt={name}
        />

       
        <Button
          variant="contained"
          color="primary"
          onClick={onAddToCart}
          sx={{
            marginTop: 1,
            fontSize: { xs: '0.8rem', sm: '1rem' },
            width: '80%', 
          }}
        >
          Add
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 0,
          textAlign: 'left',
          width: { xs: '100%', sm: '60%' },
        }}
      >
        <CardContent>
          <Typography
            component="div"
            variant="h6"
            sx={{
              fontSize: { xs: '1rem', sm: '1.25rem' },
              wordWrap: 'break-word',
              whiteSpace: 'normal',
              textAlign: 'left',
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '0.8rem', sm: '1rem' },
              wordWrap: 'break-word',
              whiteSpace: 'normal',
              textAlign: 'left',
              lineHeight: '1.5',
            }}
          >
            {description}
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 2,
          }}
        >
          <StarRatings />
        </Box>
      </Box>
    </Card>
  );
};

export default FoodCard;





