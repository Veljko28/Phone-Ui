import React from 'react';
import * as yup from 'yup';
import CardReactFormContainer from 'card-react';
import { Typography, Button, Dialog, DialogActions, DialogContent, withStyles, IconButton, TextField} from '@material-ui/core';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';

import YupError from '../../constants/YupError';
import { fetchPost, fetchGet } from '../../constants/CustomFetching';
import { formatYupError } from '../../constants/formYupError';
import { SnackBarFailed } from '../../constants/CustomSnackBars';
import { blue, dark, darker_green, white } from '../../constants/CustomColors';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../redux/reduxTypes';
import { clearCart } from '../../redux/actions/cartActions';


const CheckOutForm = ({open, handleOpen,snackBar,handleSnackBar, darkMode} : {
open: boolean,handleOpen: (value: boolean) => any,
snackBar: {success: boolean, error: boolean}, handleSnackBar: (value: any) => void, darkMode: boolean}) => {
    
    const [form, changeForm] = React.useState({
      number: '',
      cvc: '', 
      expiry: '',
      name: ''
    });

    const dispatch = useDispatch();

    let userId: string | null = null;

    if (typeof window !== 'undefined'){
        userId = localStorage.getItem('userId');
    }
 
    const yupSchema = yup.object().shape({
        number: yup.string().min(19).max(23),
        name: yup.string().min(8).max(100),
        cvc: yup.string().min(3).max(4),
        expiry: yup.string().length(9)
    });

    const [errors,changeErrors] = React.useState([]); 
  
    const list = useSelector((state: State) => state.cart.items);

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
        
        const badRequest = () => {
            handleSnackBar({success: false, error: true});
            return;
        }

        try {
            await yupSchema.validate(form, {abortEarly: false});
        }
        catch (err) {
            changeErrors(formatYupError(err) as any);
            return badRequest();
        }

        
        dispatch(clearCart());
        list.forEach(async (x) => {
            const res = await fetchPost('http://localhost:10025/api/v1/phones/status', {phoneId: x.id,status: 1});
            if (!res.ok){
                return badRequest();
            }
            const notifRes = await fetchPost('http://localhost:10025/api/v1/notifications/add', 
            {name: x.name, type: "phone", userId: x.seller, message: `/user/${userId}`});
             if (!notifRes.ok){
                return badRequest();
            }
            const userEmail = await fetchGet(`http://localhost:10025/api/v1/users/${x.seller}/email`);
            if (!userEmail.ok){
                return badRequest();
            }
            else {
                const email = await userEmail.text();
                const sendPhoneSoldEmail = await fetchPost('http://localhost:10025/api/v1/email/sold', {
                    name: x.name, type: "phone", email, buyerId: userId, sellerId: x.seller
                })
                if (!sendPhoneSoldEmail){
                    return badRequest();
                }
            }

            await fetchPost(`http://localhost:10025/api/v1/users/loyality/add/${userId}`, {});
        })
        
        const purhcaseList = list.map(x => ({phoneId: x.id, sellerId: x.seller, buyerId: userId}));
        await fetchPost('http://localhost:10025/api/v1/purchase/add', purhcaseList);
       
        handleSnackBar({success: true, error: false});
        handleOpen(false);
        // const res = await fetchPost('http://localhost:10025/api/v1/generic/checkout', form);
    };

    return (
        <>
        <Dialog open={open} onClose={() => handleOpen(false)}
          PaperProps={{
            style: {
            backgroundColor: darkMode ? dark : white,
            boxShadow: 'none',
            },
         }}>
             <DialogTitle onClose={() => handleOpen(false)}>
                <Typography variant="h4" style={{color: darkMode ? darker_green : blue,margin: 15, marginBottom: 0}}>Checkout</Typography>
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
            
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div>
                    <TextField placeholder="Full name" type="text" name="CCname" className="check-input" style={{margin: 5}}
                    onChange={e => changeForm({...form,name: e.target.value})}
                    InputProps={{
                    className: errors.filter((x: any) => x.path === 'name').length > 0 ? "check-imput-error" : "check-imput",
                    disableUnderline: true
                    }}/>
                    <br/>
                    <YupError errors={errors} path="name"/>

                    <TextField placeholder="Card number" type="text" name="CCnumber"  className="check-input"  style={{margin: 5}}
                    onChange={e => changeForm({...form,number: e.target.value})}
                    InputProps={{
                    className: errors.filter((x: any) => x.path === 'number').length > 0 ? "check-imput-error" : "check-imput",
                    disableUnderline: true
                    }}/>
                    <br/>
                    <YupError errors={errors} path="number"/>
                </div>
                <div>
                    <TextField placeholder="MM/YYYY" type="text" name="CCexpiry"  className="check-input" style={{margin: 5}}
                    onChange={e => changeForm({...form,expiry: e.target.value})}
                    InputProps={{
                    className: errors.filter((x: any) => x.path === 'expiry').length > 0 ? "check-imput-error" : "check-imput",
                    disableUnderline: true
                    }}/>
                    <br/>
                    <YupError errors={errors} path="expiry"/>

                    <TextField placeholder="CVC" type="text" name="CCcvc" className="check-input" style={{margin: 5}}
                    onChange={e => changeForm({...form,cvc: e.target.value})}
                    InputProps={{
                    className: errors.filter((x: any) => x.path === 'cvc').length > 0 ? "check-imput-error" : "check-imput",
                    disableUnderline: true
                    }}/>
                    <br/>
                    <YupError errors={errors} path="expiry"/>
                </div>
 
            </div>
            
            </CardReactFormContainer>
            <div id="card-wrapper" style={{margin: 10}}></div>
            </DialogContent>
            <DialogActions>
                    <Button variant="contained" style={{backgroundColor: darkMode ? darker_green : blue, color: white, margin: 10}}
                    onClick={() => onSubmit()}>Submit</Button>
            </DialogActions>
        </Dialog>

        <SnackBarFailed snackBarOpen={snackBar.error}
         changeSnackBarOpen={() => handleSnackBar({success: false, error: false})}
          message="Failed to confirm checkout. Try again later"/>
        </>
    )
};

export default CheckOutForm;