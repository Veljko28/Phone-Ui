import { Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'

const ReviewSkeleton = () => {
  return (
        <Grid container style={{padding: 23, display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex'}}>
              <Skeleton width="100px" height="20px" variant="rect" style={{margin: 5, marginRight: 20}}/>
              <Skeleton width="200px" height="20px" variant="rect" style={{margin: 5}}/>
            </div>

            <div>
              <Skeleton width="100%" height="18px" variant="rect" style={{margin: 5}}/>
              <Skeleton width="100%" height="18px" variant="rect" style={{margin: 5}}/>
              <Skeleton width="100%" height="18px" variant="rect" style={{margin: 5}}/>
            </div>
        </Grid>
  )
}

export default ReviewSkeleton
