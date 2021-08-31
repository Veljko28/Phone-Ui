import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { v4 } from 'uuid';
import EmailIcon from '@material-ui/icons/Email';
import { Grid, Typography, Button } from '@material-ui/core';

import {blue, dark, darker_green, dark_gray, gray, white} from '../../constants/CustomColors';
import { fetchGet, fetchPost } from '../../constants/CustomFetching';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';


const ConfirmEmail = () => {

  const router = useRouter();

  const id = router.query['id'];
  const [valid, changeValid] = React.useState<boolean | null>(null);
  const [alreadyConfirmed, changeAlreadyConfirmed] = React.useState<boolean>(false);
  const darkMode = useSelector((state: State) => state.userInfo.darkMode);
  let confirmEmailId: string | null = "";
  let userId: string | null = "";


  if (typeof window !== 'undefined'){
    confirmEmailId = localStorage.getItem('confirmEmailId');
    console.log(confirmEmailId);
    userId = localStorage.getItem('userId');
  }

  React.useEffect(() => {
    const func = async () => {
      if (id != confirmEmailId) {
        changeValid(false);
        return;
      }
      const res = await fetchGet(`http://localhost:10025/api/v1/generic/confirmemail/${userId}`);

      if (res.ok){
        changeValid(true);
        // removing notification for confirming email
        await fetchPost('http://localhost:10025/api/v1/notifications/remove', {
          userId,
          type: "email",
          name: "",
          message: ""
        })
        return;
      }
      else if (res.status === 400){
        changeAlreadyConfirmed(true);
        return;
       }
      else {
        changeValid(false);
        return;
      }
    }

    if (id && userId) func();
  }, [id]) 

    const sendNewEmail = async () => {

       const res = await fetchGet(`http://localhost:10025/api/v1/users/${userId}`);

       if (res.ok){
          const user = await res.json();
          confirmEmailId = v4();
          const resend = await fetchPost('http://localhost:10025/api/v1/email/confirm', {email: user.email, confirmEmailId});

          if (resend.ok){
            localStorage.setItem('confirmEmailId', confirmEmailId);
          }
       }

    }

  return valid ? (
    <Grid container 
    style={{display: 'flex', flexDirection: 'column', 
    alignItems: 'center',justifyContent: 'center',
    backgroundColor: darkMode ? dark : white, minHeight: 750}}>
      <Image src="/email-verified.png" width="250px" height="250px"/>
      <Typography variant="h4" style={{color: darkMode ? darker_green : blue, marginTop: 20}}>Successfully confirmed your email address !</Typography>
      <Typography variant="subtitle1" style={{color: darkMode ? gray : dark_gray, marginTop: 10, marginBottom: 20, textAlign: 'center'}}>
        Thank you for confirming your email. <br/>Now you can start selling, buying and biding on phones</Typography>
      <Link href="/">
        <Button variant="contained" style={{backgroundColor: darkMode ? darker_green : blue, color: white, padding: 20, width: 175, fontSize: 15}}>Back to Home</Button>
      </Link>
    </Grid>
  ) : alreadyConfirmed ? (
     <Grid container style={{display: 'flex', flexDirection: 'column', 
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: darkMode ? dark : white, minHeight: 750}}>
      <EmailIcon style={{fontSize: 200, color: darkMode ? darker_green : blue}}/>
      <Typography variant="h4" style={{color: darkMode ? darker_green :  blue}}>You have already confirmed your email</Typography>
      <Typography variant="h6" style={{color: darkMode ? gray : dark_gray, marginTop: 10, marginBottom: 20, textAlign: 'center'}}>
        This account's email has already been confirmed.<br/> 
        Continue to home page</Typography>
       <Button variant="contained" style={{backgroundColor: darkMode ? darker_green : blue, color: white, padding: 20, width: 175, fontSize: 15}}
      >Back to Home</Button>
    </Grid>
  ) : (
    <Grid container style={{display: 'flex', flexDirection: 'column', 
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: darkMode ? dark : white, minHeight: 750}}>
      <EmailIcon style={{fontSize: 200, color: darkMode ? darker_green : blue}}/>
      <Typography variant="h3" style={{color: darkMode ? darker_green : blue}}>This Link has Expired</Typography>
      <Typography variant="h5" style={{color: darkMode ? gray : dark_gray, marginTop: 10, marginBottom: 20, textAlign: 'center'}}>
        This link has either expired or is invalid. <br/> 
        Click the button below and recieve a new link to confirm your email</Typography>
      <Button variant="contained" style={{backgroundColor: darkMode ? darker_green : blue, color: white, padding: 20, width: 175, fontSize: 15}}
      onClick={() => sendNewEmail()}>Resend Email</Button>
    </Grid>
  )
}

export default ConfirmEmail
