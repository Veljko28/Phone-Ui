import React from 'react'
import { Grid, Typography, Button, TextField} from '@material-ui/core';
import ColoredLine from '../../constants/ColoredLine';

const CouponTab = () => {

  const [coupon,changeCoupon] = React.useState('');

  return (
    <Grid container className="coupon-tab">
      <Typography variant="h6" style={{margin: '10px', marginLeft: '20px',
        color: '#0cafe5'}}>Coupons and Discounts</Typography>
        <ColoredLine color="#eee"/>
         <TextField placeholder="Coupon" value={coupon}
      onChange={e => changeCoupon(e.target.value)}
      InputProps={{
        className: "coupon-imput", style: {padding: "10px"},
        disableUnderline: true
        }}/>
        <Button style={{color: '#fff', backgroundColor: '#0cafe5', padding: '10px', margin: '10px', width: '300px'}}>
          Apply Coupon</Button>
    </Grid>
  )
}

export default CouponTab;
