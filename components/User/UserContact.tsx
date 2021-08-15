import { Popover} from '@material-ui/core'
import React from 'react'

const UserContact = ({open, anchorEl, handleClose, phoneNumber, email} : 
  {open: boolean,anchorEl: any, handleClose: () => void, phoneNumber?: string, email: string}) => {


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
