import { Typography, Button,
        Dialog, DialogActions, DialogContent, withStyles, IconButton} from '@material-ui/core';
import CardReactFormContainer from 'card-react';
import React from 'react';
import YupError from '../../constants/YupError';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import * as yup from 'yup';

import CloseIcon from '@material-ui/icons/Close';
import { SnackBarSuccess,SnackBarFailed } from '../../constants/CustomSnackBars';
import { fetchPost } from '../../constants/CustomFetching';
import { formatYupError } from '../../constants/formYupError';


const CheckOutForm = ({open, handleOpen} : {open: boolean,handleOpen: (value: boolean) => any}) => {
    
    const [form, changeForm] = React.useState({
      number: '',
      cvc: '', 
      expiry: '',
      name: ''
    });
 
    const yupSchema = yup.object().shape({
        number: yup.string().min(19).max(23),
        name: yup.string().min(3).max(30),
        cvc: yup.string().min(3).max(4),
        expiry: yup.string().length(9)
    });

    const [errors,changeErrors] = React.useState([]); 
    const [snackBar,handleSnackBar] = React.useState({
        success: false,
        error: false
    });

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

    const onSubmit = async () => {

        try {
            await yupSchema.validate(form, {abortEarly: false});
        }
        catch (err) {
            changeErrors(formatYupError(err) as any);
            handleSnackBar({success: false, error: true});
            return;
        }

        handleSnackBar({success: true, error: false});
        handleOpen(false);
        // const res = await fetchPost('http://localhost:10025/api/v1/generic/checkout', form);
    };

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
                <input placeholder="Full name" type="text" name="CCname" className="check-input" 
                onChange={e => changeForm({...form,name: e.target.value})}/>
                <input placeholder="Card number" type="text" name="CCnumber" className="check-input"
                onChange={e => changeForm({...form,number: e.target.value})}/>
                <input placeholder="MM/YY" type="text" name="CCexpiry" className="check-input"
                onChange={e => changeForm({...form,expiry: e.target.value})}/>
                <input placeholder="CVC" type="text" name="CCcvc" className="check-input"
                onChange={e => changeForm({...form,cvc: e.target.value})}/>
            </form>
            
            </CardReactFormContainer>
            <div id="card-wrapper" style={{margin: 10}}></div>
            </DialogContent>
            <DialogActions>
                    <Button variant="contained" style={{backgroundColor: '#0cafe5', color: '#fff', margin: 10}}
                    onClick={() => onSubmit()}>Submit</Button>
            </DialogActions>
        </Dialog>
        
        <SnackBarSuccess snackBarOpen={snackBar.success}
         changeSnackBarOpen={() => handleSnackBar({success: false, error: false})}
          message="Successful purchase the items !"/>

        <SnackBarFailed snackBarOpen={snackBar.error}
         changeSnackBarOpen={() => handleSnackBar({success: false, error: false})}
          message="Failed to confirm checkout. Try again later"/>
        </>
    )
};

export default CheckOutForm;