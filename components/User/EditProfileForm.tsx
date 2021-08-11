import { Grid, Typography, TextField, InputAdornment, Button,
        Dialog, DialogActions, DialogContent, withStyles, IconButton} from '@material-ui/core';
import React from 'react';
import YupError from '../../constants/YupError';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import * as yup from 'yup';

import PersonIcon from '@material-ui/icons/Person';
import MailIcon from '@material-ui/icons/Mail';
import CloseIcon from '@material-ui/icons/Close';
import { fetchGet, fetchPost } from '../../constants/CustomFetching';
import { SnackBarSuccess } from '../../constants/CustomSnackBars';
import { formatYupError } from '../../constants/formYupError';


const EditProfileForm = ({open, handleOpen, id} : {open: boolean,handleOpen: (value: boolean) => any,id: string}) => {
    
    const [form, changeForm] = React.useState({
        userName: "",
        email: "",
        description: "",
    });

    React.useEffect(() => {
      const func = async () => {
         const res = await fetchGet(`http://localhost:10025/api/v1/users/${id}`);
         if (res.ok){
           const json = await res.json();
           const newForm = {userName: json.userName, email: json.email, description: json.description};
           console.log(newForm);
           changeForm(newForm);
         }
      };

      if (id) func();
    },[id])

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

    const onSubmit = async () => {
        try {
            await yupSchema.validate(form, {abortEarly: false});

               const res = await fetchPost(`http://localhost:10025/api/v1/users/edit/${id}`, form);

               if (res.ok){
                handleOpen(false);
                handleSnackBar(true);
                setTimeout(() => location.reload(),1500);
               }

        }
        catch (err) {
            changeErrors(formatYupError(err) as any);
            return;
        }
    }


    return (
        <>
        <Dialog open={open} onClose={() => handleOpen(false)}>
             <DialogTitle onClose={() => handleOpen(false)}>
                <Typography variant="h4" style={{color: '#0cafe5',margin: 15, marginBottom: 0}}>Edit Profile</Typography>
             </DialogTitle>
            <DialogContent>
                  <Grid container style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff'}}>
                    <Grid xs={12} item container>
                       <Grid xs={6} item>
                                <TextField placeholder="Email" value={form.email} 
                            onChange={e => changeForm({...form,email: e.target.value})}
                            InputProps={{
                                className: errors.filter((x: any) => x.path === 'email').length > 0 ? "login-imput-error" : "login-imput",
                                startAdornment: (
                                <InputAdornment position="start">
                                    <MailIcon style={{fontSize: '15px', color: '#656'}}/>
                                </InputAdornment>
                                ),
                                disableUnderline: true
                            }}/>
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
                </Grid>
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

export default EditProfileForm;