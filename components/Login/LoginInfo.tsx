import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import Image from 'next/image';

const InfoField = (src: string, header: string, desc: string) => {
  return (
    <Grid container className="login-infoField">

      <Grid item xs={1}  style={{marginTop: '15px'}}>
        <Image src={src} alt={header} layout="fixed" width={src == '/login/login0.png' ? 35 : 40} height="25"/>
      </Grid>
      <Grid item xs={11}>
        <Typography variant="h6" style={{margin: '10px'}}>{header}</Typography>
        <Typography variant="subtitle1" style={{margin: '10px'}}>
          {desc}
        </Typography>
      </Grid>
    </Grid>
  )
}

const LoginInfo = (props: {register: boolean}) => {
  return (
    <Grid container className={props.register ? "register-info-tab" : "login-tab"}>
      {InfoField("/login/login3.png", "Loyality Points", "Save up your loyality points and get up to a 50% discount on a phone !")}
      {InfoField("/login/login2.png", "Instant Checkout", "If you don't want to wait buy the phone instantly for a set price !")}
      {InfoField("/login/login1.png", "Exclusive Offers", "Find a new or used phone for a very cheap price. Bid and be the last one to put the highest price !")}
      {props.register ? InfoField("/login/login0.png", "New User Bonus", "Register today and get 250 loyality points and save 25% on your first phone purchuse !") : ""}
    </Grid>
  )
}

export default LoginInfo;
