import { Grid } from '@material-ui/core';
import React from 'react';
import ItemsInCart from '../components/Cart/ItemsInCart';
import PriceDetails from '../components/Cart/PriceDetails';
import CouponTab from '../components/Cart/CouponTab';


const cart = () => {
  return (
    <Grid container>
      <Grid md={1} lg={2} item/>

      <Grid xs={12} md={10} lg={8} item container> 

        <Grid md={6} xs={12}item>
          <ItemsInCart />
        </Grid>

        <Grid md={6} xs={12} item>
          <PriceDetails />
          <CouponTab />
        </Grid>
      </Grid>

      <Grid md={1}  lg={2} item/>
    </Grid>
  )
}

export default cart
