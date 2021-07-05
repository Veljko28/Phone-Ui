import { Grid } from '@material-ui/core'
import React from 'react'
import WelcomeTab from '../components/About/WelcomeTab'
import NumbersTab from '../components/About/NumbersTab'


const about = () => {
  return (
    <Grid container className="about-page">
      <WelcomeTab />
      <NumbersTab />
    </Grid>
  )
}

export default about
