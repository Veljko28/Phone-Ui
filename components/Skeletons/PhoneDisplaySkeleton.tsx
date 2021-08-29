import { Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react'


const PhoneDisplaySkeleton = ({darkMode} : {darkMode: boolean}) => {
  return (
    <Grid container className={darkMode ? "display-container-dark" : "display-container"} style={{height: 525, marginTop: 20, marginBottom: 20}}>
      <Grid item className="other-images" xs={12} md={6} lg={2}>
        <Skeleton  width="55px" height="75px"/>
        <Skeleton  width="55px" height="75px"/>
        <Skeleton  width="55px" height="75px"/>
      </Grid>

      <Grid item xs={12} md={6} lg={2}>
          <Skeleton width="350px" height="550px" style={{position: 'absolute', top: 75, left: 450}}/>
      </Grid>

      <Grid item style={{padding: '20px'}} md={12} lg={8}>
    
          <div style={{marginLeft: 35}}>
              <Skeleton  width="150px" height="30px"/>
              <Skeleton  width="200px" height="20px"/>
              <Skeleton  width="200px" height="70px"/>
              <Skeleton  width="400px" variant="text"/>
              <Skeleton  width="400px" variant="text"/>
              <Skeleton  width="400px" variant="text"/>
              <Skeleton  width="150px" height="90px"/>
              <div style={{display: 'flex'}}>
                <Skeleton  style={{borderRadius: '35%', width: 60, height: 50, marginRight: 10}}/>
                <Skeleton  style={{borderRadius: '35%', width: 60, height: 50, marginRight: 10}}/>
              </div>
          </div>
      </Grid>
    </Grid>
  )
}

export default PhoneDisplaySkeleton;
