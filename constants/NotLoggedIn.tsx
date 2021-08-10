import { Grid, Typography, Button} from '@material-ui/core';
import React from 'react';
import Link from 'next/link';
import TitleChange from './TitleChange';

const NotLoggedIn = () => {
  return (
    <Grid container style={{marginTop: '20px'}}>
            <TitleChange title="MobiStore - Not Logged In" />
            <Grid item md={3}/>
            <Grid item xs={12} md={6} className="page404">
                <Typography variant="h6" style={{margin: '10px'}}>You are not logged in !</Typography>
                <Typography variant="subtitle2" style={{color: '#999', margin: '15px'}}>You cannot access this page because your are not logged in.
                Please first login or register and then access this page. You may have been logged out because of your long inactivity usually 7 days.</Typography>
            <Link href="/login">
                <Button variant="contained" style={{backgroundColor: '#0cafe5', color: '#fff', width: '100%', marginTop: '10px'}}>
                    LOGIN
                </Button>
            </Link>
            </Grid>
            <Grid item md={3}/>
    </Grid>
  )
}

export default NotLoggedIn
