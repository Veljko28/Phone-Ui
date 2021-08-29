import React from 'react';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Rating from '@material-ui/lab/Rating';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { Button, Chip, Grid, Typography } from "@material-ui/core";

import GradeIcon from '@material-ui/icons/Grade';
import CategoryIcon from '@material-ui/icons/Category';
import FavoriteIcon from '@material-ui/icons/Favorite';

import HistoryIcon from '@material-ui/icons/History';

import Bid from "../models/Bid";
import Phone from "../models/Phone";
import BidHistory from "./BidHistory";
import BidHistoryModel from "../models/BidHistory";

import ImageMapper from "../../constants/ImageMapper";
import PopUpDialog from "../../constants/PopUpDialog";
import { fetchGet, fetchPost } from "../../constants/CustomFetching";
import { blue, darker_green, dark_gray, gray, green, white } from '../../constants/CustomColors';

import { State } from '../../redux/reduxTypes';
import { changePhoneCategory } from "../../redux/actions/phonesActions";

import PhoneDisplaySkeleton from '../Skeletons/PhoneDisplaySkeleton';
import BidInfo from './DisplayComps/BidInfo';
import PhoneButtonTypes from './DisplayComps/PhoneButtonTypes';
import YourBid from './DisplayComps/YourBid';

const Alert = (props: any) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const PhoneDisplay = ({phone,images,bid,id, history,userId} :
   {phone?: Phone | Bid ,images?: string[], bid?: boolean, id?: string, history?: BidHistoryModel[], userId: string}) => {

  const dispatch = useDispatch();
  const router = useRouter();

  const [bidAmount,changeBidAmount] = React.useState(1);
  const [loading,changeLoading] = React.useState(true);
  const [numOfFavorites, changeNumOfFavorites] = React.useState("0");
  const [userWon, changeUserWon] = React.useState("");

  let currentUserId: string | null = null;

  const darkMode = useSelector((state: State) => state.userInfo.darkMode);

  if (typeof window !== 'undefined') {
    currentUserId = localStorage.getItem('userId');
  }

  const getFavoritedTimes = async () => {
    const res = await fetchGet(`http://localhost:10025/api/v1/wishlist/favorites/${phone?.id}`);

    if (res.ok){
      const favorites = await res.text();
      changeNumOfFavorites(favorites);
    }
  }

  React.useEffect(() => {
    if (images !== undefined) changeCurrentImage(images[0]);
    if (phone !== undefined) {
      changeBidAmount(phone.price as number + 1);
      changeLoading(false);
      getFavoritedTimes();
    }
    if (phone?.status !== 0 && bid && history!.length > 0) {
      const historyClone = history;
      const maxAmout = Math.max.apply(Math, historyClone!.map(function(o) { return o.amount; }));
      const userHistory = historyClone?.filter(x => x.amount = maxAmout)[0];

      if (userHistory != null){
        changeUserWon(userHistory.userName);
      }
    }
  },[images, phone?.price, history]);

  const items = useSelector((state: State) => state.cart.items);
  const inCart = items.filter(y => y.id == id).length === 1;

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

  return loading ? <PhoneDisplaySkeleton darkMode={darkMode}/> : (
    <Grid container className={darkMode ? "display-container-dark" : "display-container"}>
      <Grid item className="other-images">
          {ImageMapper(images as any, changeCurrentImage, darkMode)}
      </Grid>

      <Grid item>
        <div className="display-image">
          <img src={currentImage} width="325px" height="325px" />
        </div>
      </Grid>

      <Grid item style={{padding: '20px'}}>
        <Typography variant='subtitle1' style={{fontSize: '20px', color: darkMode ? white : 'black'}}>{phone?.name}</Typography>
        <div className="phone-rating">
          <Rating name="phone-rating" value={4.6} precision={0.1} readOnly style={{fontSize: '13px'}}/>
          <span style={{color: '#999', fontSize: '12px',margin: '5px' }}>(4.6 Review Stars)</span>
        </div>
        <Typography variant="subtitle1" >

          <span style={{color: darkMode ? darker_green : blue, fontSize: "35px"}}>{bid ? "Highest Bid: " : "Price: "}{phone?.price + '$'}</span>

          <span style={{color: darkMode ? gray : dark_gray, fontSize: '15px', display: 'flex', width: '400px'}}>
            {phone?.description}
          </span>
          {phone?.status !== 0 ? (<>
            <Typography variant="h5" style={{color: darkMode ? darker_green : blue,marginTop: 10}}>{bid ? "This bid has ended !" : "This Phone has been sold !"}</Typography>
            {bid && userWon != "" ?  <Typography variant="h4" style={{color: darkMode ? blue : green,marginTop: 10}}>{userWon} has won this bid !</Typography> : 
            <Typography variant="h5" style={{color: darkMode ? darker_green : blue,marginTop: 10}}>No bids were placed on this bid !</Typography>}
            {bid ? (<> 
               <div 
              onClick={e => openHistory(e)} className={darkMode ? "bid-history-dark" : "bid-history"}>
              <HistoryIcon style={{fontSize: '20px', marginRight: '5px'}}/>Bid History ({history?.length})
              </div>
              <BidHistory darkMode={darkMode} open={historyOpen} history={history} handleClose={() => closeHistory()} anchorEl={anchorEl}/>
            </>) : null}
            </>
          ) : bid ? 

          userId === currentUserId ? <YourBid phone={phone}
           closeHistory={() => closeHistory()} historyOpen={historyOpen} anchorEl={anchorEl} history={history} 
           openHistory={(value: any) => openHistory(value)} /> :

          <BidInfo bidAmount={bidAmount} changeBidAmount={(value: any) => changeBidAmount(value)} phone={phone}
           closeHistory={() => closeHistory()} historyOpen={historyOpen} anchorEl={anchorEl} history={history} 
           openHistory={(value: any) => openHistory(value)} changeDialogOpen={(value: boolean) => changeDialogOpen(value)}/>
          
          : 
          
          <PhoneButtonTypes id={id as string} userId={userId} currentUserId={currentUserId} inCart={inCart} phone={phone} darkMode={darkMode} /> 

          }


        </Typography>
          <div style={{margin: 10, marginLeft: 0}}>
              <Chip style={{margin: 5, marginLeft: 0 ,backgroundColor: darkMode ? darker_green : blue, color: white}}
              icon={<CategoryIcon style={{color: white, fontSize: 20}}/>}
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
              <Chip style={{marginLeft: 5,backgroundColor: darkMode ? darker_green : blue, color: white}}
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
          <div>
            <FavoriteIcon style={{fontSize: 20, color: darkMode ? darker_green : blue, marginBottom: 5}}/>
            <Typography variant="h6" style={{color: darkMode ? darker_green : blue, display: 'inline-block'}}>Added to wish list:  
            {numOfFavorites === "1" ? " " + numOfFavorites + " time" : " " + numOfFavorites + " times"}</Typography>
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
 