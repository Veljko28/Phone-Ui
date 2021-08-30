import React from 'react'
import Link from 'next/link';
import { Grid, Popover, Typography } from '@material-ui/core'
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import GavelIcon from '@material-ui/icons/Gavel';
import EmailIcon from '@material-ui/icons/Email';
import SettingsIcon from '@material-ui/icons/Settings';
// import PermDeviceInformationIcon from '@material-ui/icons/PermDeviceInformation';

import { blue, darker_green, dark_cont, white, gray } from '../../constants/CustomColors';
import ColoredLine from '../../constants/ColoredLine';
import { fetchGet } from '../../constants/CustomFetching';
import { useDispatch } from 'react-redux';
import { changeNumberOfNotifications } from '../../redux/actions/notificationActions';

const NotificationsPopOver = ({open, anchorEl, handleClose, darkMode} : 
  {open: boolean, anchorEl: any, handleClose: () => void, darkMode: boolean}) => {

  const [list, changeList] = React.useState([]);
  const dispatch = useDispatch();

  let userId: string | null = null;

  if (typeof window !== 'undefined'){
    userId = localStorage.getItem('userId');
  }

  React.useEffect(() => {
    const func = async () => {
      const res = await fetchGet(`http://localhost:10025/api/v1/notifications/${userId}`);
      if (res?.ok){
        const newList = await res.json();
        changeList(newList);
        dispatch(changeNumberOfNotifications(newList.length));
      }
    }

    if (userId) func();
  }, [userId])

  const ListMap = ({name, userId, type, message} : {name: string, userId: string, type: string, message?: string}) => {

  const iconStyles = {fontSize: 40, color: darkMode ? darker_green : blue, marginTop: 20, marginLeft: 15};

    return (
   <Link href={type === "phone" || type === "bid" ? message as string : ``}>
    <Grid container style={{marginTop: 10, marginBottom: 10}} className="curs-hver">
      <Grid item xs={3}>
        {type === "phone" ?  <ContactPhoneIcon style={iconStyles}/> :
         type === "bid" ? <GavelIcon style={iconStyles}/> : 
         type === "email" ?  <EmailIcon style={iconStyles}/> : <SettingsIcon style={iconStyles}/>}  
      </Grid>
      <Grid item xs={9}>
        <Typography variant="subtitle1" style={{color: darkMode ? darker_green : blue}}>
          {type === "phone" ? "Your Phone Has Been Sold !" :
           type === "bid" ? "Your Bid Has Finished !" : 
           type === "email" ? "Please Confirm Your Email !" : name}
          </Typography>
        <Typography style={{fontSize: 15,color: darkMode ? gray : 'black'}}>{type === "phone" || type === "bid" ? <span>Click here and contact the buyer about the {name}</span>
        : type === "email" ? "Validate your email entered on registration by confirm it" : 
        message}</Typography>
      </Grid>
    </Grid>
   </Link>
    ); 
  }

  return (
    <Popover
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
      <div style={{padding: '15px', width: 350, backgroundColor: darkMode ? dark_cont : white}}>
        <Typography variant="subtitle1" style={{color: darkMode ? darker_green : blue}}>Your Notifications</Typography>
        <ColoredLine color={darkMode ? darker_green : blue}/>
        {list.length > 0 ? list.map(x => ListMap(x)) : 
        <Typography variant="h6" style={{color: darkMode ? darker_green : blue, fontSize: 18, marginTop: 10}}>You currently have no notifications !</Typography>}
      </div>
      </Popover>
  )
}

export default NotificationsPopOver;
