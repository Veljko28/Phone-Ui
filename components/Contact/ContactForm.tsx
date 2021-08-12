import React from 'react';
import * as yup from 'yup';
import {useRouter} from 'next/router';
import YupError from '../../constants/YupError';
import ColoredLine from '../../constants/ColoredLine';
import {fetchPost} from '../../constants/CustomFetching';
import { formatYupError } from '../../constants/formYupError';
import { Grid, Typography,InputAdornment, Button, TextField, CircularProgress } from '@material-ui/core';
import {SnackBarSuccess, SnackBarFailed} from '../../constants/CustomSnackBars';


import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import CreateIcon from '@material-ui/icons/Create';


const ContactForm = () => {

  const router = useRouter();

  const [form, changeForm] = React.useState({
    email: '',
    name: '',
    subject: '',
    message: ''
  })

  const [snackBar, changeSnackbarOpen] = React.useState({
    success: false,
    error: false,
    loading: false
  });
  const [errors,changeErrors] = React.useState([]);


  const yupSchema = yup.object().shape({
    email: yup.string().min(10).email(),
    name: yup.string().min(3),
    subject: yup.string().min(10),
    message: yup.string().min(25).max(256)
  });



  const onSubmit = async () => {
    changeSnackbarOpen({...snackBar, loading: true});

    try {
      await yupSchema.validate(form, {abortEarly: false});
      changeErrors([]);

      const res = await fetchPost('http://localhost:10025/api/v1/generic/contact', form);
  
      if(res && (res as Response).ok){
          changeSnackbarOpen({...snackBar, success: true, loading: false});
          setTimeout(() => {
            router.push('/');
          }, 1200)
      }
      else changeSnackbarOpen({...snackBar, error: true, loading: false});
    }
    catch (err){
      changeErrors(formatYupError(err) as any);
    }

  }

  return (
    <Grid container className="contact-tab">
      <Typography variant="h6" style={{margin: '10px'}}>Contact Us</Typography>
      <ColoredLine color="#eee"/>


       <TextField placeholder="Your Name" value={form.name} 
      onChange={e => changeForm({...form,name: e.target.value})}
        InputProps={{
          className: errors.filter((x: any) => x.path === 'name').length > 0 ? "login-imput-error" : "login-imput",
        startAdornment: (
          <InputAdornment position="start">
          <PersonIcon style={{fontSize: '15px', color: '#656'}}/>
        </InputAdornment>
        ),
        disableUnderline: true
      }}/>
      <YupError errors={errors} path="name"/>


      <TextField placeholder="Enter Your Email Address" value={form.email}
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


      <TextField placeholder="Subject" value={form.subject}
      onChange={e => changeForm({...form,subject: e.target.value})}
      InputProps={{
        className: errors.filter((x: any) => x.path === 'subject').length > 0 ? "login-imput-error" : "login-imput",
        startAdornment: (
        <InputAdornment position="start">
          <CreateIcon style={{fontSize: '15px', color: '#656'}}/>
        </InputAdornment>
        ),
        disableUnderline: true
      }}/>
      <YupError errors={errors} path="subject"/>


      <TextField placeholder="Message" value={form.message} rows="3" multiline={true}
      onChange={e => changeForm({...form,message: e.target.value})}
      InputProps={{
        className: errors.filter((x: any) => x.path === 'message').length > 0 ? "login-imput-error" : "login-imput",
        style: {padding: "10px"},
        disableUnderline: true
      }}/>
      <YupError errors={errors} path="message"/>

      <Button title="Contact"
      onClick={() => onSubmit()}
      variant="contained" style={{margin: '10px', backgroundColor: '#0cafe5', color: '#fff'}}>
        {
        snackBar.loading ? <CircularProgress style={{color: '#fff'}} size={24}/> : "Submit"
       }
      </Button>
   
  <SnackBarSuccess snackBarOpen={snackBar.success} changeSnackBarOpen={() => changeSnackbarOpen({...snackBar,success: false})} message="Successfully sent your message !"/>

 <SnackBarFailed snackBarOpen={snackBar.error} changeSnackBarOpen={() => changeSnackbarOpen({...snackBar,error: false})} message={"Failed to send your message!"}/>

    </Grid>
  )
}

export default ContactForm;