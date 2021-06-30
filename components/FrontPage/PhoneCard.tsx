import React from 'react'
import {Card, CardActionArea, CardMedia ,CardContent, Typography, CardActions, IconButton} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { addToCart } from '../../redux/actions/cartActions';
import { useDispatch } from 'react-redux';


export const PhoneCard = (props: any) => {
  const dispatch = useDispatch();
  return (
    <Card className="shadow">
      <CardActionArea disableRipple disableTouchRipple style={{backgroundColor: 'transparent'}}>
        <CardMedia
          image={props.ImagePath}
          title="Contemplative Reptile"
        />
        <CardContent style={{display: "flex", justifyContent: 'center'}}>
          <Typography gutterBottom variant="h6" component="h6">
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </CardContent> 
        <CardActions style={{display: "flex", justifyContent: 'center'}}>
        <IconButton size="small" style={{backgroundColor: 'red', color: 'white', padding: '7px'}}>
          <FavoriteIcon/>
        </IconButton>
        <IconButton size="small" style={{backgroundColor: '#4d88ff', color: 'white', padding: '7px'}} onClick={() => dispatch(addToCart({
          name: 'test',
          description: 'testing'
        }))}>
          <ShoppingCartIcon/>
        </IconButton>
      </CardActions>
      </CardActionArea>
     
    </Card>
  )
}
