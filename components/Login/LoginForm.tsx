import React from 'react';
import Link from 'next/link';
import { Grid, Typography, TextField, InputAdornment, Button, CircularProgress} from '@material-ui/core';

import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityIcon from '@material-ui/icons/Visibility';

import * as yup from 'yup';
import { SocialIcon } from 'react-social-icons';
import YupError from '../../constants/YupError';
import socialLinks from '../../constants/SocialLinks';
import ColoredLine from '../../constants/ColoredLine';
import { fetchPost } from '../../constants/CustomFetching';
import { formatYupError } from '../../constants/formYupError';
import { SnackBarSuccess, SnackBarFailed } from '../../constants/CustomSnackBars';


const LoginForm = () => {


  const [form, changeForm] = React.useState({
    email: '',
    password: ''
  });

  const [snackBar,changeSnackBar] = React.useState({
    error: false,
    success: false,
    loading: false
  })
  const [showPass,changeShowPass] = React.useState(false);
  const [errors,changeErrors] = React.useState([]);

  
  const yupSchema = yup.object().shape({
    email: yup.string().min(5).max(255),
    password: yup.string().min(4).max(255),
  })

  const loginUser = async () => {
      
    const payload = {
      email_UserName: form.email,
      password: form.password
    }

    try {
      await yupSchema.validate(form, {abortEarly: false});
    }
    catch (err) {
      changeErrors(formatYupError(err) as any);
      return;
    }

    const res = await fetchPost('http://localhost:10025/api/v1/users/login', payload);

    if (res.ok){
      changeSnackBar({...snackBar, success: true, loading: false});
    }

    else changeSnackBar({...snackBar, error: true, loading: false});
  }

  return (
    <Grid container className="login-tab">
      <Typography variant="h6" style={{margin: '10px'}}>Login</Typography>
      <ColoredLine color="#eee"/>


      <TextField placeholder="Email / Username" value={form.email} 
      onChange={e => changeForm({...form,email: e.target.value})}
      InputProps={{
        className: errors.filter((x: any) => x.path === 'email').length > 0 ? "login-imput-error" : "login-imput",
        startAdornment: (
        <InputAdornment position="start">
          <PersonIcon style={{fontSize: '15px', color: '#656'}}/>
        </InputAdornment>
        ),
        disableUnderline: true
      }}/>
      <YupError errors={errors} path="email"/>

      <TextField placeholder="Password" value={form.password} type={showPass ? "text" : "password"}
      onChange={e => changeForm({...form,password: e.target.value})}
       InputProps={{
       className: errors.filter((x: any) => x.path === 'password').length > 0 ? "login-imput-error" : "login-imput",
        startAdornment: (
        <InputAdornment position="start">
          <LockIcon style={{fontSize: '15px', color: '#656'}}/>
        </InputAdornment>
        ),
        endAdornment: (
        <InputAdornment position="start" style={{cursor: 'pointer'}} onClick={() => changeShowPass(!showPass)}>
          <VisibilityIcon style={{fontSize: '15px', color: '#656'}}/>
        </InputAdornment>
        ),
        disableUnderline: true
      }}/>
      <YupError errors={errors} path="password"/>

      <Button title="Login" onClick={() => loginUser()} variant="contained" 
      style={{margin: '10px', backgroundColor: '#0cafe5', color: '#fff'}}>{
        snackBar.loading ? <CircularProgress style={{color: '#fff'}} size={24}/> : "Login"
    }</Button>

      <Typography variant="subtitle2" style={{margin: '10px', color: '#b3b3b3'}}>New Here ? 
        <Link href="/register"><span style={{color: '#656', cursor: 'pointer'}}> Register !</span></Link>
      </Typography>

      <Typography variant="subtitle1" style={{margin: '10px'}}>Login With</Typography>
      <div style={{display: 'inline-block'}}>
      {socialLinks.slice(0,3).map(x => <SocialIcon url={x} key={x} style={{width: '30px', height: '30px', margin: '5px'}} /> )}
      </div>

       <SnackBarSuccess snackBarOpen={snackBar.success} changeSnackBarOpen={() => changeSnackBar({...snackBar, success: false})} message="Successfully logged-in !"/>

      <SnackBarFailed snackBarOpen={snackBar.error} changeSnackBarOpen={() => changeSnackBar({...snackBar, error: false})} message={"Failed to login"}/>
    </Grid>
  )
}

export default LoginForm;
