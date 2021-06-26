import React from 'react'
import {Grid} from '@material-ui/core';

export const HelpBar = () => {
  return (
    <Grid container>
      <Grid item xs={3}>Language <img src={require('./en.png')}/></Grid>
      
    </Grid>
  )
}
