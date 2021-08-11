import { Typography, Button,
        Dialog, DialogActions, DialogContent, withStyles, IconButton} from '@material-ui/core';
import CardReactFormContainer from 'card-react';
import React from 'react';
import YupError from '../../constants/YupError';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import * as yup from 'yup';

import CloseIcon from '@material-ui/icons/Close';
import { SnackBarSuccess } from '../../constants/CustomSnackBars';


const CheckOutForm = ({open, handleOpen} : {open: boolean,handleOpen: (value: boolean) => any}) => {
    
    const [form, changeForm] = React.useState({
      number: '',
      cvc: '', 
      expiry: '',
      name: ''
    });

 
    const yupSchema = yup.object().shape({
        email: yup.string().min(5).max(150),
        userName: yup.string().min(3).max(150),
        description: yup.string().min(10).max(255)
    });

    const [errors,changeErrors] = React.useState([]); 
    const [snackBar,handleSnackBar] = React.useState(false);

    const styles = (theme: any) => ({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute' as any,
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
        });

    const DialogTitle = withStyles(styles)((props: any) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
            <IconButton aria-label="close" className={classes.closeButton} style={{background: 'transparent'}} disableRipple onClick={onClose}>
                <CloseIcon />
            </IconButton>
        ) : null}
        </MuiDialogTitle>
    );
    });

    const onSubmit = () => {return false;};

    return (
        <>
        <Dialog open={open} onClose={() => handleOpen(false)}>
             <DialogTitle onClose={() => handleOpen(false)}>
                <Typography variant="h4" style={{color: '#0cafe5',margin: 15, marginBottom: 0}}>Checkout</Typography>
             </DialogTitle>
            <DialogContent>
                  <CardReactFormContainer
                    container="card-wrapper" 
                    formInputsNames={
                        {
                        number: 'CCnumber', 
                        expiry: 'CCexpiry',
                        cvc: 'CCcvc',
                        name: 'CCname' 
                        }
                        }
            initialValues= {form}
            classes={
                {
                valid: 'valid-input',
                invalid: 'invalid-input' 
                }
            }
            formatting={true} 
            >
            
            <form>
                <input placeholder="Full name" type="text" name="CCname" />
                <input placeholder="Card number" type="text" name="CCnumber" />
                <input placeholder="MM/YY" type="text" name="CCexpiry" />
                <input placeholder="CVC" type="text" name="CCcvc" />
            </form>
            
            </CardReactFormContainer>
            <div id="card-wrapper"></div>
            </DialogContent>
            <DialogActions>
                    <Button variant="contained" style={{backgroundColor: '#0cafe5', color: '#fff', margin: 10}}
                    onClick={() => onSubmit()}>Submit</Button>
            </DialogActions>
        </Dialog>
        
        <SnackBarSuccess snackBarOpen={snackBar} changeSnackBarOpen={() => handleSnackBar(false)} message="Successful updated your profile"/>
        </>
    )
};

export default CheckOutForm;