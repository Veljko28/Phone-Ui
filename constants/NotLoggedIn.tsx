import { Grid, Typography, Button} from '@material-ui/core';
import React from 'react';
import Link from 'next/link';
import TitleChange from './TitleChange';
import { blue, dark_gray, gray, white, darker_green } from './CustomColors';

const NotLoggedIn = ({darkMode, t} : {darkMode: boolean, t: any}) => {
  return (
    <Grid container style={{marginTop: '20px'}}>
            <TitleChange title="MobiStore - Not Logged In" />
            <Grid item md={3}/>
            <Grid item xs={12} md={6} className={darkMode ? "page404-dark" : "page404"}>
                <Typography variant="h5" style={{margin: '10px', color: darkMode ? white : 'black' }}>{t("notLogged.title")}</Typography>
                <Typography variant="subtitle2" style={{color: darkMode ? gray : dark_gray, margin: '15px'}}>{t("notLogged.desc")}</Typography>
            <Link href="/login">
                <Button variant="contained" style={{backgroundColor: darkMode ? darker_green :blue, color: '#fff', width: '100%', marginTop: '10px', padding: 10}}>
                    {t("mainHeader.login")}
                </Button>
            </Link>
            </Grid>
            <Grid item md={3}/>
    </Grid>
  )
}

export default NotLoggedIn
