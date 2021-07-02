import React from 'react';
import Link from 'next/link';
import { Grid, Typography, TextField, InputAdornment, Button} from '@material-ui/core';

import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityIcon from '@material-ui/icons/Visibility';

import socialLinks from '../../constants/SocialLinks';
import { SocialIcon } from 'react-social-icons';
import { useDispatch } from 'react-redux';
import { inputEmailUsername, inputPassword } from '../../redux/actions/loginActions';
import ColoredLine from '../../constants/ColoredLine';


const LoginForm = () => {

  const [email,changeEmail] = React.useState('');
  const [password,changePassword] = React.useState('');

  const [showPass,changeShowPass] = React.useState(false);

  const dispatch = useDispatch();

  return (
    <Grid container className="login-tab">
      <Typography variant="h6" style={{margin: '10px'}}>Login</Typography>
      <ColoredLine color="#eee"/>


      <TextField placeholder="Email / Username" value={email} 
      onChange={e => changeEmail(e.target.value)}
      onBlur={() => dispatch(inputEmailUsername(email))} InputProps={{
        className: "login-imput",
        startAdornment: (
        <InputAdornment position="start">
          <PersonIcon style={{fontSize: '15px', color: '#656'}}/>
        </InputAdornment>
        ),
        disableUnderline: true
      }}/>

      <TextField placeholder="Password" value={password} type={showPass ? "text" : "password"}
      onChange={e => changePassword(e.target.value)}
      onBlur={() => dispatch(inputPassword(password))}  InputProps={{
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

      <Button title="Login" variant="contained" style={{margin: '10px', backgroundColor: '#0cafe5', color: '#fff'}}>Login</Button>

      <Typography variant="subtitle2" style={{margin: '10px', color: '#b3b3b3'}}>New Here ? 
        <Link href="/register"><span style={{color: '#656', cursor: 'pointer'}}> Register !</span></Link>
      </Typography>

      <Typography variant="subtitle1" style={{margin: '10px'}}>Login With</Typography>
      <div style={{display: 'inline-block'}}>
      {socialLinks.slice(0,3).map(x => <SocialIcon url={x} style={{width: '30px', height: '30px', margin: '5px'}} /> )}
      </div>
    </Grid>
  )
}

export default LoginForm;
