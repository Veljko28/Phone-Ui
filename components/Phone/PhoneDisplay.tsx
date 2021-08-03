import { Button, Dialog, DialogActions, DialogContent,
DialogContentText, DialogTitle, Grid, IconButton, Typography } from "@material-ui/core";
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
import { addToCart } from "../../redux/actions/cartActions";
import ImageMapper from "../../constants/ImageMapper";
import BidHistory from "./BidHistory";
import PopUpDialog from "../../constants/PopUpDialog";
import { Bid } from "../models/Bid";

const Alert = (props: any) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const PhoneDisplay = ({phone,images,bid} : {phone?: Phone | Bid ,images?: string[], bid?: boolean}) => {

  const dispatch = useDispatch();

  // only for testing
  const [price,changePrice] = React.useState("250$");

  React.useEffect(() => {
    if (images !== undefined) changeCurrentImage(images[0]);
  },[images]);

  const [currentImage,changeCurrentImage] = React.useState('');
  const [bidAmount,changeBidAmount] = React.useState(parseInt(price.slice(0,-1))+1);
  const [dialogOpen,changeDialogOpen] = React.useState(false);
  const [snackBarOpen,changeSnackBarOpen] = React.useState(false);


  const [anchorEl, setAnchorEl] = React.useState(null);
  const historyOpen = Boolean(anchorEl);

  const openHistory = (e: any) => {
    setAnchorEl(e.currentTarget);
  }

  const closeHistory = () => {
    setAnchorEl(null);
  }

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
          {ImageMapper(images as any, changeCurrentImage)}
      </Grid>

      <Grid item>
        <div className="display-image">
          <img src={currentImage} width="325px" height="325px" />
        </div>
      </Grid>

      <Grid item style={{padding: '20px'}}>
        <Typography variant='subtitle1' style={{fontSize: '20px'}}>{phone?.name}</Typography>
        <div className="phone-rating">
          <Rating name="phone-rating" value={4.6} precision={0.1} readOnly style={{fontSize: '13px'}}/>
          <span style={{color: '#999', fontSize: '12px',margin: '5px' }}>(4.6 Review Stars)</span>
        </div>
        <Typography variant="subtitle1" >

          <span style={{color: '#0cafe5', fontSize: "35px"}}>{bid ? "Highest Bid: " : "Price: "}{phone?.price + '$'}</span>

          <span style={{color: '#999', fontSize: '15px', display: 'flex', width: '400px'}}>
            {phone?.description}
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
           <div 
           onClick={e => openHistory(e)} className="bid-history">
             <HistoryIcon style={{fontSize: '20px', marginRight: '5px'}}/>Bid History (3)
            </div>
            <BidHistory open={historyOpen} handleClose={() => closeHistory()} anchorEl={anchorEl}/>
          </>) : (<> 
          <Button variant="contained" 
          onClick={() => dispatch(addToCart(phone as Phone))}
          style={{backgroundColor: '#0cafe5', color: '#fff', padding: '15px', marginTop: '10px'}}>
            <ShoppingCartIcon style={{fontSize: '20px', marginRight: '5px'}}/> ADD TO CART</Button>
          </>)}
        </Typography>
        
      </Grid>

      <PopUpDialog open={dialogOpen} closeDialog={() => changeDialogOpen(false)} 
      title={`Are you sure you want to bid ${bidAmount}$ ?`}
      message={"Bid only the amount of money you are willing to give for the phone."
            +"Agreeing with this will put you in the position to win this bid. You won't be able to undo"+
            "this bid after agreeing !"}
            onConfirm={() => bidConfimed()}/>
          
      <Snackbar 
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={snackBarOpen} autoHideDuration={5000} onClose={() => changeSnackBarOpen(false)}>
        <Alert onClose={() => changeSnackBarOpen(false)} severity="success">
          Successfully placed a bid of {bidAmount}$ on {phone?.name}
        </Alert>
      </Snackbar>

    </Grid>
  )
}

export default PhoneDisplay;
 