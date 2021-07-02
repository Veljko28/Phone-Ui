import React from 'react';
import { Grid } from '@material-ui/core';
import ContactForm from '../components/Contact/ContactForm';
import ContactInfo from '../components/Contact/ContactInfo';
import ContactSubBar from '../components/Contact/ContactSubBar';

const contact = () => {
  return (
      <Grid container style={{marginTop: '30px'}}>

      <Grid item lg={2}/>

      <Grid item sm={12} md={6} lg={4}>
       <ContactForm/>
      </Grid>
      <Grid item sm={12} md={6} lg={4}>
       <ContactInfo/>
      </Grid>

      <Grid container item xs={12} >
        <Grid item xs={2}/>
        
        <Grid item xs={8}>
          <ContactSubBar/>
        </Grid>

        <Grid item xs={2}/>
      </Grid>

      <Grid item lg={2}/>

    </Grid>
    )
}

export default contact;
