import { Grid } from '@material-ui/core'
import React from 'react'
import ItemsInCart from '../components/Cart/ItemsInCart'

const cart = () => {
  return (
    <Grid container>
      <Grid md={1} lg={2} item/>

      <Grid xs={12} md={10} lg={8} item> 
        <ItemsInCart />
      </Grid>

      <Grid md={1}  lg={2} item/>
    </Grid>
  )
}

export default cart
