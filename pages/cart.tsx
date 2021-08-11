import { Grid } from '@material-ui/core';
import React from 'react';

import ItemsInCart from '../components/Cart/ItemsInCart';
import PriceDetails from '../components/Cart/PriceDetails';
import CouponTab from '../components/Cart/CouponTab';
import EmptyCart from '../components/Cart/EmptyCart';
import TitleChange from '../constants/TitleChange';

import { useSelector } from 'react-redux';
import { State } from '../redux/reduxTypes';
import NotLoggedIn from '../constants/NotLoggedIn';


const cart = () => {
  const empty = useSelector((state: State) => state.cart.items.length) == 0;


  let jwt: string | null = null;

    if (typeof window !== 'undefined') {
      jwt = localStorage.getItem('jwt');
    }


  // return (
  //   <>
  //   <TitleChange title="MobiStore - Cart" />
  //    {empty ? <EmptyCart/> : (
       
  //      <Grid container>

  //      <Grid md={1} lg={2} item/>

  //      <Grid xs={12} md={10} lg={8} item container> 

  //        <Grid md={7} xs={12}item>
  //          <ItemsInCart />
  //        </Grid>

  //        <Grid md={5} xs={12} item>
  //          <PriceDetails />
  //          <CouponTab />
  //        </Grid>
  //      </Grid>

  //      <Grid md={1}  lg={2} item/>
  //    </Grid>
  //   )}
  //   </>
  // )


  return (<> {jwt === null ? <NotLoggedIn/> : (
    <>
     <TitleChange title="MobiStore - Cart" />
      {empty ? <EmptyCart/> : (
        
        <Grid container>

        <Grid md={1} lg={2} item/>

        <Grid xs={12} md={10} lg={8} item container> 

          <Grid md={7} xs={12}item>
            <ItemsInCart />
          </Grid>

          <Grid md={5} xs={12} item>
            <PriceDetails />
            <CouponTab />
          </Grid>
        </Grid>

        <Grid md={1}  lg={2} item/>
      </Grid>
  )}
  </>
   
    )}
    </>
    )
  
}

export default cart
