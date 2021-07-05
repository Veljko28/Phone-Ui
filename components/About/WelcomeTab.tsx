import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import ColoredLine from '../../constants/ColoredLine'

const WelcomeTab = () => {
  return (
    <Grid className="welcome-tab">
      <Typography variant="h6" style={{padding: '5px'}}>
        Welcome to MobiStore
      </Typography>
      <ColoredLine color="#eee"/>
      <Typography variant="subtitle1" style={{padding: '5px'}}>
        This is a website for selling and buying phones from other users or from the website owners themselves.
        Here you can find the highest quality phones for cheap prices or buy used phones for need parts.
        Our support team works 24/7 to deliver you the best customer service and you can get 100% money back guarantee.   
      </Typography>
      <Typography variant="subtitle2" style={{padding: '5px', color: '#999'}}>
        We are not associated with any of our users. Anything done by users that doesn't have anything to do with our website won't
        be take in consideration by our support team. Please don't send unnecessary messages or you might get banned from the platform.
        Other acts that dont follow our Terms and Conditions will result in a temporary ban.
      </Typography>
    </Grid>
  )
}

export default WelcomeTab
