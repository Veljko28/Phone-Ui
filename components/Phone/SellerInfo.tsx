import { Grid, Typography, Button } from '@material-ui/core';
import ColoredLine from '../../constants/ColoredLine';
import Rating from '@material-ui/lab/Rating';
import Image from 'next/image';
import Link from 'next/link';

import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';


const SellerInfo = ({id} : {id: string}) => {

    return (
        <Grid className="phone-details" container>
             <Typography variant="h6" style={{margin: '10px', marginLeft: '40px',
        color: '#0cafe5'}}>About The Seller</Typography>
            <ColoredLine color="#eee"/>
            <Grid xs={12} container item>
             <Link href={`/user/${id}`}>
                <Grid xs={12} md={4} item className="review-grid-item">
                  <div className="curs-hvr">
                    <Image src="/user.png" width="70px" height="70px" />
                    <div>User {id}</div>
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
                    <Button variant="contained" 
                    style={{color: '#fff', backgroundColor: '#0cafe5', padding: '10px', width: '175px', margin: '5px'}}
                    >Contact The Seller</Button>
                    <Link href={`/user/${id}/listings`}>
                      <Button variant="contained" 
                      style={{color: '#fff', backgroundColor: '#0cafe5', padding: '10px', width: '175px', margin: '5px'}}
                      >View Listings</Button>
                    </Link>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default SellerInfo;