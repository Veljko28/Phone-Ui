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
          <Button onClick={() => closeDialog()} color="primary">
            Disagree
          </Button>
          <Button onClick={() => onConfirm()} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

  )
}

export default PopUpDialog
