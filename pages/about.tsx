import { Grid } from '@material-ui/core'
import React from 'react'
import WelcomeTab from '../components/About/WelcomeTab'
import NumbersTab from '../components/About/NumbersTab'
import TitleChange from '../constants/TitleChange'


const about = () => {
  return (
    <Grid container className="about-page">
      <TitleChange title="MobiStore - About" />
      <WelcomeTab />
      <NumbersTab />
    </Grid>
  )
}

export default about
