import React from 'react';
import Image from 'next/image';
import { Grid, Typography } from '@material-ui/core';

import ColoredLine from '../../constants/ColoredLine';
import { State } from '../../redux/reduxTypes';
import { useSelector } from 'react-redux';

const NumbersTab = () => {

  const darkMode = useSelector((state: State) => state.userInfo.darkMode);
  return (
    <Grid container className={darkMode ? "welcome-tab-dark" : "welcome-tab"}>
      <Grid item xs={12}>
        <Typography variant="h6" style={{padding: '5px'}}>
          MobiStore is a large company with
        </Typography>
        <ColoredLine color="#eee"/>
      </Grid>
      <Grid container item xs={12} style={{display: 'flex', justifyContent: 'space-around'}} className="about-images-row">

          <div className="about-image">
            <div className={darkMode ? "about-image-circle-dark" : "about-image-circle"}>
              <Image src="/about/mobile_icon.png" width="26px" height="46px" />
            </div> 
            <Typography variant="subtitle1" style={{textAlign: 'center'}}>
              100,000+ <br/>Phones Sold
            </Typography>
          </div>
       
          <div className="about-image">
            <div className={darkMode ? "about-image-circle-dark" : "about-image-circle"}>
              <Image src="/about/user_icon.png" width="41px" height="42px" />
            </div>
            <Typography variant="subtitle1" style={{textAlign: 'center'}}>
            10,000+ <br/>Active Users
            </Typography>
          </div>

          <div className="about-image">
              <div className={darkMode ? "about-image-circle-dark" : "about-image-circle"}>
                <Image src="/about/location_icon.png" width="40px" height="40px" />
              </div>
              <Typography variant="subtitle1" style={{textAlign: 'center'}}>
                100+ <br/>Countries
            </Typography>
          </div>

       </Grid>
    </Grid>
  )
}

export default NumbersTab
