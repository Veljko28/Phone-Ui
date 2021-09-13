import React from 'react';
import * as yup from 'yup';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, TextField, InputAdornment, Button, CircularProgress } from '@material-ui/core';

import LockIcon from '@material-ui/icons/Lock';
import LockOpenTwoToneIcon from '@material-ui/icons/LockOpenTwoTone';
import VisibilityIcon from '@material-ui/icons/Visibility';

import YupError from '../../../constants/YupError';
import { fetchPatch } from '../../../constants/CustomFetching';
import { formatYupError } from '../../../constants/formYupError';
import { changeLoginStatus } from '../../../redux/actions/userInfoActions';
import { SnackBarFailed, SnackBarSuccess } from '../../../constants/CustomSnackBars';
import { dark_gray, blue, white, gray, darker_green } from '../../../constants/CustomColors';
import { State } from '../../../redux/reduxTypes';
import { useTranslation } from 'react-i18next';
import NotFound from '../../../components/NotFound';

 
 const ForgotPassword = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const darkMode = useSelector((state: State) => state.userInfo.darkMode);
    const loggedIn = useSelector((state: State) => state.userInfo.logged_in);
    const { t } = useTranslation();

    let currentUser = null;

    if (typeof window != 'undefined'){
      currentUser = localStorage.userId;
    }

    const id = router.query['id'];

    const [form, changeForm] = React.useState({
      current_password: "",
      confirm_current_password: "",
      new_password: ""
    });
    const [errors, changeErrors] = React.useState<any>([]);
    const [snackBar, changeSnackBar] = React.useState({
      success: false,
      error: false,
      loading: false,
      message: ""
    })

    const [showPass, changeShowPass] = React.useState(false);

    const yupSchema = yup.object().shape({
      current_password: yup.string().min(7).max(255),
      confirm_current_password: yup.string().min(7).max(255),
      new_password: yup.string().min(7).max(255)
    })

    const onSubmit = async () => {
        try {
            changeSnackBar({...snackBar, loading: true});
            await yupSchema.validate(form, {abortEarly: false});
            if (form.current_password !== form.confirm_current_password) {
              changeErrors([{path: "confirm_current_password", message: "Confirm password must match the current one"}, ...errors]);
              changeSnackBar({...snackBar, loading: false});
              return;
            }

            changeErrors([]);
            const res = await fetchPatch(`http://localhost:10025/api/v1/users/changepassword/${id}`, form);
            if (res.ok){
               changeSnackBar({success: true, error: false, loading: false, message: t("changePass.success")});
               dispatch(changeLoginStatus(false));
               localStorage.clear();
               setTimeout(() => router.push('/login'), 1200);
            }
            else if (res.status === 500 || res.status === 400){
              changeSnackBar({success: false, error: true, loading: false, message: t("changePass.invalid")});
            }
            else {
              changeSnackBar({success: false, error: true, loading: false, message: t("changePass.failed")});
            }
        }
        catch (err) {
          changeErrors(formatYupError(err as any) as any);
          changeSnackBar({...snackBar, loading: false});
        }
    }

    return !loggedIn || currentUser !== (id as string) ? <NotFound t={t}/> : (
         <Grid container className={darkMode ? "change-pass-dark" : "change-pass"} style={{display: 'flex', flexDirection: "column", alignItems: 'center', minHeight: 750}}>
             <span style={{marginTop: 40, marginBottom: 50}}>
                <Image src={darkMode ? "/logo_dark.png" : "/logo.png"} width="157" height="47" />
             </span>
             <Typography variant="subtitle2" style={{color: darkMode ? gray : dark_gray, textAlign: 'center'}}>
              {t("changePass.enter")} <br/>
              {t("changePass.enter2")}</Typography>
              <TextField placeholder={t("changePass.current")} value={form.current_password} type="password"
              onChange={e => changeForm({...form,current_password: e.target.value})}
                InputProps={{
                    className: errors.filter((x: any) => x.path === 'current_password').length > 0 ? "forgot-pass-error-input" : "forgot-pass-input",
                    startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon style={{fontSize: '15px', color: '#656'}}/>
                    </InputAdornment>
                    ),
                    disableUnderline: true
                }}/>
                <YupError errors={errors} path="current_password"/>

                <TextField placeholder={t("changePass.confirm")} value={form.confirm_current_password} type="password"
              onChange={e => changeForm({...form,confirm_current_password: e.target.value})}
                InputProps={{
                    className: errors.filter((x: any) => x.path === 'confirm_current_password').length > 0 ? "forgot-pass-error-input" : "forgot-pass-input",
                    startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon style={{fontSize: '15px', color: '#656'}}/>
                    </InputAdornment>
                    ),
                    disableUnderline: true
                }}/>
                <YupError errors={errors} path="confirm_current_password"/>




                <TextField placeholder={t("changePass.newPass")} value={form.new_password} type={showPass ? "text" : "password"}
              onChange={e => changeForm({...form,new_password: e.target.value})}
                InputProps={{
                    className: errors.filter((x: any) => x.path === 'new_password').length > 0 ? "forgot-pass-error-input" : "forgot-pass-input",
                    startAdornment: (
                    <InputAdornment position="start">
                       <LockOpenTwoToneIcon style={{fontSize: '15px', color: '#656'}}/>
                    </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="start" style={{cursor: 'pointer'}} onClick={() => changeShowPass(!showPass)}>
                        <VisibilityIcon style={{fontSize: '15px', color: '#656'}}/>
                      </InputAdornment>
                      ),
                    disableUnderline: true
                }}/>
                <YupError errors={errors} path="new_password"/>

              <Button style={{margin: '10px 0 10px 0', backgroundColor: darkMode ? darker_green : blue, color: white, padding: 10, minWidth: 350}}
               onClick={() => onSubmit()}
              >{ snackBar.loading ? <CircularProgress style={{color: white}} size={24}/> : t("changePass.continue") }</Button>


               <SnackBarSuccess snackBarOpen={snackBar.success} changeSnackBarOpen={() => changeSnackBar({...snackBar, success: false})} message={snackBar.message}/>

          <SnackBarFailed snackBarOpen={snackBar.error} changeSnackBarOpen={() => changeSnackBar({...snackBar, error: false})} message={snackBar.message}/>
         </Grid>
     )
 }
 
 export default ForgotPassword;
 