import { Button, DialogActions, DialogContent, DialogContentText } from '@material-ui/core'
import { DialogTitle } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { blue, red, white, darker_green, dark_cont } from './CustomColors'

const PopUpDialog = ({open, closeDialog, title, message, onConfirm, darkMode} :
   {open: boolean, closeDialog: () => any ,title: string,message: string, onConfirm: () => any, darkMode?: boolean}) => {


    const { t } = useTranslation();

  return (
    <Dialog
        open={open}
        onClose={() => closeDialog()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
            style: {
            backgroundColor: darkMode ? dark_cont : white,
            color: darkMode ? white : 'black',
            boxShadow: 'none',
            },
         }}
      >
        <DialogTitle id="alert-dialog-title" style={{color: darkMode ? darker_green : blue}}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{color: darkMode ? white : 'black'}}>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeDialog()} variant="contained" style={{backgroundColor: red, color: white}}>
            {t("dialog.disagree")}
          </Button>
          <Button onClick={() => onConfirm()} variant="contained" style={{backgroundColor: darkMode ? darker_green : blue, color: white}} autoFocus>
            {t("dialog.agree")}
          </Button>
        </DialogActions>
      </Dialog>

  )
}

export default PopUpDialog
