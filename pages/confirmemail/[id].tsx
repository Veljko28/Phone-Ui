import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Grid, Typography, Button } from '@material-ui/core';
import {blue, dark_gray, white} from '../../constants/CustomColors';
import NotFound from '../../components/NotFound';

const ConfirmEmail = () => {

  const router = useRouter();

  const id = router.query['id'];
  const valid = true;

  return valid ? (
    <Grid container 
    style={{display: 'flex', flexDirection: 'column', 
    alignItems: 'center',justifyContent: 'center',
    backgroundColor: white, minHeight: 450}}>
      <Image src="/logo.png" width="180px" height="50px"/>
      <Typography variant="h5" style={{color: blue, marginTop: 20}}>Successfully confirmed your email address !</Typography>
      <Typography variant="subtitle2" style={{color: dark_gray, marginTop: 10, marginBottom: 20, textAlign: 'center'}}>
        Thank you for confirming your email. <br/>Now you can start selling, buying and biding on phones</Typography>
      <Link href="/">
        <Button variant="contained" style={{backgroundColor: blue, color: white, padding: 10}}>Back to Home</Button>
      </Link>
    </Grid>
  ) : <NotFound/>
}

export default ConfirmEmail
