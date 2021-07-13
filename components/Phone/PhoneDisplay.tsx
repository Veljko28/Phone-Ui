import { Button, Dialog, DialogActions, DialogContent,
DialogContentText, DialogTitle, Grid, Typography } from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import HistoryIcon from '@material-ui/icons/History';

import Image from "next/image";
import React from 'react';

import { useSelector, useDispatch } from "react-redux";
import { Phone } from "../models/Phone";
import { State } from "../../redux/reduxTypes";
import { changeQuantity } from "../../redux/actions/phonesActions";
import { addToCart } from "../../redux/actions/cartActions";

const Alert = (props: any) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ImageMapper = (images: string[],changeCurrentImage: React.Dispatch<React.SetStateAction<string>>) => {
    return images.map(x => (
      <div className="other-image">
          <Image src={x} width="55px" height="55px" onClick={() => changeCurrentImage(x)} />
      </div>
    ))
}

const PhoneDisplay = ({phone,bid} : {phone?: Phone, bid?: boolean}) => {
  // Temp variables for testing
  const discount = bid ? null : "1200$" ;

  const quantity = useSelector((state: State) => state.phones.quantity);
  const dispatch = useDispatch();

  // only for testing
  const [price,changePrice] = React.useState("250$");
  const name = "Google Pixel";

  const [currentImage,changeCurrentImage] = React.useState('/phone.jpg');
  const [bidAmount,changeBidAmount] = React.useState(parseInt(price.slice(0,-1))+1);
  const [dialogOpen,changeDialogOpen] = React.useState(false);
  const [snackBarOpen,changeSnackBarOpen] = React.useState(false);


  const bidConfimed = () => {
    if (bidAmount !== null && bidAmount > parseInt(price.slice(0,-1))+1){
      changePrice(bidAmount+'$');
      changeSnackBarOpen(true);
    }
    changeDialogOpen(false);
  }

  return (
    <Grid container className="display-container">
      <Grid item className="other-images">
         {/* Map the phone.images when fetching from a real api */}
          {ImageMapper(['/phone.jpg','/phone2.jpg','/phone3.jpg'], changeCurrentImage)}
      </Grid>

      <Grid item>
        <div className="display-image">
          <Image src={currentImage} width="325px" height="325px" />
        </div>
      </Grid>

      <Grid item style={{padding: '20px'}}>
        <Typography variant='subtitle1' style={{fontSize: '20px'}}>{name}</Typography>
        <div className="phone-rating">
          <Rating name="phone-rating" value={4.6} precision={0.1} readOnly style={{fontSize: '13px'}}/>
          <span style={{color: '#999', fontSize: '12px',margin: '5px' }}>(4.6 Review Stars)</span>
        </div>
        <Typography variant="subtitle1" >
          {discount ? (
          <>
          <span style={{color: '#0cafe5', fontSize: "35px"}}>{discount} </span>
          <span style={{color: 'red', textDecoration: 'line-through', fontSize: "20px"}}>{price}</span>
          </>) : 
          (<span style={{color: '#0cafe5', fontSize: "35px"}}>{bid ? "Highest Bid: " : ""}{price}</span>)
          }
          <span style={{color: '#999', fontSize: '15px', display: 'flex', width: '400px'}}>
            12.2 MP Rear | 8 MP Front Camera, 4GB RAM, 2700 mAh battery, Android 8.0, Qualcomm Snapdragon 835, Fingerprint Sensor
          </span>
          {bid ? (<>
           <span style={{fontSize: '12px'}}>
            Your Bid
          </span>
          <input type="number"
          value={bidAmount}
          onChange={e => changeBidAmount(e.target.value as any)}
          min={parseInt(price.slice(0,-1))+1}
          className="bid-price"/>
          <Button variant="contained" onClick={() => changeDialogOpen(true)}
          style={{backgroundColor: '#0cafe5', color: '#fff', padding: '15px', marginTop: '10px'}}>
            <MonetizationOnIcon style={{fontSize: '20px', marginRight: '5px'}}/>Bid {bidAmount}$</Button>
           <div className="bid-history"><HistoryIcon style={{fontSize: '20px', marginRight: '5px'}}/>Bid History (3)</div>
          </>) : (<> 
          <span style={{fontSize: '12px'}}>
            Quantity
          </span>
          <input type="number" value={quantity} onChange={e => dispatch(changeQuantity(e.target.value))} className="quantity-value"/>
          <Button variant="contained" 
          onClick={() => dispatch(addToCart({item: phone, amount: quantity}))}
          style={{backgroundColor: '#0cafe5', color: '#fff', padding: '15px', marginTop: '10px'}}>
            <ShoppingCartIcon style={{fontSize: '20px', marginRight: '5px'}}/> ADD TO CART</Button>
          </>)}
        </Typography>
        
      </Grid>



      <Dialog
        open={dialogOpen}
        onClose={() => changeDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Are you sure you want to bid ${bidAmount}$ ?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bid only the amount of money you are willing to give for the phone.
            Agreeing with this will put you in the position to win this bid. You won't be able to undo 
            this bid after agreeing !  
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => changeDialogOpen(false)} color="primary">
            Disagree
          </Button>
          <Button onClick={() => bidConfimed()} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>



      <Snackbar 
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={snackBarOpen} autoHideDuration={5000} onClose={() => changeSnackBarOpen(false)}>
        <Alert onClose={() => changeSnackBarOpen(false)} severity="success">
          Successfully placed a bid of {bidAmount}$ on {name}
        </Alert>
      </Snackbar>

    </Grid>
  )
}

export default PhoneDisplay;
 