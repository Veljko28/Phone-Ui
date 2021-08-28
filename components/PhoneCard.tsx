import React from 'react'
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import {Grid, Typography, IconButton} from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

import PhoneSkeletonCard from './Skeletons/PhoneSkeletonCard';

import { addToCart, removeFromCart } from '../redux/actions/cartActions';
import { fetchDelete, fetchPost } from '../constants/CustomFetching';
import { SnackBarFailed, SnackBarSuccess } from '../constants/CustomSnackBars';
import { blue, dark_green, primary, red, white } from '../constants/CustomColors';
import { useRouter } from 'next/router';
import { State } from '../redux/reduxTypes';


export const PhoneCard = (props: 
  {name: string, price: string | number, image: string, key: string, seller?: string, id: string, status?: string | number, discount?: string,
  inCart: boolean, inWishList: string[],getWishListItems: () => Promise<void> }) => {

  const router = useRouter();

  const dispatch = useDispatch();
  const [snackBar, changeSnackBar] = React.useState({
    success: false,
    error: false,
  })

  let userId: string | null = null;
  const darkMode = useSelector((state: State) => state.userInfo.darkMode);

  if (typeof window !== 'undefined'){
    userId = localStorage.getItem('userId');
  }

  const addToWishList = async () => {
    const res = await fetchPost(`http://localhost:10025/api/v1/wishlist/add`, {userId, phoneId: props.id, type: "phone"});

    if (res.ok) {
      changeSnackBar({success: true, error: false});
      await props.getWishListItems();
    }
    else changeSnackBar({success: false, error: true}); 
  }

  const removeFromWishList = async () => {
     const res = await fetchDelete(`http://localhost:10025/api/v1/wishlist/remove`, {userId, phoneId: props.id});
     if (res.ok){
       await props.getWishListItems();
     }
  }

  return ( props.id === undefined ? <PhoneSkeletonCard/> : (
    <Grid container 
    className={darkMode ? "darkCardContainer" : "cardContainer"} style={{width: '250px', border: '1px solid #eee', maxHeight: 287}}>
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
                (<span style={{color: darkMode ?  dark_green : blue , fontSize: "15px"}}>{props.price + "$"}</span>)
                }
              </Typography>
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




          {props?.seller === userId ? (
          <Link href={`/phone/${props.id}`}>
            <IconButton size="small" style={{backgroundColor: primary, color: white, padding: '5px', margin: '5px', fontSize: '15px'}} >
              <ArrowForwardIosIcon/>
            </IconButton>
          </Link>
          ) : props.inCart ? 
          (
            <IconButton size="small" style={{backgroundColor: darkMode ? dark_green : primary, color: white, padding: '5px', margin: '5px', fontSize: '15px'}} 
            onClick={userId !== null ? () => dispatch(removeFromCart(props.id)) : () => router.push('/login')}>
              <RemoveShoppingCartIcon/>
            </IconButton>
          )
          : (
            <IconButton size="small" style={{backgroundColor: darkMode ? dark_green : primary, color: white, padding: '5px', margin: '5px', fontSize: '15px'}} 
            onClick={userId !== null ? () => dispatch(addToCart(props)) : () => router.push('/login')}>
              <ShoppingCartIcon/>
            </IconButton>
          )}
        </div>

        <SnackBarSuccess snackBarOpen={snackBar.success} changeSnackBarOpen={() => changeSnackBar({...snackBar,success: false})} message="Successfully added to wish list !"/>

       <SnackBarFailed snackBarOpen={snackBar.error} changeSnackBarOpen={() => changeSnackBar({...snackBar,error: false})} message={"Failed to add to wish list. Try again later"}/>

    </Grid> )
  )
}
