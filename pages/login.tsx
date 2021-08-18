import { Grid } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import LoginForm  from '../components/Login/LoginForm';
import LoginInfo from '../components/Login/LoginInfo';
import TitleChange from '../constants/TitleChange';
import { State } from '../redux/reduxTypes';


const Login = () => {

  const loggedIn = useSelector((state: State) => state.userInfo.logged_in);
  const router = useRouter();

  if (loggedIn) {
    router.push('/');
  }

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