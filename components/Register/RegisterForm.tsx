import React from 'react';
import Link from 'next/link';
import * as yup from 'yup';

import { Grid, Typography,InputAdornment, Button, TextField, CircularProgress } from '@material-ui/core';
import { SocialIcon } from 'react-social-icons';
import socialLinks from '../../constants/SocialLinks';
import ColoredLine from '../../constants/ColoredLine';

import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';

import LockIcon from '@material-ui/icons/Lock';
import LockOpenTwoToneIcon from '@material-ui/icons/LockOpenTwoTone';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { fetchPost } from '../../constants/CustomFetching';
import { SnackBarFailed, SnackBarSuccess } from '../../constants/CustomSnackBars';
import { formatYupError } from '../../constants/formYupError';
import YupError from '../../constants/YupError';
import { useRouter } from 'next/router';
import { blue, gray, white } from '../../constants/CustomColors';


const RegisterForm = () => {

  const router = useRouter();

  const [form,changeForm] = React.useState({
    email: '',
    userName: '',
    password: '',
    confirm_Password: ''
  })
  const [showPass,changeShowPass] = React.useState(false);
  const [errors,changeErrors] = React.useState([]);

  const [snackBar,changeSnackBar] = React.useState({
    error: false,
    success: false,
    loading: false
  })

  const yupSchema = yup.object().shape({
    email: yup.string().min(10).max(255).email(),
    userName: yup.string().min(5).max(150),
    password: yup.string().min(7).max(255),
    confirm_Password: yup.string().min(7).max(255)
  })

  const sendRegister = async () => {

    
    try {
      await yupSchema.validate(form, {abortEarly: false});
      if (form.password !== form.confirm_Password) {
        return;
      }
    }
    catch (err) {
      changeErrors((formatYupError(err) as any));
      return;
    }
    
    changeSnackBar({...snackBar,loading: true});
    const res = await fetchPost('http://localhost:10025/api/v1/users/register', form);
    
    if (res.ok){
      changeSnackBar({...snackBar, success: true, loading: false});
      setTimeout(() => router.push('/login'), 1500);
    }
    else changeSnackBar({...snackBar, error: true, loading: false});
  }

  return (
    <>
    <Grid container className="register-tab">
      <Typography variant="h6" style={{margin: '10px'}}>Register</Typography>
      <ColoredLine color={gray}/>

      <TextField placeholder="Email" value={form.email} 
      onChange={e => changeForm({...form,email: e.target.value})}
       InputProps={{
        className: errors.filter((x: any) => x.path === 'email').length > 0 ? "login-imput-error" : "login-imput",
        startAdornment: (
        <InputAdornment position="start">
          <EmailIcon style={{fontSize: '15px', color: '#656'}}/>
        </InputAdornment>
        ),
        disableUnderline: true
      }}/>
      <YupError errors={errors} path="email"/>

       <TextField placeholder="Username"  value={form.userName} 
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
      <YupError errors={errors} path="userName"/>

      <TextField placeholder="Password" type={showPass ? "text" : "password"}
      value={form.password} onChange={e => changeForm({...form,password: e.target.value})}
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


      <TextField placeholder="Confirm Password"  type={showPass ? "text" : "password"}
      value={form.confirm_Password} onChange={e => changeForm({...form,confirm_Password: e.target.value})}
       InputProps={{
        className: errors.filter((x: any) => x.path === 'confirm_Password').length > 0 ? "login-imput-error" : "login-imput",
        startAdornment: (
        <InputAdornment position="start">
          <LockOpenTwoToneIcon style={{fontSize: '15px', color: '#656'}}/>
        </InputAdornment>
        ),
        disableUnderline: true
      }}/>
      <YupError errors={errors} path="confirm_Password"/>


      <Button title="Register" variant="contained" 
        onClick={() => sendRegister()}
      style={{margin: '10px', backgroundColor: blue, color: white}}>{
        snackBar.loading ? <CircularProgress style={{color: white}} size={24}/> : "Register"
    }</Button>

      <Typography variant="subtitle2" style={{margin: '10px', color: '#b3b3b3'}}>Already Have An Account ?
        <Link href="/login"><span style={{color: '#656', cursor: 'pointer'}}> Login !</span></Link>
      </Typography>

      <Typography variant="subtitle1" style={{margin: '10px'}}>Register With</Typography>
      <div style={{display: 'inline-block'}}>
      {socialLinks.slice(0,3).map(x => <SocialIcon url={x} key={x} style={{width: '30px', height: '30px', margin: '5px'}} /> )}
      </div>


      <SnackBarSuccess snackBarOpen={snackBar.success} changeSnackBarOpen={() => changeSnackBar({...snackBar, success: false})} message="Successfully registered !"/>

      <SnackBarFailed snackBarOpen={snackBar.error} changeSnackBarOpen={() => changeSnackBar({...snackBar, error: false})} message={"Failed to register"}/>
    </Grid> 
    
    </>
  )
}

export default RegisterForm;