import React from 'react';
import { Grid, Typography,InputAdornment, Button, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import ColoredLine from '../../constants/ColoredLine';

import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';

import CreateIcon from '@material-ui/icons/Create';
import { changeContactEmailRedux, changeContactMessageRedux, changeContactNameRedux, changeContactSubjectRedux } from '../../redux/actions/contactActions';


const ContactForm = () => {

  const [email,changeEmail] = React.useState('');
  const [userName,changeUserName] = React.useState('');
  const [subject,changeSubject] = React.useState('');
  const [message,changeMessage] = React.useState('');


  const dispatch = useDispatch();

  return (
    <Grid container className="contact-tab">
      <Typography variant="h6" style={{margin: '10px'}}>Contact Us</Typography>
      <ColoredLine color="#eee"/>


       <TextField placeholder="Your Name" value={userName} 
      onChange={e => changeUserName(e.target.value)}
      onBlur={() => dispatch(changeContactNameRedux(userName))} InputProps={{
        className: "login-imput",
        startAdornment: (
          <InputAdornment position="start">
          <PersonIcon style={{fontSize: '15px', color: '#656'}}/>
        </InputAdornment>
        ),
        disableUnderline: true
      }}/>

      <TextField placeholder="Enter Your Email Address" value={email} 
      onChange={e => changeEmail(e.target.value)}
      onBlur={() => dispatch(changeContactEmailRedux(email))} InputProps={{
        className: "login-imput",
        startAdornment: (
        <InputAdornment position="start">
          <EmailIcon style={{fontSize: '15px', color: '#656'}}/>
        </InputAdornment>
        ),
        disableUnderline: true
      }}/>

      <TextField placeholder="Subject" value={subject} 
      onChange={e => changeSubject(e.target.value)}
      onBlur={() => dispatch(changeContactSubjectRedux(subject))}  InputProps={{
        className: "login-imput",
        startAdornment: (
        <InputAdornment position="start">
          <CreateIcon style={{fontSize: '15px', color: '#656'}}/>
        </InputAdornment>
        ),
        disableUnderline: true
      }}/>

      <TextField placeholder="Message" value={message} rows="3" multiline={true} 
      onChange={e => changeMessage(e.target.value)}
      onBlur={() => dispatch(changeContactMessageRedux(message))}  InputProps={{
        className: "login-imput", style: {padding: "10px"},
        disableUnderline: true
      }}/>


      <Button title="Register" variant="contained" style={{margin: '10px', backgroundColor: '#0cafe5', color: '#fff'}}>Submit</Button>
    </Grid>
  )
}

export default ContactForm;