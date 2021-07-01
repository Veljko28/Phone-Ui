import { Grid } from '@material-ui/core';
import React from 'react';
import LoginForm  from '../components/Login/LoginForm';
import LoginInfo from '../components/Login/LoginInfo';


const Login = () => {
  return (
    <Grid container>

      <Grid item lg={2}/>

      <Grid item xs={12} md={6} lg={4}>
       <LoginForm/>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <LoginInfo/>
      </Grid>

      <Grid item lg={2}/>

    </Grid>
  )
}

export default Login;