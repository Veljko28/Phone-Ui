import { Button, Popover} from '@material-ui/core'
import React from 'react'

import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';


const PopOverSettings = ({open, anchorEl, handleClose} : 
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
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div style={{padding: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div className="edit-btn-mngm"><EditIcon style={{fontSize: '15px', color: '#fff',marginBottom: '5px'}}/> Edit</div>
          <div className="delete-btn-mngm"><ClearIcon style={{fontSize: '15px', color: '#fff',marginBottom: '5px'}}/> Delete</div>
        </div>
      </Popover>
  )
}

export default PopOverSettings;
