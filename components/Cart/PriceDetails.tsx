import React from 'react';
import { Grid, Typography, Button} from '@material-ui/core';
import { useSelector } from 'react-redux';

import Phone from '../models/Phone';
import CheckOutForm from './CheckOutForm';
import { State } from '../../redux/reduxTypes';
import ColoredLine from '../../constants/ColoredLine';
import { blue, darker_green, gray } from '../../constants/CustomColors';

const PriceDetails = ({snackBar,handleSnackBar, darkMode, couponModel, t} : {snackBar: {success: boolean, error: boolean}, handleSnackBar: (value: any) => void, darkMode: boolean, couponModel: any, t: any}) => {

  const list = useSelector((state: State) => state.cart.items);
  const [checkoutOpen, changeCheckoutOpen] = React.useState(false);

  const totalPrice = list.length == 0 ? '0' : list.map((x: Phone) => x.price as any).reduce((a: number,b: number) => a+b);
  const [price, changePrice] = React.useState((totalPrice + list.length * 4.99));
  console.log(couponModel);
  React.useEffect(() => {
    if (couponModel != null && totalPrice === (price-(list.length * 4.99)) ){
      switch(couponModel.amount) {
        case "10%": changePrice(((price * 10) / 100).toFixed(2)); break;
        case "20%": changePrice(((price * 20) / 100).toFixed(2)); break;
        case "50%": changePrice(((price * 50) / 100).toFixed(2)); break;
        case "75%": changePrice(((price * 75) / 100).toFixed(2)); break;
      }
    }
  }, [couponModel])

  return ( 
    <Grid container className={darkMode ? "price-details-dark" : "price-details"}>
      <Typography variant="h6" style={{margin: '10px', marginLeft: '20px',
        color: darkMode ? darker_green : blue}}>{t("cart.details")}</Typography>
        <ColoredLine color="#eee"/>
        <div className="price-info">
          <Typography variant="subtitle2" style={{color: darkMode ? gray : 'black'}}>
            {t("edit.price")} ({list.length} {list.length == 1 ? t("cart.item1") : t("cart.item2")}): <span style={{marginLeft: '15px'}}>{totalPrice + "$"}</span>
          </Typography>
          <Typography variant="subtitle2" style={{marginBottom: '10px', color: darkMode ? gray : 'black'}}>
            {t("cart.tax")}  <span style={{color: darkMode ? darker_green : blue, marginLeft: '15px'}}>{list.length * 4.99}$</span>
          </Typography>
          <ColoredLine color="#eee" height="2px" />
          <Typography variant="subtitle2" style={{marginTop: '10px', color: darkMode ? gray : 'black'}} >
            <strong>{t("cart.pay")} <span style={{color: darkMode ? darker_green : blue}}>{price}</span></strong>
          </Typography>
          <Button style={{color: '#fff', backgroundColor: darkMode ? darker_green : blue, padding: '10px', marginTop: '15px'}}
          onClick={() => changeCheckoutOpen(true)}>{t("cart.check")}</Button>
        </div>
        <CheckOutForm t={t} darkMode={darkMode} open={checkoutOpen} handleOpen={(value: boolean) => changeCheckoutOpen(value)}
          snackBar={snackBar} handleSnackBar={(value: {error: boolean, success: boolean}) => handleSnackBar(value)}
        />
    </Grid>
  )
}

export default PriceDetails
