import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import Rating from '@material-ui/lab/Rating';
import {Grid, Typography, Button} from '@material-ui/core';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';

import UserContact from './UserContact';
import EditProfileForm from './EditProfileForm';
import UserSearchSkeleton from '../Skeletons/UserSearchSkeleton';
import UserCardSkeleton from '../Skeletons/UserCardSkeleton';
import User from '../models/User';



const UserCard = (props: {email: string, id: string, phoneNumber: string, search?: boolean, name: string, rating: number, desc: string}) => {

  let currentUser: string | null = null;
  
    if (typeof window !== 'undefined') {
      currentUser = localStorage.getItem('userId');
    }

    const [contactAnchorEl, setContanctAnchorEl] = React.useState(null);
    const [editOpen, handleEditOpen] = React.useState(false);
    const contactOpen = Boolean(contactAnchorEl);

    const openContanct = (e: any) => {
      setContanctAnchorEl(e.currentTarget);
    }

    const closeContanct = () => {
      setContanctAnchorEl(null);
    }

    const block = () => {
      return (
        <>
        {props.search ? props.id === undefined ? <UserSearchSkeleton/> : (
          <a href={`/user/${props.id}`} className="user-links">
            <div>
            <Image src="/user.png" width="225px" height="225px"/>
          </div>
            <div className="card-textarea">
              <Typography variant="h6">
                {props.name}
              </Typography>
                <Typography variant="subtitle1">
                Rating: <Rating name="seller-rating" value={props.rating} precision={0.1} readOnly
                style={{fontSize: '16px', marginTop: '15px'}}/>
              </Typography>
               <Typography variant="subtitle1">
                 Phones Sold: <span style={{color: '#0cafe5'}}>226</span>
                 <PhoneAndroidIcon style={{fontSize: '20px', color: '#0cafe5',marginBottom: '5px'}}/>
              </Typography>
              <Button variant="contained" 
                    style={{color: '#fff', backgroundColor: '#0cafe5', padding: '10px', width: '175px', margin: '5px'}}
                    >Go To Profile</Button>
            </div>
          </a>
        ): props.id === undefined ? <UserCardSkeleton/> : (
          <>
            <div>
              <Image src="/user.png" width="225px" height="225px"/>
            </div>
            <div className="card-textarea">
              <Typography variant="h6">
                {props.name}
              </Typography>
              <Typography variant="subtitle1" style={{display: 'inline-block'}}>
                <span style={{color: '#999', fontSize: "15px"}}>{props.desc}</span>
              </Typography>
              <Typography variant="subtitle1">
                Rating: <Rating name="seller-rating" value={props.rating} precision={0.1} readOnly
                style={{fontSize: '16px', marginTop: '15px'}}/>
              </Typography>
              <Typography variant="subtitle1">
                 Phones Sold: <span style={{color: '#0cafe5'}}>226</span>
                 <PhoneAndroidIcon style={{fontSize: '20px', color: '#0cafe5',marginBottom: '5px'}}/>
              </Typography>
               <Typography variant="subtitle1">
                 Currently Selling: <span style={{color: '#0cafe5'}}>3</span>
                 <PhoneAndroidIcon style={{fontSize: '20px', color: '#0cafe5',marginBottom: '5px'}}/>
              </Typography>
              {props.id === currentUser ? (
                <>
                <Button variant="contained" onClick={() => handleEditOpen(true)}
                 style={{color: '#fff', backgroundColor: '#0cafe5', padding: '10px', width: '175px', margin: '5px'}}
                >Edit Profile</Button>

               <EditProfileForm open={editOpen} handleOpen={(value: boolean) => handleEditOpen(value)} id={props.id}/>
                </>
              ) : (<>
                <Button variant="contained" onClick={e => openContanct(e)}
                      style={{color: '#fff', backgroundColor: '#0cafe5', padding: '10px', width: '175px', margin: '5px'}}
                      >Contact The Seller</Button>
                <UserContact  email={props.email} phoneNumber={props.phoneNumber} open={contactOpen} handleClose={() => closeContanct()} anchorEl={contactAnchorEl}/>
                </>
              )}
            </div>
          </>
        )}
        </>
      )
    }

  return (
    <Grid container className="cardContainer" style={{width: '250px', border: '1px solid #eee'}}>
        <div>
          {props.search ? (
            <Link href={`/user/${props.id}`}>
              {block()}
            </Link>
          ) : block()}
           
          </div>
    </Grid>
  )
}


export default UserCard;