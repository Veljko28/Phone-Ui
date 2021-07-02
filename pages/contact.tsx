import React from 'react';
import { Grid } from '@material-ui/core';
import ContactForm from '../components/Contact/ContactForm';
import ContactInfo from '../components/Contact/ContactInfo';

const contact = () => {
  return (
      <Grid container>

      <Grid item lg={2}/>

      <Grid item xs={12} md={6} lg={4}>
       <ContactForm/>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
       <ContactInfo/>
      </Grid>

      <Grid item lg={2}/>

    </Grid>
    )
}

export default contact;
