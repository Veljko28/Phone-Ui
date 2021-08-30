import React from 'react';
import Link from 'next/link';

import { Grid, Typography, Button } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { blue, dark_gray, green, white, dark, darker_green, gray} from '../../constants/CustomColors';

const PurchaseSuccessful = ({darkMode} : {darkMode: boolean}) => {
  return (
    <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: darkMode ? dark : white, textAlign: 'center', minHeight: 620, paddingTop: 100 }}>
        <CheckCircleIcon style={{fontSize: 150, color: green}}/>
        <Typography variant="h4" style={{color: green}}>Your purchase was successful!</Typography>
        <Typography variant="subtitle1" style={{color: darkMode ? gray : dark_gray}}>Please wait for the seller to contact you about the shipping
        or meet up for selling the phone.<br/> If you have any problems contact our support at our email: 
        <span style={{color: darkMode ? darker_green : blue}}> support@mobistore.com</span></Typography>
        <Link href="/"><Button variant="contained" style={{backgroundColor: darkMode ? darker_green : blue, color: white, marginTop: 15,
        fontSize: 15, width: 150}}>Back To Home</Button></Link>
    </Grid>
  )
}

export default PurchaseSuccessful;
