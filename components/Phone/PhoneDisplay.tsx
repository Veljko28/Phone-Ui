import React from 'react';
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import Rating from '@material-ui/lab/Rating';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { Button, Chip, Grid, Typography } from "@material-ui/core";

import EditIcon from '@material-ui/icons/Edit';
import GradeIcon from '@material-ui/icons/Grade';
import CategoryIcon from '@material-ui/icons/Category';


import HistoryIcon from '@material-ui/icons/History';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';


import Bid from "../models/Bid";
import Phone from "../models/Phone";
import BidHistory from "./BidHistory";
import BidHistoryModel from "../models/BidHistory";
import ImageMapper from "../../constants/ImageMapper";
import PopUpDialog from "../../constants/PopUpDialog";
import { fetchPost } from "../../constants/CustomFetching";
import { addToCart } from "../../redux/actions/cartActions";
import { changePhoneCategory } from "../../redux/actions/phonesActions";
import { timeLeft } from '../../constants/formatDate';
import PhoneDisplaySkeleton from '../Skeletons/PhoneDisplaySkeleton';

const Alert = (props: any) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const PhoneDisplay = ({phone,images,bid,id, history,userId} :
   {phone?: Phone | Bid ,images?: string[], bid?: boolean, id?: string, history?: BidHistoryModel[], userId: string}) => {

  const dispatch = useDispatch();
  const router = useRouter();

  const [bidAmount,changeBidAmount] = React.useState(1);
  const [loading,changeLoading] = React.useState(true);

  let currentUserId: string | null = null;

  if (typeof window !== 'undefined') {
    currentUserId = localStorage.getItem('userId');
  }

  React.useEffect(() => {
    if (images !== undefined) changeCurrentImage(images[0]);
    if (phone !== undefined) {
      changeBidAmount(phone.price as number + 1);
      changeLoading(false);
    }
  },[images, phone?.price]);

  const [currentImage,changeCurrentImage] = React.useState('');
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

  const bidConfimed = async () => {
    if (bidAmount !== null && bidAmount > (phone?.price as number)+1){
      const res = await fetchPost('http://localhost:10025/api/v1/bids/addhistory', {bid_Id: id,userName: localStorage.getItem('username'),amount: bidAmount });
      if (res.ok){
        changeSnackBarOpen(true);
        setTimeout(() => location.reload(), 1500)
      }

    }
    changeDialogOpen(false);
  }

  return loading ? <PhoneDisplaySkeleton/> : (
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
          {bid ? 
          userId === currentUserId ? (
            <>
            <Typography variant="h6" style={{color: '#0cafe5'}}>This is your bid. Wait until the bid ends and contact the buyer</Typography>
           <div 
           onClick={e => openHistory(e)} className="bid-history">
             <HistoryIcon style={{fontSize: '20px', marginRight: '5px'}}/>Bid History ({history?.length})
            </div>
            <BidHistory open={historyOpen} history={history} handleClose={() => closeHistory()} anchorEl={anchorEl}/>
            <Typography variant="subtitle1" style={{color: '#0cafe5'}}>Ends in: {timeLeft((phone as Bid)?.date_Ends)}</Typography>
          </>
          ) :

          (<>
           <span style={{fontSize: '12px'}}>
            Your Bid
          </span>
          <input type="number"
          value={bidAmount}
          onChange={e => changeBidAmount(e.target.value as any)}
          min={phone ? (phone?.price as number)+1 : 1}
          className="bid-price"/>
          <Button variant="contained" onClick={() => changeDialogOpen(true)}
          style={{backgroundColor: '#0cafe5', color: '#fff', padding: '15px', marginTop: '10px'}}>
            <MonetizationOnIcon style={{fontSize: '20px', marginRight: '5px'}}/>Bid {bidAmount}$</Button>
           <div 
           onClick={e => openHistory(e)} className="bid-history">
             <HistoryIcon style={{fontSize: '20px', marginRight: '5px'}}/>Bid History ({history?.length})
            </div>
            <BidHistory open={historyOpen} history={history} handleClose={() => closeHistory()} anchorEl={anchorEl}/>
            <Typography variant="subtitle1" style={{color: '#0cafe5'}}>Ends in: {timeLeft((phone as Bid)?.date_Ends)}</Typography>
          </>)
          
          
          : 


           userId === currentUserId ? (
              <>
                <Button variant="contained" onClick={() => router.push(`/phone/edit/${id}`)}
                style={{backgroundColor: '#0cafe5', color: '#fff', padding: '15px', marginTop: '10px'}}>
                <EditIcon style={{fontSize: '20px', marginRight: '5px'}}/> EDIT PHONE</Button>
              </>
          ) : (<> 
          <Button variant="contained" 
          onClick={() => dispatch(addToCart(phone as Phone))}
          style={{backgroundColor: '#0cafe5', color: '#fff', padding: '15px', marginTop: '10px'}}>
            <ShoppingCartIcon style={{fontSize: '20px', marginRight: '5px'}}/> ADD TO CART</Button>
          </>)}




        </Typography>
          <div style={{margin: 10, marginLeft: 0}}>
              <Chip style={{margin: 5, marginLeft: 0 ,backgroundColor: '#0cafe5', color: '#fff'}}
              icon={<CategoryIcon style={{color: '#fff', fontSize: 20}}/>}
              label={phone?.category}
              onClick={() => {
                const obj = {
                    category: phone?.category,
                    brand: "All",
                    price: "All",
                    sorting: "none"
                  };
                  dispatch(changePhoneCategory(obj));
                  router.push('/phones/1');
              }}
              />
              <Chip style={{marginLeft: 5,backgroundColor: '#0cafe5', color: '#fff'}}
              icon={<GradeIcon style={{color: '#fff', fontSize: 20}}/>}
              label={phone?.brand}
               onClick={() => {
                const obj = {
                    category: "All Phones",
                    brand: phone?.brand,
                    price: "All",
                    sorting: "none"
                  };

                  dispatch(changePhoneCategory(obj));
                  router.push('/phones/1');
              }}
              />
          </div>
          

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
 