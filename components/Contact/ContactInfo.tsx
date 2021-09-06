import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import ColoredLine from '../../constants/ColoredLine';
import { blue, darker_green, gray } from '../../constants/CustomColors';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';
import { useTranslation } from 'react-i18next';

const ContactInfo = () => {
  
  const darkMode = useSelector((state: State) => state.userInfo.darkMode);
  const { t } = useTranslation();

  return (
    <Grid container className={darkMode ? "contact-tab-dark" : "contact-tab"}>
      <Typography variant="h6" style={{margin: '10px'}}>{t("contactInfo.title")}</Typography>

      <ColoredLine color={gray}/>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Typography variant="subtitle1" style={{margin: '10px'}}>{t("contactInfo.subtitle1")}</Typography>
        <Typography variant="subtitle2" style={{margin: '10px'}}>
        <span style={{color: darkMode ? darker_green : blue}}>16. октобра 40, Смедерево 11300</span>
        </Typography>
      </div>

      <ColoredLine color={gray}/>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Typography variant="subtitle1" style={{margin: '10px'}}>{t("contactInfo.subtitle2")}</Typography>
        <Typography variant="subtitle2" style={{margin: '10px'}}>{t("contactInfo.phone")}: 
        <span style={{color: darkMode ? darker_green : blue}}> +381 063 800-3210</span></Typography>
        <Typography variant="subtitle2" style={{margin: '10px'}}>Email: 
        <span style={{color: darkMode ? darker_green : blue}}> support@mobistore.com</span>
        </Typography>
      </div>

      <ColoredLine color={gray}/>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Typography variant="subtitle1" style={{margin: '10px'}}>{t("contactInfo.subtitle3")}</Typography>
        <Typography variant="subtitle2" style={{margin: '10px'}}>{t("contactInfo.phone")}: 
        <span style={{color: darkMode ? darker_green : blue}}> +381 065 123-4567</span>
        </Typography>
        <Typography variant="subtitle2" style={{margin: '10px'}}>Email: 
        <span style={{color: darkMode ? darker_green : blue}}> admin@mobistore.com</span>
        </Typography>
      </div>
      
    </Grid>
  )
}

export default ContactInfo;
