import React from 'react';
import { Grid } from '@material-ui/core';
import LoginInfo from '../components/Login/LoginInfo';
import RegisterForm from '../components/Register/RegisterForm';
import TitleChange from '../constants/TitleChange';
import { useSelector } from 'react-redux';
import { State } from '../redux/reduxTypes';
import { useRouter } from 'next/router';

const register = () => {

  const loggedIn = useSelector((state: State) => state.userInfo.logged_in);
  const router = useRouter();

  if (loggedIn) {
    router.push('/');
  }

  return (
      <Grid container>

      <TitleChange title="MobiStore - Register" />


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
