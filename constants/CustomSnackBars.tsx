import { Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import React from "react";

const Alert = (props: any) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export const SnackBarSuccess = ({snackBarOpen,changeSnackBarOpen,message} :
  {snackBarOpen: boolean, changeSnackBarOpen: React.Dispatch<React.SetStateAction<boolean>>, message: string}) => {
   return (<Snackbar 
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={snackBarOpen} autoHideDuration={5000} onClose={() => changeSnackBarOpen(false)}>
        <Alert onClose={() => changeSnackBarOpen(false)} severity="success">
          {message}
        </Alert>
     </Snackbar>)
}


export const SnackBarFailed = ({snackBarOpen,changeSnackBarOpen,message} :
  {snackBarOpen: boolean, changeSnackBarOpen: React.Dispatch<React.SetStateAction<boolean>>, message: string}) => {
   return (<Snackbar 
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={snackBarOpen} autoHideDuration={5000} onClose={() => changeSnackBarOpen(false)}>
        <Alert onClose={() => changeSnackBarOpen(false)} severity="error">
          {message}
        </Alert>
     </Snackbar>)
}
