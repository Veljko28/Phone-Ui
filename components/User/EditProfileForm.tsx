import React from 'react';
import * as yup from 'yup';
import Link from 'next/link';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { Grid, Typography, TextField, InputAdornment, Button, 
        Dialog, DialogActions, DialogContent, withStyles, IconButton, Tooltip} from '@material-ui/core';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';

import MailIcon from '@material-ui/icons/Mail';
import CloseIcon from '@material-ui/icons/Close';
import PersonIcon from '@material-ui/icons/Person';
    
import YupError from '../../constants/YupError';
import { formatYupError } from '../../constants/formYupError';
import { SnackBarFailed, SnackBarSuccess } from '../../constants/CustomSnackBars';
import { fetchGet, fetchPost } from '../../constants/CustomFetching';
import { blue, darker_green, dark_cont, white } from '../../constants/CustomColors';


const EditProfileForm = ({open, handleOpen, id, darkMode, t} : 
    {open: boolean,handleOpen: (value: boolean) => any,id: string, darkMode: boolean, t: any}) => {
    
    const [form, changeForm] = React.useState({
        userName: "",
        email: "",
        description: "",
        phoneNumber: "",
        emailConfirmed: false
    });

    React.useEffect(() => {
      const func = async () => {
         const res = await fetchGet(`http://localhost:10025/api/v1/users/${id}`);
         if (res.ok){
           const json = await res.json();
           const newForm = {userName: json.userName, email: json.email, description: json.description, phoneNumber: json.phoneNumber, 
            emailConfirmed: json.emailConfirmed
        };
           changeForm(newForm);
         }
      };

      if (id) func();
    },[id])


    const yupSchema = yup.object().shape({
        email: yup.string().min(5).max(150),
        userName: yup.string().min(3).max(150),
        description: yup.string().min(10).max(255).nullable()
    });

    const [errors,changeErrors] = React.useState([]); 
    const [snackBar,handleSnackBar] = React.useState({
        success: false,
        error: false,
        message: ""
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

               const res = await fetchPost(`http://localhost:10025/api/v1/users/edit/${id}`, form);

               if (res.ok){
                handleOpen(false);
                handleSnackBar({...snackBar, success: true, message: "Successfully edited your profile !"});
                setTimeout(() => location.reload(),1500);
               }
               else {
                handleOpen(false);
                handleSnackBar({...snackBar, error: true, message: (await res.text()).replace(/"/g,"")});
               }

        }
        catch (err) {
            changeErrors(formatYupError(err) as any);
            return;
        }
    }

    return (
        <>
        <Dialog open={open} onClose={() => handleOpen(false)}
        PaperProps={{
            style: {
            backgroundColor: darkMode ? dark_cont : white,
            boxShadow: 'none',
            },
         }}>
             <DialogTitle onClose={() => handleOpen(false)}>
                <Typography variant="h4" style={{color: darkMode ? darker_green : blue,margin: 15, marginBottom: 0}}>{t("editProfile.title")}</Typography>
             </DialogTitle>
            <DialogContent>
                  <Grid container style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Grid xs={12} item container>
                       <Grid xs={6} item>
                      <Tooltip 
                      placement="bottom"
                      title={form.emailConfirmed ? t("editProfile.confirmed") : t("editProfile.change")}>
                        <TextField placeholder="Email" value={form.email} disabled={form.emailConfirmed}
                            onChange={e => changeForm({...form,email: e.target.value})}
                            InputProps={{
                                className: errors.filter((x: any) => x.path === 'email').length > 0 ? "login-imput-error" : "login-imput",
                                startAdornment: (
                                <InputAdornment position="start">
                                    <MailIcon style={{fontSize: '15px', color: '#656'}}/>
                                </InputAdornment>
                                ),
                                disableUnderline: true,
                            }}/>
                        </Tooltip>
                            <div>
                                <YupError errors={errors} path="email" fontSize={8}/>
                            </div>
                       </Grid>
                       <Grid xs={6} item>
                            <TextField placeholder="Username" value={form.userName} type="text"
                            onChange={e => changeForm({...form,userName: e.target.value})}
                            InputProps={{
                            className: errors.filter((x: any) => x.path === 'userName').length > 0 ? "login-imput-error" : "login-imput",
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon style={{fontSize: '15px', color: '#656'}}/>
                                </InputAdornment>
                                ),
                                disableUnderline: true
                            }}/>
                                <div>
                                    <YupError errors={errors} path="userName" fontSize={8}/>
                                </div>
                       </Grid>
                    </Grid>

                    <TextField placeholder="Description" value={form.description} rows="3" multiline={true} style={{minWidth: 480}}
                    onChange={e => changeForm({...form,description: e.target.value})}
                    InputProps={{
                        className: errors.filter((x: any) => x.path === 'description').length > 0 ? "login-imput-error" : "login-imput",
                        style: {padding: "10px"},
                        disableUnderline: true
                    }}/>
                    <YupError errors={errors} path="description" fontSize={8}/>
                        <PhoneInput style={{marginLeft: 20}} autoFormat
                        masks={{rs: '(...) ...-....'}}
                        country={'rs'}
                        value={form.phoneNumber} specialLabel={false}
                        onChange={(phone: string) => changeForm({...form, phoneNumber: phone})}
                        />
                </Grid>
            </DialogContent>
            <DialogActions>
                    <Link href={`/user/changepassword/${id}`}>
                        <Button variant="contained" style={{backgroundColor: darkMode ? darker_green : blue, color: white, margin: 10}}>
                            {t("editProfile.changePass")}
                        </Button>
                    </Link>
                    <Button variant="contained" style={{backgroundColor: darkMode ? darker_green : blue, color: white, margin: 10}}
                    onClick={() => onSubmit()}>{t("add.submit")}</Button>
            </DialogActions>
        </Dialog>
        
        <SnackBarSuccess snackBarOpen={snackBar.success} changeSnackBarOpen={() => handleSnackBar({...snackBar,success: false})} message={snackBar.message}/>

        <SnackBarFailed snackBarOpen={snackBar.error} changeSnackBarOpen={() => handleSnackBar({...snackBar,error: false})} message={snackBar.message}/>

        </>
    )
};

export default EditProfileForm;