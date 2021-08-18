import { Grid, Typography } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react'
import ColoredLine from '../../constants/ColoredLine';

const SellerInfoSkeleton = () => {
  return (
      <Grid className="phone-details" container>
        <Typography variant="h6" style={{margin: '10px', marginLeft: '40px',
        color: '#0cafe5'}}>About The Seller</Typography>
            <ColoredLine color="#eee"/>
            <Grid xs={12} container item>
                <Grid xs={12} md={4} item className="review-grid-item">
                  <div>
                    <Skeleton variant="circle" width="65px" height="65px"/>
                    <div>
                        <Skeleton variant="text" width="75" height="25px"/>
                    </div>
                  </div>
                </Grid>
                <Grid xs={12} md={4} item className="review-grid-item">
                        <Skeleton variant="text" width="140px" height="25px"/>
                        <Skeleton variant="text" width="120px" height="25px"/>
                        <Skeleton variant="text" width="180px" height="25px"/>
                </Grid>
                <Grid xs={12} md={4} item className="review-grid-item">
                  <Skeleton variant="rect" width="175px" height="45px" style={{marginBottom: 10}}/>
                  <Skeleton variant="rect" width="175px" height="45px"/>
                </Grid>
            </Grid>
        </Grid>
  )
}

export default SellerInfoSkeleton
