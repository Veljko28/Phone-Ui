import React from 'react'
import { Grid, Typography, Button, TextField} from '@material-ui/core';
import ColoredLine from '../../constants/ColoredLine';
import { blue, darker_green } from '../../constants/CustomColors';

const CouponTab = ({darkMode, coupon, changeCoupon, checkCoupon, t} : {darkMode: boolean,coupon: string, changeCoupon: (value: string) => void,
checkCoupon: () => Promise<void>, t: any}) => {

  return (
    <Grid container className={darkMode ? "coupon-tab-dark" : "coupon-tab"}>
      <Typography variant="h6" style={{margin: '10px', marginLeft: '20px',
        color: darkMode ? darker_green : blue}}>{t("cart.coupon")}</Typography>
        <ColoredLine color="#eee"/>
         <TextField placeholder="Coupon" value={coupon}
      onChange={e => changeCoupon(e.target.value)}
      InputProps={{
        className: "coupon-imput", style: {padding: "10px"},
        disableUnderline: true
        }}/>
        <Button onClick={async () => await checkCoupon()} style={{color: '#fff', backgroundColor: darkMode ? darker_green : blue, padding: '10px', margin: '10px', width: '300px'}}>
          {t("cart.couponButton")}</Button>
    </Grid>
  )
}

export default CouponTab;
