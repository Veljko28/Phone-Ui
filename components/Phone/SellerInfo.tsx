import { Grid, Typography, Button } from '@material-ui/core';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import Rating from '@material-ui/lab/Rating';
import Link from 'next/link';
import React from 'react';

import ColoredLine from '../../constants/ColoredLine';
import User from '../models/User';
import UserContact from '../User/UserContact';


const SellerInfo = ({user} : {user?: User}) => {

  const [contactAnchorEl, setContanctAnchorEl] = React.useState(null);
  const contactOpen = Boolean(contactAnchorEl);

  const openContanct = (e: any) => {
    setContanctAnchorEl(e.currentTarget);
  }

  const closeContanct = () => {
    setContanctAnchorEl(null);
  }

    return (
        <Grid className="phone-details" container>
             <Typography variant="h6" style={{margin: '10px', marginLeft: '40px',
        color: '#0cafe5'}}>About The Seller</Typography>
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
                        Phones Sold: <span style={{color: '#0cafe5'}}>226</span>
                        <PhoneAndroidIcon style={{fontSize: '20px', color: '#0cafe5',marginBottom: '5px'}}/>
                    </Typography>
                    <Typography variant="subtitle1">
                        Currently Selling: <span style={{color: '#0cafe5'}}>27</span>
                        <PhoneAndroidIcon style={{fontSize: '20px', color: '#0cafe5',marginBottom: '5px'}}/>
                    </Typography>
                </Grid>
                <Grid xs={12} md={4} item className="review-grid-item">
                    <Button variant="contained" onClick={e => openContanct(e)}
                    style={{color: '#fff', backgroundColor: '#0cafe5', padding: '10px', width: '175px', margin: '5px'}}
                    >Contact The Seller</Button>
                    <Link href={`/user/${user?.id}`}>
                      <Button variant="contained" 
                      style={{color: '#fff', backgroundColor: '#0cafe5', padding: '10px', width: '175px', margin: '5px'}}
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