import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { blue, darker_green, white, gray, dark } from '../../constants/CustomColors';


const EmptyCart = ({darkMode} : {darkMode : boolean}) => {
  return (
    <Grid container style={{minHeight: 750}}
    className={darkMode ? "empty-cart-dark" : "empty-cart"}
    >
      <div>
        <Typography variant="h2" style={{color: darkMode ? darker_green : blue}}>Your cart is currently empty !</Typography>
        <Image src={darkMode ? "/empty_cart_dark.svg" : "/empty_cart.svg"} width="500px" height="500px"/>
      </div>
        <Link href="/phones/1">
        <div style={{backgroundColor: darkMode ? dark : white, color: darkMode ? gray : 'black'}}>
          <ArrowBackIosIcon style={{fontSize: '15px',marginBottom: '5px'}}/>
          BACK TO SHOPPING
        </div>
      </Link>
    </Grid>
  )
}

export default EmptyCart
