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
import { blue, darker_green, gray } from '../../constants/CustomColors';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';
import { useTranslation } from 'react-i18next';


const ContactForm = () => {

  const router = useRouter();

  const darkMode = useSelector((state: State) => state.userInfo.darkMode);
  const { t } = useTranslation();

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
      changeSnackbarOpen({...snackBar, loading: false});
      changeErrors(formatYupError(err as any) as any);
    }

  }

  return (
    <Grid container className={darkMode ? "contact-tab-dark" : "contact-tab"}>
      <Typography variant="h6" style={{margin: '10px'}}>{t("contact.title")}</Typography>
      <ColoredLine color={gray}/>


       <TextField placeholder={t("contact.input1")} value={form.name} 
      onChange={e => changeForm({...form,name: e.target.value})}
        InputProps={{
        className: errors.filter((x: any) => x.path === 'name').length > 0 ?
        darkMode ? "login-imput-error-dark" : "login-imput-error" 
        : 
        darkMode ? "login-imput-dark" : "login-imput",
        startAdornment: (
          <InputAdornment position="start">
          <PersonIcon style={{fontSize: '15px', color: '#656'}}/>
        </InputAdornment>
        ),
        disableUnderline: true
      }}/>
      <YupError errors={errors} path="name"/>


      <TextField placeholder={t("contact.input2")} value={form.email}
      onChange={e => changeForm({...form,email: e.target.value})}
      InputProps={{
        className: errors.filter((x: any) => x.path === 'email').length > 0 ? 
        darkMode ? "login-imput-error-dark" : "login-imput-error" 
        : 
        darkMode ? "login-imput-dark" : "login-imput",
        startAdornment: (
        <InputAdornment position="start">
          <EmailIcon style={{fontSize: '15px', color: '#656'}}/>
        </InputAdornment>
        ),
        disableUnderline: true
      }}/>
      <YupError errors={errors} path="email"/>


      <TextField placeholder={t("contact.input3")} value={form.subject}
      onChange={e => changeForm({...form,subject: e.target.value})}
      InputProps={{
        className: errors.filter((x: any) => x.path === 'subject').length > 0 ? 
        darkMode ? "login-imput-error-dark" : "login-imput-error" 
        : 
        darkMode ? "login-imput-dark" : "login-imput",
        startAdornment: (
        <InputAdornment position="start">
          <CreateIcon style={{fontSize: '15px', color: '#656'}}/>
        </InputAdornment>
        ),
        disableUnderline: true
      }}/>
      <YupError errors={errors} path="subject"/>


      <TextField placeholder={t("contact.input4")} value={form.message} rows="3" multiline={true}
      onChange={e => changeForm({...form,message: e.target.value})}
      InputProps={{
        className: errors.filter((x: any) => x.path === 'message').length > 0 ? 
        darkMode ? "login-imput-error-dark" : "login-imput-error" 
        : 
        darkMode ? "login-imput-dark" : "login-imput",
        style: {padding: "10px"},
        disableUnderline: true
      }}/>
      <YupError errors={errors} path="message"/>

      <Button title={t("contact.button")}
      onClick={() => onSubmit()}
      variant="contained" style={{margin: '10px', backgroundColor: darkMode ? darker_green : blue, color: '#fff'}}>
        {
        snackBar.loading ? <CircularProgress style={{color: '#fff'}} size={24}/> : t("contact.button")
       }
      </Button>
   
  <SnackBarSuccess snackBarOpen={snackBar.success} changeSnackBarOpen={() => changeSnackbarOpen({...snackBar,success: false})} 
  message={t("contact.success")}/>

 <SnackBarFailed snackBarOpen={snackBar.error} changeSnackBarOpen={() => changeSnackbarOpen({...snackBar,error: false})} 
 message={t("contact.error")}/>

    </Grid>
  )
}

export default ContactForm;