import { Grid } from '@material-ui/core'
import React from 'react'

const BlockThree = () => (
  <Grid item xs={3}>
    1  
  </Grid>
)

const CategoryButtons = () => {
  return (
    <Grid container>
      {BlockThree()}
      <Grid item xs={6}>
        2
      </Grid>
      {BlockThree()}
    </Grid>
  )
}

export default CategoryButtons
