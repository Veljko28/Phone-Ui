import React from 'react';
import { Grid, Typography, Button} from '@material-ui/core';
import { useSelector } from 'react-redux';

import Phone from '../models/Phone';
import CheckOutForm from './CheckOutForm';
import { State } from '../../redux/reduxTypes';
import ColoredLine from '../../constants/ColoredLine';
import { blue, darker_green, gray } from '../../constants/CustomColors';

const PriceDetails = ({snackBar,handleSnackBar, darkMode} : {snackBar: {success: boolean, error: boolean}, handleSnackBar: (value: any) => void, darkMode: boolean}) => {

  const list = useSelector((state: State) => state.cart.items);
  const [checkoutOpen, changeCheckoutOpen] = React.useState(false);

  const totalPrice = list.length == 0 ? '0' : list.map((x: Phone) => x.price as any).reduce((a: number,b: number) => a+b);

  return (
    <Grid container className={darkMode ? "price-details-dark" : "price-details"}>
      <Typography variant="h6" style={{margin: '10px', marginLeft: '20px',
        color: darkMode ? darker_green : blue}}>Price Details</Typography>
        <ColoredLine color="#eee"/>
        <div className="price-info">
          <Typography variant="subtitle2" style={{color: darkMode ? gray : 'black'}}>
            Price ({list.length} {list.length == 1 ? "item" : "items"}): <span style={{marginLeft: '15px'}}>{totalPrice + "$"}</span>
          </Typography>
          <Typography variant="subtitle2" style={{marginBottom: '10px', color: darkMode ? gray : 'black'}}>
              Tax Costs: <span style={{color: darkMode ? darker_green : blue, marginLeft: '15px'}}>{list.length * 4.99}$</span>
          </Typography>
          <ColoredLine color="#eee" height="2px" />
          <Typography variant="subtitle2" style={{marginTop: '10px', color: darkMode ? gray : 'black'}} >
            <strong>Amount to Pay: <span style={{color: darkMode ? darker_green : blue}}>{(totalPrice + list.length * 4.99) + "$"}</span></strong>
          </Typography>
          <Button style={{color: '#fff', backgroundColor: darkMode ? darker_green : blue, padding: '10px', marginTop: '15px'}}
          onClick={() => changeCheckoutOpen(true)}>Proceed To Checkout</Button>
        </div>
        <CheckOutForm darkMode={darkMode} open={checkoutOpen} handleOpen={(value: boolean) => changeCheckoutOpen(value)}
          snackBar={snackBar} handleSnackBar={(value: {error: boolean, success: boolean}) => handleSnackBar(value)}
        />
    </Grid>
  )
}

export default PriceDetails
