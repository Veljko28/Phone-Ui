import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { blue } from '../../constants/CustomColors';


const EmptyCart = () => {
  return (
    <Grid container 
    className="empty-cart"
    >
      <div>
        <Typography variant="h2" style={{color: blue}}>Your cart is currently empty !</Typography>
        <Image src="/empty-cart.svg" width="500px" height="500px"/>
      </div>
        <Link href="/phones/1">
        <div className="shopping-button">
          <ArrowBackIosIcon style={{fontSize: '15px',marginBottom: '5px'}}/>
          BACK TO SHOPPING
        </div>
      </Link>
    </Grid>
  )
}

export default EmptyCart
