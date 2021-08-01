import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { SnackBarFailed, SnackBarSuccess } from '../../constants/CustomSnackBars';
import { fetchPost } from '../../constants/CustomFetching';

const EmailSubscribe = () => {

 
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const [email,changeEmail] = React.useState('');
    const [snackBar,changeSnackBar] = React.useState({
        error: '',
        success: false,
        loading: false
    });

    const submitEmail = async () => {
        changeSnackBar({...snackBar,loading: true});
        const valid = reg.test(email);
        if (valid){
            const res = await fetchPost('http://localhost:10025/api/v1/generic/subscribe', {email});
            if ((res as Response).ok){
                changeSnackBar({...snackBar,success: true,loading: false});
            }
            else changeSnackBar({...snackBar,error: "Failed to Subscribe !",loading: false});
        }
        else changeSnackBar({...snackBar,error: "Invalid Email !",loading: false});

    }

    return (
        <Grid container className="subscribe-form" justify="center">
                <Typography variant="h5" style={{color: '#fff'}}>
                    Subscribe To Get Discounts &#38; Offers</Typography>
                <div className="subscribe-input">
                    <input type="text" className="subscribe-input-field" placeholder="Your Email" 
                    value={email} onChange={e => changeEmail(e.target.value)}/>
                    <button type="submit" className="subscribe-button" onClick={() => submitEmail()}>
                        Subscribe
                    </button>
                </div>

                <SnackBarSuccess snackBarOpen={snackBar.success} changeSnackBarOpen={() => changeSnackBar({...snackBar, success: false})} message="Successfully subscribed !"/>

                <SnackBarFailed snackBarOpen={snackBar.error !== ''} changeSnackBarOpen={() => changeSnackBar({...snackBar, error: ''})} 
                message={snackBar.error}/>
        </Grid>
    );
}

export default EmailSubscribe;