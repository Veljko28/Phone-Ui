import { Popover} from '@material-ui/core'
import React from 'react'

const UserContact = ({open, anchorEl, handleClose} : 
  {open: boolean,anchorEl: any, handleClose: () => void}) => {


    const test = {
      phoneNumber: '+381 064 237 6128',
      email: 'user1@mobistore.com'
    };

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
          <div>Phone Number: <span style={{color: '#0cafe5'}}>{test.phoneNumber}</span></div>
          <div>Email: <span style={{color: '#0cafe5'}}>{test.email}</span></div>
        </div>
      </Popover>
  )
}

export default UserContact;
