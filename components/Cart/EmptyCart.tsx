import React from 'react';
import { Grid } from '@material-ui/core';

import { Typography } from '@material-ui/core';
import Link from 'next/link';
import Image from 'next/image';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


const EmptyCart = () => {
  return (
    <Grid container 
    className="empty-cart"
    >
      <div>
        <Typography variant="h2" style={{color: '#0cafe5'}}>Your cart is currently empty !</Typography>
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
