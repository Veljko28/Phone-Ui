import React from 'react';
import Link from 'next/link';

import { Grid, Typography,InputAdornment, Button, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { SocialIcon } from 'react-social-icons';
import { changeConfirmPasswordRedux, changeEmailRedux, changePasswordRedux, changeUserNameRedux } from '../../redux/actions/registerActions';
import socialLinks from '../../constants/SocialLinks';
import ColoredLine from '../../constants/ColoredLine';

import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';

import LockIcon from '@material-ui/icons/Lock';
import LockOpenTwoToneIcon from '@material-ui/icons/LockOpenTwoTone';
import VisibilityIcon from '@material-ui/icons/Visibility';


const RegisterForm = () => {

  const [email,changeEmail] = React.useState('');
  const [userName,changeUserName] = React.useState('');
  const [password,changePassword] = React.useState('');
  const [confirm_Password,changeConfirmPassword] = React.useState('');

  const [showPass,changeShowPass] = React.useState(false);

  const dispatch = useDispatch();

  const sendRegister =  () => {

      const payload = {
        email, userName, password, confirm_Password
      };

      // console.log(payload);


    fetch('http://localhost:10025/hello', {
      mode: "no-cors",
      method: 'GET',
      // body: JSON.stringify(payload)
    }).then(res => {
      console.log(res);
    })
  }

  return (
    <Grid container className="register-tab">
      <Typography variant="h6" style={{margin: '10px'}}>Register</Typography>
      <ColoredLine color="#eee"/>

      <TextField placeholder="Email" value={email} 
      onChange={e => changeEmail(e.target.value)}
      onBlur={() => dispatch(changeEmailRedux(email))} InputProps={{
        className: "login-imput",
        startAdornment: (
        <InputAdornment position="start">
          <EmailIcon style={{fontSize: '15px', color: '#656'}}/>
        </InputAdornment>
        ),
        disableUnderline: true
      }}/>

       <TextField placeholder="Username" value={userName} 
      onChange={e => changeUserName(e.target.value)}
      onBlur={() => dispatch(changeUserNameRedux(userName))} InputProps={{
        className: "login-imput",
        startAdornment: (
        <InputAdornment position="start">
          <PersonIcon style={{fontSize: '15px', color: '#656'}}/>
        </InputAdornment>
        ),
        disableUnderline: true
      }}/>

      <TextField placeholder="Password" value={password}  type={showPass ? "text" : "password"}
      onChange={e => changePassword(e.target.value)}
      onBlur={() => dispatch(changePasswordRedux(password))}  InputProps={{
        className: "login-imput",
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

      <TextField placeholder="Confirm Password" value={confirm_Password}  type={showPass ? "text" : "password"}
      onChange={e => changeConfirmPassword(e.target.value)}
      onBlur={() => dispatch(changeConfirmPasswordRedux(confirm_Password))}  InputProps={{
        className: "login-imput",
        startAdornment: (
        <InputAdornment position="start">
          <LockOpenTwoToneIcon style={{fontSize: '15px', color: '#656'}}/>
        </InputAdornment>
        ),
        disableUnderline: true
      }}/>


      <Button title="Register" variant="contained" 
        onClick={() => sendRegister()}
      style={{margin: '10px', backgroundColor: '#0cafe5', color: '#fff'}}>Register</Button>

      <Typography variant="subtitle2" style={{margin: '10px', color: '#b3b3b3'}}>Already Have An Account ?
        <Link href="/login"><span style={{color: '#656', cursor: 'pointer'}}> Login !</span></Link>
      </Typography>

      <Typography variant="subtitle1" style={{margin: '10px'}}>Register With</Typography>
      <div style={{display: 'inline-block'}}>
      {socialLinks.slice(0,3).map(x => <SocialIcon url={x} style={{width: '30px', height: '30px', margin: '5px'}} /> )}
      </div>
    </Grid>
  )
}

export default RegisterForm;