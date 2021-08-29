import { Popover} from '@material-ui/core'
import React from 'react'
import StringMask from 'string-mask';
import { blue, dark_cont, white, darker_green, gray } from '../../constants/CustomColors';

const UserContact = ({open, anchorEl, handleClose, phoneNumber, email, darkMode} : 
  {open: boolean,anchorEl: any, handleClose: () => void, phoneNumber?: string, email: string, darkMode: boolean}) => {

    let mask = "";


    if (phoneNumber?.includes("381")){
      mask = '+000 (000) 000-0000';
    }
    else mask = '+00 (00) 0000-0000';

    const formatter = new StringMask(mask);
    phoneNumber = formatter.apply(phoneNumber);


  return (
    <Popover
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div style={{padding: '15px', backgroundColor: darkMode ? dark_cont : white}}>
          {phoneNumber ? <div style={{color: darkMode ? gray : 'black'}}>Phone Number: <span style={{color: darkMode ? darker_green :blue}}>{phoneNumber}</span></div> : ""}
          <div style={{color: darkMode ? gray : 'black'}}>Email: <span style={{color: darkMode ? darker_green :blue}}>{email}</span></div>
        </div>
      </Popover>
  )
}

export default UserContact;
