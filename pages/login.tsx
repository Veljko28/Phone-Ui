import { Grid } from '@material-ui/core';
import React from 'react';
import LoginForm  from '../components/Login/LoginForm';
import LoginInfo from '../components/Login/LoginInfo';
import TitleChange from '../constants/TitleChange';


const Login = () => {
  return (
    <Grid container>

      <TitleChange title="MobiStore - Login" />

      <Grid item lg={2}/>

      <Grid item xs={12} md={6} lg={4}>
       <LoginForm/>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <LoginInfo register={false}/>
      </Grid>

      <Grid item lg={2}/>

    </Grid>
  )
}

export default Login;