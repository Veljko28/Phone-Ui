import { Grid, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react'

const test = () => {
    return (
    <Grid container className="display-container">
      <Grid item className="other-images">
        <div>
            <Skeleton width="55px" height="95px" />
        </div>
        <div>
            <Skeleton width="55px" height="95px" />
        </div>
        <div>
            <Skeleton width="55px" height="95px" />
        </div>
      </Grid>

        <div style={{margin: 20}}>
          <Skeleton width="300px" height="10px" />
        </div>

      <Grid item style={{padding: '20px'}}>
        <Typography variant='subtitle1' style={{fontSize: '20px'}}><Skeleton/></Typography>
        <div className="phone-rating">
            <Skeleton/>
        </div>
        <Typography variant="subtitle1" >
            <Skeleton/>

            <Skeleton/>
        </Typography>
          <div style={{margin: 10, marginLeft: 0}}>
              <Skeleton/>
              <Skeleton/>
          </div>

      </Grid>
    </Grid>
    )
}

export default test
