import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import ColoredLine from '../../constants/ColoredLine';

const ContactInfo = () => {
  return (
    <Grid container>
      <Typography variant="h6" style={{margin: '10px'}}>Contact Info</Typography>

      <ColoredLine color="#eee"/>
      <Typography variant="subtitle1" style={{margin: '10px'}}>Corporate Headquater</Typography>
      <Typography variant="subtitle2" style={{margin: '10px'}}>16. октобра 40, Смедерево 11300</Typography>

      <ColoredLine color="#eee"/>
      <Typography variant="subtitle1" style={{margin: '10px'}}>Sales Info &#38; Inquiries</Typography>
      <Typography variant="subtitle2" style={{margin: '10px'}}>Phone: +381 063 800-3210</Typography>
      <Typography variant="subtitle2" style={{margin: '10px'}}>Email: support@mobistore.com</Typography>

      <ColoredLine color="#eee"/>
      <Typography variant="subtitle1" style={{margin: '10px'}}>Admin Contact</Typography>
      <Typography variant="subtitle2" style={{margin: '10px'}}>Phone: +381 065 123-456</Typography>
      <Typography variant="subtitle2" style={{margin: '10px'}}>Email: admin@mobistore.com</Typography>
      
    </Grid>
  )
}

export default ContactInfo;
