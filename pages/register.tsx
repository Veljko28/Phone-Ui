import React from 'react';
import { Grid } from '@material-ui/core';
import LoginInfo from '../components/Login/LoginInfo';
import RegisterForm from '../components/Register/RegisterForm';

const register = () => {
  return (
       <Grid container>

      <Grid item lg={2}/>

      <Grid item xs={12} md={6} lg={4}>
       <RegisterForm/>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <LoginInfo register={true}/>
      </Grid>

      <Grid item lg={2}/>

    </Grid>
  )
};

export default register;
