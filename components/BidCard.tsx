import React from 'react'
import Link from 'next/link';
import {Grid, Typography, IconButton} from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import { fetchPost } from '../constants/CustomFetching';
import { SnackBarFailed, SnackBarSuccess } from '../constants/CustomSnackBars';


export const BidCard = (props: {image: string, name: string, price: string, date_ends: Date, id: string}) => {

  const timeUntilEnd = () => {
    const now = new Date().getTime();

    const endTime = new Date(props.date_ends).getTime();

    if (now > endTime) return "Finished !";

    const distance = endTime - now;


    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (days >= 0) {
      return days + "d " + hours + "h " + minutes + "m ";
    }
    
    return  hours + "h " + minutes + "m " + seconds + "s ";
  };

  let time = timeUntilEnd();

   const [snackBar, changeSnackBar] = React.useState({
    success: false,
    error: false,
  })


  const addToWishList = async () => {
    const res = await fetchPost(`http://localhost:10025/api/v1/wishlist/add`, {userId: localStorage.getItem('userId'), phoneId: props.id, type: "bid"});

    if (res.ok) {
      changeSnackBar({success: true, error: false});
    }
    else changeSnackBar({success: false, error: true}); 
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
                <span style={{fontSize: "15px"}}>Current Price: <span style={{color: '#0cafe5'}}>{props.price + "$"}</span></span>
              </Typography>
              <div style={{fontSize: "15px"}}>Ends in: <span style={{color: '#0cafe5'}}>{time}</span></div>
            </div>
          </div>
        </Link>

        <div className="buttonConainer">
          <IconButton size="small" onClick={() => addToWishList()} style={{backgroundColor: 'red', color: 'white', padding: '5px', margin: '5px'}}>
            <FavoriteIcon/>
          </IconButton>

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
