import { Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'

const UserListingSkeleton = () => {
  return (
      <Grid container style={{marginLeft: 50}}>
          <Grid xs={12} md={4} item className="review-grid-item">
              <Skeleton variant="rect" width="100px" height="100px" />
          </Grid>
          <Grid xs={12} md={8} item className="listing-grid-item">
              <Skeleton variant="text" width="150px" height="30px" />

              <Skeleton variant="text" width="450px" height="20px" />
              <Skeleton variant="text" width="450px" height="20px" />
              <Skeleton variant="text" width="450px" height="20px" />
          </Grid>
     </Grid>
  )
}

export default UserListingSkeleton
