import React from 'react'
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import {Grid, Typography, IconButton} from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import Phone from './models/Phone';
import PhoneSkeletonCard from './Skeletons/PhoneSkeletonCard';

import { addToCart } from '../redux/actions/cartActions';
import { fetchPost } from '../constants/CustomFetching';
import { SnackBarFailed, SnackBarSuccess } from '../constants/CustomSnackBars';
import { blue, red, white } from '../constants/CustomColors';
import { useRouter } from 'next/router';


export const PhoneCard = (props: Phone) => {

  const router = useRouter();

  const dispatch = useDispatch();
  const [snackBar, changeSnackBar] = React.useState({
    success: false,
    error: false,
  })

  const addToWishList = async () => {
    const res = await fetchPost(`http://localhost:10025/api/v1/wishlist/add`, {userId: localStorage.getItem('userId'), 
    phoneId: props.id, type: "phone"});

    if (res.ok) {
      changeSnackBar({success: true, error: false});
    }
    else changeSnackBar({success: false, error: true}); 
  }

  let currentUserId: string | null = null;

  if (typeof window !== 'undefined') {
    currentUserId = localStorage.getItem('userId');
  }


  return ( props.id === undefined ? <PhoneSkeletonCard/> : (
    <Grid container className="cardContainer" style={{width: '250px', border: '1px solid #eee', maxHeight: 287}}>
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
                <span style={{color: blue, fontSize: "15px"}}>{props.discount} </span>
                <span style={{color: red, textDecoration: 'line-through', fontSize: "10px"}}>{props.price}</span>
                </>) : 
                (<span style={{color: blue, fontSize: "15px"}}>{props.price + "$"}</span>)
                }
              </Typography>
            </div>
          </div>
        </Link>

        <div className="buttonConainer">
          <IconButton size="small" onClick={currentUserId !== null ? () => addToWishList() : () => router.push('/login')}  style={{backgroundColor: red, color: white, padding: '5px', margin: '5px'}}>
            <FavoriteIcon/>
          </IconButton>
          {props?.seller === currentUserId ? (
          <Link href={`/phone/${props.id}`}>
            <IconButton size="small" style={{backgroundColor: '#4d88ff', color: white, padding: '5px', margin: '5px', fontSize: '15px'}} >
              <ArrowForwardIosIcon/>
            </IconButton>
          </Link>
          ) : (
            <IconButton size="small" style={{backgroundColor: '#4d88ff', color: white, padding: '5px', margin: '5px', fontSize: '15px'}} 
            onClick={currentUserId !== null ? () => dispatch(addToCart(props)) : () => router.push('/login')}>
              <ShoppingCartIcon/>
            </IconButton>
          )}
        </div>

        <SnackBarSuccess snackBarOpen={snackBar.success} changeSnackBarOpen={() => changeSnackBar({...snackBar,success: false})} message="Successfully added to wish list !"/>

       <SnackBarFailed snackBarOpen={snackBar.error} changeSnackBarOpen={() => changeSnackBar({...snackBar,error: false})} message={"Failed to add to wish list. Try again later"}/>

    </Grid> )
  )
}
