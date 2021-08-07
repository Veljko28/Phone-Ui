import { Button, DialogActions, DialogContent, DialogContentText } from '@material-ui/core'
import { DialogTitle } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import React from 'react'

const PopUpDialog = ({open, closeDialog, title, message, onConfirm} :
   {open: boolean, closeDialog: () => any ,title: string,message: string, onConfirm: () => any}) => {
  return (
    <Dialog
        open={open}
        onClose={() => closeDialog()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeDialog()} variant="contained" style={{backgroundColor: 'red', color: '#fff'}}>
            Disagree
          </Button>
          <Button onClick={() => onConfirm()} variant="contained" style={{backgroundColor: '#0cafe5', color: '#fff'}} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

  )
}

export default PopUpDialog
