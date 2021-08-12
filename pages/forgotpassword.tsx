import React from 'react';
import * as yup from 'yup';
import Image from 'next/image';
import { Grid, Typography, TextField, InputAdornment, Button } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';

 
 const ForgotPassword = () => {
    const [email,changeEmail] = React.useState("");

    const yupSchema = yup.string().email();

    const onSubmit = async () => {
        try {
            await yupSchema.validate(email, {abortEarly: false});
        }
        catch (err) {
        }
    }

    return (
         <Grid container className="forgot-pass" style={{display: 'flex', flexDirection: "column", alignItems: 'center', minHeight: 650}}>
             <span style={{marginTop: 40, marginBottom: 50}}>
                <Image src="/logo.png" width="157" height="47" />
             </span>
             <Typography variant="subtitle2" style={{color: '#999'}}>Enter the email address associated with your account <br/>
              and we'll send you a link to reset your password</Typography>
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
              <Button style={{margin: '10px 0 10px 0', backgroundColor: '#0cafe5', color: '#fff', padding: 10, minWidth: 350}}
               onClick={() => onSubmit()}
              >Continue</Button>
         </Grid>
     )
 }
 
 export default ForgotPassword;
 