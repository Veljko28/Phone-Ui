import { Grid } from '@material-ui/core';
import Skeleton from "@material-ui/lab/Skeleton";
import React from 'react'

const SearchSkeleton = () => {
  return (
    <Grid container style={{ width: "80%" }}>
      <Grid xs={12} md={4} item className="review-grid-item">
          <Skeleton variant="rect" width="100px" height="100px" />
      </Grid>
      <Grid xs={12} md={8} item className="listing-grid-item">
        <Skeleton variant="text" width="150px" height="30px" />
    
        <Skeleton variant="text" width="100%" height="20px" />
        <Skeleton variant="text" width="100%" height="20px" />   
        <div style={{ display: "flex", justifyContent: "space-between" }} >
          <Skeleton variant="text" width="40px" height="30px" />
          <Skeleton variant="text" width="60px" height="30px" />
        </div>
      </Grid>
    </Grid>
  )
}

export default SearchSkeleton
