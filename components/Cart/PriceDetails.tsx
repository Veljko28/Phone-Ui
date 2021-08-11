import { Grid, Typography, Button} from '@material-ui/core';
import ColoredLine from '../../constants/ColoredLine';
import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';
import Phone from '../models/Phone';
import CheckOutForm from './CheckOutForm';

const PriceDetails = () => {

  const list = useSelector((state: State) => state.cart.items);
  const [checkoutOpen, changeCheckoutOpen] = React.useState(false);

  const totalPrice = list.length == 0 ? '0' : list.map((x: Phone) => x.price as any).reduce((a: number,b: number) => a+b);

  return (
    <Grid container className="price-details">
      <Typography variant="h6" style={{margin: '10px', marginLeft: '20px',
        color: '#0cafe5'}}>Price Details</Typography>
        <ColoredLine color="#eee"/>
        <div className="price-info">
          <Typography variant="subtitle2">
            Price ({list.length} {list.length == 1 ? "item" : "items"}): <span style={{marginLeft: '15px'}}>{totalPrice + "$"}</span>
          </Typography>
          <Typography variant="subtitle2" style={{marginBottom: '10px'}}>
              Delivery Charges: <span style={{color: '#43cf22', marginLeft: '15px'}}>Free</span>
          </Typography>
          <ColoredLine color="#eee" height="2px" />
          <Typography variant="subtitle2" style={{marginTop: '10px'}}>
            <strong>Amount to Pay {totalPrice + "$"}</strong>
          </Typography>
          <Button style={{color: '#fff', backgroundColor: '#0cafe5', padding: '10px', marginTop: '15px'}}
          onClick={() => changeCheckoutOpen(true)}>Proceed To Checkout</Button>
        </div>
        <CheckOutForm open={checkoutOpen} handleOpen={(value: boolean) => changeCheckoutOpen(value)}/>
    </Grid>
  )
}

export default PriceDetails
