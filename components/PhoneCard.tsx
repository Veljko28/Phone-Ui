import React from 'react'
import {Grid, Typography, IconButton} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { addToCart } from '../redux/actions/cartActions';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { Phone } from './models/Phone';


export const PhoneCard = (props: Phone) => {
  const dispatch = useDispatch();
  return (
    <Grid container className="cardContainer" style={{width: '250px', border: '1px solid #eee'}}>
       <Link href={`/phone/${props.id}`}>
        <div>
            <div className="imageConatiner">
               <img src={props.image}  width="150px" height="150px"/>
            </div>

            <div className="card-textarea">
              <Typography variant="h6">
                {props.name}
              </Typography>
              <Typography variant="subtitle1" style={{display: 'inline-block'}}>
                {props.discount ? (
                <>
                <span style={{color: '#0cafe5', fontSize: "15px"}}>{props.discount} </span>
                <span style={{color: 'red', textDecoration: 'line-through', fontSize: "10px"}}>{props.price}</span>
                </>) : 
                (<span style={{color: '#0cafe5', fontSize: "15px"}}>{props.price}</span>)
                }
              </Typography>
            </div>
          </div>
        </Link>

        <div className="buttonConainer">
          <IconButton size="small" style={{backgroundColor: 'red', color: 'white', padding: '5px', margin: '5px'}}>
            <FavoriteIcon/>
          </IconButton>

          <IconButton size="small" style={{backgroundColor: '#4d88ff', color: 'white', padding: '5px', margin: '5px', fontSize: '15px'}} 
          onClick={() => dispatch(addToCart(props))}>
            <ShoppingCartIcon/>
          </IconButton>
        </div>
    </Grid>
  )
}
