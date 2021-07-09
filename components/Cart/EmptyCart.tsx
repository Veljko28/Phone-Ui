import React from 'react';
import { Grid } from '@material-ui/core';

import Image from 'next/image';
import Link from 'next/link';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


const EmptyCart = () => {
  return (
    <Grid container 
    className="empty-cart"
    >
      <div>
        <Image src="/empty-cart.png" width="650px" height="400px"/>
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
