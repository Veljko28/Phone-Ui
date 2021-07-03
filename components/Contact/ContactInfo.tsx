import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import ColoredLine from '../../constants/ColoredLine';

const ContactInfo = () => {
  return (
    <Grid container className="contact-tab">
      <Typography variant="h6" style={{margin: '10px'}}>Contact Info</Typography>

      <ColoredLine color="#eee"/>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Typography variant="subtitle1" style={{margin: '10px'}}>Corporate Headquater</Typography>
        <Typography variant="subtitle2" style={{margin: '10px'}}>
        <span style={{color: '#0cafe5'}}>16. октобра 40, Смедерево 11300</span>
        </Typography>
      </div>

      <ColoredLine color="#eee"/>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Typography variant="subtitle1" style={{margin: '10px'}}>Sales Info &#38; Inquiries</Typography>
        <Typography variant="subtitle2" style={{margin: '10px'}}>Phone: 
        <span style={{color: '#0cafe5'}}> +381 063 800-3210</span></Typography>
        <Typography variant="subtitle2" style={{margin: '10px'}}>Email: 
        <span style={{color: '#0cafe5'}}> support@mobistore.com</span>
        </Typography>
      </div>

      <ColoredLine color="#eee"/>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Typography variant="subtitle1" style={{margin: '10px'}}>Admin Contact</Typography>
        <Typography variant="subtitle2" style={{margin: '10px'}}>Phone: 
        <span style={{color: '#0cafe5'}}> +381 065 123-456</span>
        </Typography>
        <Typography variant="subtitle2" style={{margin: '10px'}}>Email: 
        <span style={{color: '#0cafe5'}}> admin@mobistore.com</span>
        </Typography>
      </div>
      
    </Grid>
  )
}

export default ContactInfo;
