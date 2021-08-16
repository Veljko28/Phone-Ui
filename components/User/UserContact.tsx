import { Popover} from '@material-ui/core'
import React from 'react'
import PhoneInput from 'react-phone-input-2';
import StringMask from 'string-mask';

const UserContact = ({open, anchorEl, handleClose, phoneNumber, email} : 
  {open: boolean,anchorEl: any, handleClose: () => void, phoneNumber?: string, email: string}) => {

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
        <div style={{padding: '15px'}}>
          {phoneNumber ? <div>Phone Number: <span style={{color: '#0cafe5'}}>{phoneNumber}</span></div> : ""}
          <div>Email: <span style={{color: '#0cafe5'}}>{email}</span></div>
        </div>
      </Popover>
  )
}

export default UserContact;
