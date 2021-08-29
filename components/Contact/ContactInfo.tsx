import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import ColoredLine from '../../constants/ColoredLine';
import { blue, darker_green, gray } from '../../constants/CustomColors';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';

const ContactInfo = () => {
  
  const darkMode = useSelector((state: State) => state.userInfo.darkMode);

  return (
    <Grid container className={darkMode ? "contact-tab-dark" : "contact-tab"}>
      <Typography variant="h6" style={{margin: '10px'}}>Contact Info</Typography>

      <ColoredLine color={gray}/>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Typography variant="subtitle1" style={{margin: '10px'}}>Corporate Headquater</Typography>
        <Typography variant="subtitle2" style={{margin: '10px'}}>
        <span style={{color: darkMode ? darker_green : blue}}>16. октобра 40, Смедерево 11300</span>
        </Typography>
      </div>

      <ColoredLine color={gray}/>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Typography variant="subtitle1" style={{margin: '10px'}}>Sales Info &#38; Inquiries</Typography>
        <Typography variant="subtitle2" style={{margin: '10px'}}>Phone: 
        <span style={{color: darkMode ? darker_green : blue}}> +381 063 800-3210</span></Typography>
        <Typography variant="subtitle2" style={{margin: '10px'}}>Email: 
        <span style={{color: darkMode ? darker_green : blue}}> support@mobistore.com</span>
        </Typography>
      </div>

      <ColoredLine color={gray}/>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Typography variant="subtitle1" style={{margin: '10px'}}>Admin Contact</Typography>
        <Typography variant="subtitle2" style={{margin: '10px'}}>Phone: 
        <span style={{color: darkMode ? darker_green : blue}}> +381 065 123-456</span>
        </Typography>
        <Typography variant="subtitle2" style={{margin: '10px'}}>Email: 
        <span style={{color: darkMode ? darker_green : blue}}> admin@mobistore.com</span>
        </Typography>
      </div>
      
    </Grid>
  )
}

export default ContactInfo;
