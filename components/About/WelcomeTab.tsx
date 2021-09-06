import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import ColoredLine from '../../constants/ColoredLine';
import { dark_gray } from '../../constants/CustomColors';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';
import { useTranslation } from 'react-i18next';

const WelcomeTab = () => {
  const darkMode = useSelector((state: State) => state.userInfo.darkMode);

  const { t } = useTranslation();

  return (
    <Grid className={darkMode ? "welcome-tab-dark" : "welcome-tab"}>
      <Typography variant="h6" style={{padding: '5px'}}>
        {t("welcomeTab.welcome")}
      </Typography>
      <ColoredLine color="#eee"/>
      <Typography variant="subtitle1" style={{padding: '5px'}}>
       {t("welcomeTab.about")}   
      </Typography>
      <Typography variant="subtitle2" style={{padding: '5px', color: dark_gray}}>
        {t("welcomeTab.mention")}
      </Typography>
    </Grid>
  )
}

export default WelcomeTab
