import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { SnackBarFailed, SnackBarSuccess } from '../../constants/CustomSnackBars';
import { fetchPost } from '../../constants/CustomFetching';
import { white } from '../../constants/CustomColors';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';
import { useTranslation } from 'react-i18next';

const EmailSubscribe = () => {

    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const [email,changeEmail] = React.useState('');
    const [snackBar,changeSnackBar] = React.useState({
        error: '',
        success: false,
        loading: false
    });

   const darkMode = useSelector((state: State) => state.userInfo.darkMode);
   const { t } = useTranslation();


    const submitEmail = async () => {
        changeSnackBar({...snackBar,loading: true});
        const valid = reg.test(email);
        if (valid){
            const res = await fetchPost('http://localhost:10025/api/v1/generic/subscribe', {email});
            if ((res as Response).ok){
                setTimeout(() => location.reload(), 1200)
                changeSnackBar({...snackBar,success: true,loading: false});
            }
            else changeSnackBar({...snackBar,error: t("subscribe.failed"),loading: false});
        }
        else changeSnackBar({...snackBar,error: t("subscribe.invalid"),loading: false});

    }

    return (
        <Grid container className={darkMode ? "subscribe-form-dark" : "subscribe-form"} justifyContent="center">
                <Typography variant="h5" style={{color: white}}>{t("subscribe.title")}</Typography>
                <div className="subscribe-input">
                    <input type="text" className="subscribe-input-field" placeholder={t("subscribe.input")}
                    value={email} onChange={e => changeEmail(e.target.value)}/>
                    <button type="submit" className={darkMode ? "subscribe-button-dark" : "subscribe-button"} onClick={() => submitEmail()}>
                        {t("subscribe.button")}
                    </button>
                </div>

                <SnackBarSuccess snackBarOpen={snackBar.success} changeSnackBarOpen={() => changeSnackBar({...snackBar, success: false})} 
                message={t("subscribe.success") as any}/>

                <SnackBarFailed snackBarOpen={snackBar.error !== ''} changeSnackBarOpen={() => changeSnackBar({...snackBar, error: ''})} 
                message={snackBar.error}/>
        </Grid>
    );
}

export default EmailSubscribe;