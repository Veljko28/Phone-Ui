import { Grid, Typography } from '@material-ui/core';
import React from 'react'

import CreditCardIcon from '@material-ui/icons/CreditCard';
import PeopleIcon from '@material-ui/icons/People';
import ReplayIcon from '@material-ui/icons/Replay';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';
import { useTranslation } from 'react-i18next';

const SubBar = () => {

  const darkMode = useSelector((state: State) => state.userInfo.darkMode);
  const { t } = useTranslation();

  return (
    <Grid container className={darkMode ? "subBar-container-dark" : "subBar-container"}> 
      <Grid item xs={12} md={6} lg={3}>
          <div style={{float: 'left', marginTop: '10px'}}>
                <CreditCardIcon className="icon-border" />
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Typography variant="subtitle1" style={{margin: '10px'}}>{t("subBar.title1")}</Typography>
                    <Typography variant="subtitle2" style={{margin: '10px'}}>{t("subBar.desc1")}</Typography>
                </div>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
         <div style={{float: 'left', marginTop: '10px'}}>
                <PeopleIcon className="icon-border"/>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Typography variant="subtitle1" style={{margin: '10px'}}>{t("subBar.title2")}</Typography>
                    <Typography variant="subtitle2" style={{margin: '10px'}}>{t("subBar.desc2")}</Typography>
                </div>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
           <div style={{float: 'left', marginTop: '10px'}}>
                <ReplayIcon className="icon-border" />
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Typography variant="subtitle1" style={{margin: '10px'}}>{t("subBar.title3")}</Typography>
                    <Typography variant="subtitle2" style={{margin: '10px'}}>{t("subBar.desc3")}</Typography>
            </div>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
          <div style={{float: 'left', marginTop: '10px'}}>
                <AttachMoneyIcon className="icon-border" />
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Typography variant="subtitle1" style={{margin: '10px'}}>{t("subBar.title4")}</Typography>
                    <Typography variant="subtitle2" style={{margin: '10px'}}>{t("subBar.desc4")}</Typography>
                </div>
      </Grid>
    </Grid>
  )
}

export default SubBar
