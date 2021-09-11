import React from 'react';
import * as yup from 'yup';
import Image from 'next/image';
import { Grid, Typography, TextField, InputAdornment, Button } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import { useRouter } from 'next/router';
import { blue, white, dark_gray, gray, darker_green } from '../constants/CustomColors';
import { useSelector } from 'react-redux';
import { State } from '../redux/reduxTypes';
import { useTranslation } from 'react-i18next';
import { fetchPost } from '../constants/CustomFetching';
import { SnackBarFailed, SnackBarSuccess } from '../constants/CustomSnackBars';

 
 const ForgotPassword = () => {

    const router = useRouter();

    const [email,changeEmail] = React.useState("");
    const darkMode = useSelector((state: State) => state.userInfo.darkMode);
    const [snackbar, changeSnackbarOpen] = React.useState(false);
    const [error, changeError] = React.useState({open: false, message: ""});
    const { t } = useTranslation();

    const yupSchema = yup.string().email();

    const onSubmit = async () => {
        try {
            await yupSchema.validate(email, {abortEarly: false});

            const res = await fetchPost("http://localhost:10025/api/v1/email/forgotpassword", {email});

            if (!res.ok){
                changeError({open: true, message: t("forgotPass.failed")});
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    if (typeof window !== 'undefined' && localStorage.getItem('jwt') !== null) {
        router.push('/404');
    }

    return (
         <Grid container className={darkMode ? "forgot-pass-dark" : "forgot-pass"} style={{display: 'flex', flexDirection: "column", alignItems: 'center', minHeight: 750}}>
             <span style={{marginTop: 40, marginBottom: 50}}>
                <Image src={darkMode ? "/logo_dark.png" : "/logo.png"} width="157" height="47" />
             </span>
             <Typography variant="subtitle2" style={{color: darkMode ? gray : dark_gray, textAlign: 'center'}}>{t("forgotPass.enter")} <br/>
              {t("forgotPass.enter2")}</Typography>
              <TextField placeholder="Email" value={email}
              onChange={e => changeEmail(e.target.value)}
                InputProps={{
                    className: "forgot-pass-input",
                    startAdornment: (
                    <InputAdornment position="start">
                        <MailIcon style={{fontSize: '15px', color: '#656'}}/>
                    </InputAdornment>
                    ),
                    disableUnderline: true
                }}/>
              <Button style={{margin: '10px 0 10px 0', backgroundColor: darkMode ? darker_green : blue, color: white, padding: 10, minWidth: 350}}
               onClick={() => onSubmit()}
              >{t("changePass.continue")}</Button>


            <SnackBarSuccess snackBarOpen={snackbar} changeSnackBarOpen={() => changeSnackbarOpen(false)} message={t("forgotPass.success")}/>

            <SnackBarFailed snackBarOpen={error.open} changeSnackBarOpen={() => changeError({open: false, message: ""})} message={error.message}/>
         </Grid>
     )
 }
 
 export default ForgotPassword;
 