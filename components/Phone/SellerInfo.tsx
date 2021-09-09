import React from 'react';
import Link from 'next/link';
import Rating from '@material-ui/lab/Rating';
import { Grid, Typography, Button } from '@material-ui/core';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';

import User from '../models/User';
import UserContact from '../User/UserContact';
import ColoredLine from '../../constants/ColoredLine';
import SellerInfoSkeleton from '../Skeletons/SellerInfoSkeleton';
import { blue, darker_green, white } from '../../constants/CustomColors';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';


const SellerInfo = ({user, sellingPhones, t} : {user?: User,sellingPhones: string, t: any}) => {

  const [contactAnchorEl, setContanctAnchorEl] = React.useState(null);
  const contactOpen = Boolean(contactAnchorEl);
  const [loading, changeLoading] = React.useState(true);

  const darkMode = useSelector((state: State) => state.userInfo.darkMode);

  const openContanct = (e: any) => {
    setContanctAnchorEl(e.currentTarget);
  }

  const closeContanct = () => {
    setContanctAnchorEl(null);
  }

  React.useEffect(() => {
    if (user) changeLoading(false);
  }, [user])

    return loading ? <SellerInfoSkeleton darkMode={darkMode}/> : (
        <Grid className={darkMode ? "phone-details-dark" : "phone-details"} container>
             <Typography variant="h6" style={{margin: '10px', marginLeft: '40px',
        color: darkMode ? darker_green : blue}}>{t("sellerInfo.about")}</Typography>
            <ColoredLine color="#eee"/>
            <Grid xs={12} container item>
             <Link href={`/user/${user?.id}`}>
                <Grid xs={12} md={4} item className="review-grid-item">
                  <div className="curs-hvr">
                    <img src={darkMode ? "/user_dark.png" :"/user.png"} width="70px" height="70px" />
                    <div style={{color: darkMode ? white : 'black' }}>{user?.userName}</div>
                  </div>
                </Grid>
              </Link>
                <Grid xs={12} md={4} item className="review-grid-item">
                    <Typography variant="subtitle1"  style={{color: darkMode ? white : 'black' }}>
                        {t("sellerInfo.rating")}: <Rating name="seller-rating" value={user?.rating ? parseFloat(user?.rating.toFixed(1)) : 0} precision={0.1} readOnly
                     style={{fontSize: '16px', margin: '10px', marginTop: '15px'}}/>
                    </Typography>
                    <Typography variant="subtitle1"  style={{color: darkMode ? white : 'black' }}>
                        {t("sellerInfo.phonesSold")}: <span style={{color: darkMode ? darker_green : blue}}>{user?.phones_sold}</span>
                        <PhoneAndroidIcon style={{fontSize: '20px', color: darkMode ? darker_green : blue,marginBottom: '5px'}}/>
                    </Typography>
                    <Typography variant="subtitle1"  style={{color: darkMode ? white : 'black' }}>
                        {t("sellerInfo.currentlySelling")}: <span style={{color: darkMode ? darker_green : blue}}>{sellingPhones ? sellingPhones :'0'}</span>
                        <PhoneAndroidIcon style={{fontSize: '20px', color: darkMode ? darker_green : blue,marginBottom: '5px'}}/>
                    </Typography>
                </Grid>
                <Grid xs={12} md={4} item className="review-grid-item">
                    <Button variant="contained" onClick={e => openContanct(e)}
                    style={{color: white, backgroundColor: darkMode ? darker_green : blue, padding: '10px', width: '175px', margin: '5px'}}
                    >{t("sellerInfo.contact")}</Button>
                    <Link href={`/user/${user?.id}`}>
                      <Button variant="contained" 
                      style={{color: white, backgroundColor: darkMode ? darker_green : blue, padding: '10px', width: '175px', margin: '5px'}}
                      >{t("sellerInfo.listings")}</Button>
                    </Link>
                    <UserContact darkMode={darkMode} open={contactOpen} handleClose={() => closeContanct()} anchorEl={contactAnchorEl} email={user?.email as string}
                    phoneNumber={user?.phoneNumber}/>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default SellerInfo;