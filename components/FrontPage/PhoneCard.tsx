import React from 'react'
import {Card, CardActionArea, CardMedia ,CardContent, Typography, CardActions, IconButton} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { addToCart } from '../../redux/actions/cartActions';
import { useDispatch } from 'react-redux';
import Image from 'next/image';


export const PhoneCard = (props: {imagePath: string, name: string, price: string, discount?: string}) => {
  const dispatch = useDispatch();
  return (
    <Card className="shadow">
      <CardActionArea disableRipple disableTouchRipple style={{backgroundColor: 'transparent'}} >
        <CardContent style={{display: "flex", flexDirection: 'column'}}>
        <Image src={props.imagePath} layout="responsive" width="10px" height="8px"/>
          <Typography gutterBottom variant="subtitle1">
            {props.name}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" component="p" >
            <span style={props.discount ? 
            {color: 'red', textDecoration: 'line-through'} : {color: "#0cafe5"}}>{props.price}</span>
            <span style={{color: '#0cafe5', marginLeft: '5px'}}>{props.discount}</span>
          </Typography>
        </CardContent> 
        <CardActions style={{display: "flex", justifyContent: 'center'}}>
        <IconButton size="small" style={{backgroundColor: 'red', color: 'white', padding: '7px'}}>
          <FavoriteIcon/>
        </IconButton>
        <IconButton size="small" style={{backgroundColor: '#4d88ff', color: 'white', padding: '7px'}} onClick={() => dispatch(addToCart(props))}>
          <ShoppingCartIcon/>
        </IconButton>
      </CardActions>
      </CardActionArea>
     
    </Card>
  )
}
