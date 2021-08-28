import { Grid, Typography } from '@material-ui/core';
import React from 'react'

import CreditCardIcon from '@material-ui/icons/CreditCard';
import PeopleIcon from '@material-ui/icons/People';
import ReplayIcon from '@material-ui/icons/Replay';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';

const SubBar = () => {

  const darkMode = useSelector((state: State) => state.userInfo.darkMode);

  return (
    <Grid container className={darkMode ? "subBar-container-dark" : "subBar-container"}> 
      <Grid item xs={12} md={6} lg={3}>
          <div style={{float: 'left', marginTop: '10px'}}>
                <CreditCardIcon className="icon-border" />
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Typography variant="subtitle1" style={{margin: '10px'}}>Safe Payment</Typography>
                    <Typography variant="subtitle2" style={{margin: '10px'}}>
                    Use any valid credit card or paypal for your payment with no risks involved. 
                    </Typography>
                </div>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
         <div style={{float: 'left', marginTop: '10px'}}>
                <PeopleIcon className="icon-border"/>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Typography variant="subtitle1" style={{margin: '10px'}}>24/7 Support</Typography>
                    <Typography variant="subtitle2" style={{margin: '10px'}}>
                    Contact our support team at any time of the day and get fast and reliable feedback about your problem.
                    </Typography>
                </div>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
           <div style={{float: 'left', marginTop: '10px'}}>
                <ReplayIcon className="icon-border" />
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Typography variant="subtitle1" style={{margin: '10px'}}>Free &#38; Easy Return</Typography>
                    <Typography variant="subtitle2" style={{margin: '10px'}}>
                    If you are unsatisfied with your purchuse contact our support team and get your money back.
                    </Typography>
            </div>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
          <div style={{float: 'left', marginTop: '10px'}}>
                <AttachMoneyIcon className="icon-border" />
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Typography variant="subtitle1" style={{margin: '10px'}}>Affordable Items</Typography>
                    <Typography variant="subtitle2" style={{margin: '10px'}}>
                    Find items under their ordinary price. New items are added every week and the best ones
                    get sold quickly !
                    </Typography>
                </div>
      </Grid>
    </Grid>
  )
}

export default SubBar
