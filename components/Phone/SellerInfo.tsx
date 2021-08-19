import React from 'react';
import Link from 'next/link';
import Rating from '@material-ui/lab/Rating';
import { Grid, Typography, Button } from '@material-ui/core';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';

import User from '../models/User';
import UserContact from '../User/UserContact';
import ColoredLine from '../../constants/ColoredLine';
import SellerInfoSkeleton from '../Skeletons/SellerInfoSkeleton';
import { blue, white } from '../../constants/CustomColors';


const SellerInfo = ({user} : {user?: User}) => {

  const [contactAnchorEl, setContanctAnchorEl] = React.useState(null);
  const contactOpen = Boolean(contactAnchorEl);
  const [loading, changeLoading] = React.useState(true);

  const openContanct = (e: any) => {
    setContanctAnchorEl(e.currentTarget);
  }

  const closeContanct = () => {
    setContanctAnchorEl(null);
  }

  React.useEffect(() => {
    if (user) changeLoading(false);
  }, [user])

    return loading ? <SellerInfoSkeleton/> : (
        <Grid className="phone-details" container>
             <Typography variant="h6" style={{margin: '10px', marginLeft: '40px',
        color: blue}}>About The Seller</Typography>
            <ColoredLine color="#eee"/>
            <Grid xs={12} container item>
             <Link href={`/user/${user?.id}`}>
                <Grid xs={12} md={4} item className="review-grid-item">
                  <div className="curs-hvr">
                    <img src={user?.image ? user.image : "/user.png"} width="70px" height="70px" />
                    <div>{user?.userName}</div>
                  </div>
                </Grid>
              </Link>
                <Grid xs={12} md={4} item className="review-grid-item">
                    <Typography variant="subtitle1">
                        Rating: <Rating name="seller-rating" value={4.5} precision={0.1} readOnly
                     style={{fontSize: '16px', margin: '10px', marginTop: '15px'}}/>
                    </Typography>
                    <Typography variant="subtitle1">
                        Phones Sold: <span style={{color: blue}}>226</span>
                        <PhoneAndroidIcon style={{fontSize: '20px', color: blue,marginBottom: '5px'}}/>
                    </Typography>
                    <Typography variant="subtitle1">
                        Currently Selling: <span style={{color: blue}}>27</span>
                        <PhoneAndroidIcon style={{fontSize: '20px', color: blue,marginBottom: '5px'}}/>
                    </Typography>
                </Grid>
                <Grid xs={12} md={4} item className="review-grid-item">
                    <Button variant="contained" onClick={e => openContanct(e)}
                    style={{color: white, backgroundColor: blue, padding: '10px', width: '175px', margin: '5px'}}
                    >Contact The Seller</Button>
                    <Link href={`/user/${user?.id}`}>
                      <Button variant="contained" 
                      style={{color: white, backgroundColor: blue, padding: '10px', width: '175px', margin: '5px'}}
                      >View Listings</Button>
                    </Link>
                    <UserContact open={contactOpen} handleClose={() => closeContanct()} anchorEl={contactAnchorEl} email={user?.email as string}
                    phoneNumber={user?.phoneNumber}/>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default SellerInfo;