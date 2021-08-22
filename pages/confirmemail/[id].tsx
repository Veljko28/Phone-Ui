import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Grid, Typography, Button } from '@material-ui/core';
import {blue, dark_gray, white} from '../../constants/CustomColors';
import NotFound from '../../components/NotFound';
import { fetchGet, fetchPost } from '../../constants/CustomFetching';

const ConfirmEmail = () => {

  const router = useRouter();

  const id = router.query['id'];
  const [valid, changeValid] = React.useState<boolean | null>(null);
  let confirmEmailId: string | null = "";
  let userId: string | null = "";


  if (typeof window !== 'undefined'){
    confirmEmailId = localStorage.getItem('confirmEmailId');
    userId = localStorage.getItem('userId');
    if (confirmEmailId == null || userId == null) {
      changeValid(false);
    }
  }

  React.useEffect(() => {
    const func = async () => {
      if (id != confirmEmailId) changeValid(false);
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
      }
      else changeValid(false);

    }

    if (id && confirmEmailId && userId) func();
  }, [id]) 

  return valid ? (
    <Grid container 
    style={{display: 'flex', flexDirection: 'column', 
    alignItems: 'center',justifyContent: 'center',
    backgroundColor: white, minHeight: 650}}>
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
