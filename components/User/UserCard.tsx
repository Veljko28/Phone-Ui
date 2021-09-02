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
import { blue, darker_green, dark_gray, white } from '../../constants/CustomColors';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';



const UserCard = (props: {email: string, id: string, phoneNumber: string, search?: boolean, name: string, rating: number, desc: string,
phones_sold: string, selling_phones: string}) => {

  let currentUser: string | null = null;

  console.log();
  
    if (typeof window !== 'undefined') {
      currentUser = localStorage.getItem('userId');
    }

    const darkMode = useSelector((state: State) => state.userInfo.darkMode);

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
                 Phones Sold: <span style={{color: blue}}>{props.phones_sold}</span>
                 <PhoneAndroidIcon style={{fontSize: '20px', color: blue,marginBottom: '5px'}}/>
              </Typography>
              <Button variant="contained" 
                    style={{color: white, backgroundColor: blue, padding: '10px', width: '175px', margin: '5px'}}
                    >Go To Profile</Button>
            </div>
          </a>
        ): props.id === undefined ? <UserCardSkeleton/> : (
          <div>
            <div>
              <Image src={darkMode ? "/user_dark.png" : "/user.png"} width="225px" height="225px"/>
            </div>
            <div className="card-textarea">
              <Typography variant="h6">
                {props.name}
              </Typography>
              <Typography variant="subtitle1" style={{display: 'inline-block'}}>
                <span style={{color: dark_gray, fontSize: "15px"}}>{props.desc}</span>
              </Typography>
              <Typography variant="subtitle1">
                Rating: <Rating name="seller-rating" value={props.rating ? parseFloat(props.rating.toFixed(1)) : 0} precision={0.1} readOnly
                style={{fontSize: '16px', marginTop: '15px'}}/>
              </Typography>
              <Typography variant="subtitle1">
                 Phones Sold: <span style={{color: darkMode ? darker_green : blue}}>{props.phones_sold}</span>
                 <PhoneAndroidIcon style={{fontSize: '20px', color: darkMode ? darker_green : blue,marginBottom: '5px'}}/>
              </Typography>
               <Typography variant="subtitle1">
                 Currently Selling: <span style={{color: darkMode ? darker_green : blue}}>{props.selling_phones}</span>
                 <PhoneAndroidIcon style={{fontSize: '20px', color: darkMode ? darker_green : blue,marginBottom: '5px'}}/>
              </Typography>
              {props.id === currentUser ? (
                <>
                <Button variant="contained" onClick={() => handleEditOpen(true)}
                 style={{color: '#fff', backgroundColor: darkMode ? darker_green : blue, padding: '10px', width: '175px', margin: '5px'}}
                >Edit Profile</Button>

               <EditProfileForm darkMode={darkMode} open={editOpen} handleOpen={(value: boolean) => handleEditOpen(value)} id={props.id}/>
                </>
              ) : (<>
                <Button variant="contained" onClick={e => openContanct(e)}
                      style={{color: '#fff', backgroundColor: darkMode ? darker_green : blue, padding: '10px', width: '175px', margin: '5px'}}
                      >Contact The Seller</Button>
                <UserContact darkMode={darkMode} email={props.email} phoneNumber={props.phoneNumber} open={contactOpen} handleClose={() => closeContanct()} anchorEl={contactAnchorEl}/>
                </>
              )}
            </div>
          </div>
        )}
        </>
      )
    }

  return (
    <Grid container className={darkMode ? "darkCardContainer" : "cardContainer"} style={{width: '250px',maxHeight: 500, border: '1px solid #eee'}}>
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