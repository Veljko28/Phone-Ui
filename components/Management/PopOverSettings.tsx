import { Button, Popover} from '@material-ui/core';
import React from 'react';
import Link from 'next/link';

import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import PopUpDialog from '../../constants/PopUpDialog';
import { fetchDelete } from '../../constants/CustomFetching';
import { SnackBarFailed, SnackBarSuccess } from '../../constants/CustomSnackBars';


const PopOverSettings = ({id, open, anchorEl, handleClose, myBid} : 
  {id?: string, open: boolean,anchorEl: any, handleClose: () => void, myBid?: boolean}) => {

    const [dialogOpen,changeDialogOpen] = React.useState(false);
    const [snackBar,changeSnackbar] = React.useState({
      success: false,
      error: false
    }); 

    const deletePhone = async () => {

        const res = await fetchDelete(`http://localhost:10025/api/v1/${myBid ? "bids" : "phones"}/delete/${id}`);
        console.log(res);
        changeDialogOpen(false);
        if (res.ok){
          changeSnackbar({error: false,success:true});
          setTimeout(() => {
          location.reload();
          },1500)
        }
        else changeSnackbar({error: true,success: false});
        
       

    }

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
          {myBid === true ? null : <Link href={`/phone/edit/${id}`}><div className="edit-btn-mngm"><EditIcon style={{fontSize: '15px', color: '#fff',marginBottom: '5px'}}/> Edit</div></Link> }
          <div className="delete-btn-mngm"
           onClick={() => changeDialogOpen(true)}><ClearIcon style={{fontSize: '15px', color: '#fff',marginBottom: '5px'}}/> Delete</div>
        </div>


        
      <PopUpDialog open={dialogOpen} closeDialog={() => changeDialogOpen(false)} 
      title={`Are you sure you want to delete this phone?`}
      message={"By agreeing with this, your phone will be delete from our server forever !"}
            onConfirm={() => deletePhone()}/>

      <SnackBarSuccess snackBarOpen={snackBar.success} 
      changeSnackBarOpen={() => changeSnackbar({...snackBar,success: false})} message="Successfully deleted the phone !"/>

        <SnackBarFailed snackBarOpen={snackBar.error} 
        changeSnackBarOpen={() => changeSnackbar({...snackBar,error: false})} message={"Failed to delete the phone !"}/>           

      </Popover>
  )
}

export default PopOverSettings;
