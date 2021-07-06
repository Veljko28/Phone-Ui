import { Button, Grid, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Rating from '@material-ui/lab/Rating';
import Image from "next/image";
import React from 'react';

import { Phone } from "../models/Phone";
import { State } from "../../redux/reduxTypes";
import { changeQuantity } from "../../redux/actions/phonesActions";
import { addToCart } from "../../redux/actions/cartActions";

const ImageMapper = (images: string[],changeCurrentImage: React.Dispatch<React.SetStateAction<string>>) => {
    return images.map(x => (
      <div className="other-image">
          <Image src={x} width="55px" height="55px" onClick={() => changeCurrentImage(x)} />
      </div>
    ))
}

const PhoneDisplay = ({phone} : {phone?: Phone}) => {
  // Temp variables for testing
  const price = "1500$";
  const discount = "1200$";

  const quantity = useSelector((state: State) => state.phones.quantity);
  const dispatch = useDispatch();

  const [currentImage,changeCurrentImage] = React.useState('/phone.jpg');

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
        <Typography variant='subtitle1' style={{fontSize: '20px'}}>Google Pixel</Typography>
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
          (<span style={{color: '#0cafe5', fontSize: "35px"}}>{price}</span>)
          }
          <span style={{color: '#999', fontSize: '15px', display: 'flex'}}>
            12.2 MP Rear | 8 MP Front Camera, 4GB RAM, 2700 mAh battery, Android 8.0,<br/> Qualcomm Snapdragon 835, Fingerprint Sensor
          </span>
          <span style={{fontSize: '12px'}}>
            Quantity
          </span>
          <input type="number" value={quantity} onChange={e => dispatch(changeQuantity(e.target.value))} className="quantity-value"/>
          <Button variant="contained" 
          onClick={() => dispatch(addToCart({item: phone, amount: quantity}))}
          style={{backgroundColor: '#0cafe5', color: '#fff', padding: '15px', marginTop: '10px'}}>
            <ShoppingCartIcon style={{fontSize: '20px', marginRight: '5px'}}/> ADD TO CART</Button>
        </Typography>
        
      </Grid>
    </Grid>
  )
}

export default PhoneDisplay;
 