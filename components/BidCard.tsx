import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import {Grid, Typography, IconButton} from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


import { fetchDelete, fetchPost } from '../constants/CustomFetching';
import { SnackBarFailed, SnackBarSuccess } from '../constants/CustomSnackBars';
import { timeLeft } from '../constants/formatDate';
import { blue, red, white } from '../constants/CustomColors';


export const BidCard = (props: {image: string, name: string, price: string, date_ends: Date, id: string, 
  inWishList: string[],getWishListItems: () => Promise<void> }) => {

  let time = timeLeft(props.date_ends);
  const router = useRouter();

  const [snackBar, changeSnackBar] = React.useState({
    success: false,
    error: false,
  })

  let userId: string | null = null;

  if (typeof window !== 'undefined'){
    userId = localStorage.getItem('userId');
  }

  const addToWishList = async () => {
    const res = await fetchPost(`http://localhost:10025/api/v1/wishlist/add`, {userId, phoneId: props.id, type: "bid"});

    if (res.ok) {
      await props.getWishListItems();
      changeSnackBar({success: true, error: false});
    }
    else changeSnackBar({success: false, error: true}); 
  }

  const removeFromWishList = async () => {
    const res = await fetchDelete(`http://localhost:10025/api/v1/wishlist/remove`, {userId, phoneId: props.id});

    if (res.ok) {
      await props.getWishListItems();
    }
  }

  return (
    <Grid container className="cardContainer" style={{width: '250px', border: '1px solid #eee',maxHeight: 350}}>
       <Link href={`/bid/${props.id}`}>
        <div>
            <div className="imageConatiner">
            <img src={props.image}  width="150px" height="150px"/>
            </div>

            <div className="card-textarea">
              <Typography variant="h6">
                {props.name}
              </Typography>
              <Typography variant="subtitle1" style={{display: 'inline-block'}}>
                <span style={{fontSize: "15px"}}>Current Price: <span style={{color: blue}}>{props.price + "$"}</span></span>
              </Typography>
              <div style={{fontSize: "15px"}}>Ends in: <span style={{color: blue}}>{time}</span></div>
            </div>
          </div>
        </Link>

        <div className="buttonConainer">
          {props.inWishList?.includes(props.id) ? (
          <IconButton size="small" onClick={userId !== null ? () => removeFromWishList() : () => router.push('/login')}  style={{backgroundColor: red, color: white, padding: '5px', margin: '5px'}}>
            <FavoriteIcon/>
          </IconButton>
          ) : (
          <IconButton size="small" onClick={userId !== null ? () => addToWishList() : () => router.push('/login')}  style={{backgroundColor: red, color: white, padding: '5px', margin: '5px'}}>
            <FavoriteBorderIcon/>
          </IconButton>
          )}
          <Link href={`/bid/${props.id}`}>
            <IconButton size="small" style={{backgroundColor: '#4d88ff', color: 'white', padding: '5px', margin: '5px', fontSize: '15px'}} >
              <ArrowForwardIosIcon/>
            </IconButton>
          </Link>
        </div>

       <SnackBarSuccess snackBarOpen={snackBar.success} changeSnackBarOpen={() => changeSnackBar({...snackBar,success: false})} message="Successfully added to wish list !"/>

       <SnackBarFailed snackBarOpen={snackBar.error} changeSnackBarOpen={() => changeSnackBar({...snackBar,error: false})} message={"Failed to add to wish list. Try again later"}/>

    </Grid>
  )
}
