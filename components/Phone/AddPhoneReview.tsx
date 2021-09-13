import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { Grid, Typography, TextField, Button, CircularProgress } from '@material-ui/core';

import ColoredLine from '../../constants/ColoredLine';
import { fetchPatch, fetchPost } from '../../constants/CustomFetching';
import { SnackBarFailed, SnackBarSuccess } from '../../constants/CustomSnackBars';
import { blue, gray, white, darker_green } from '../../constants/CustomColors';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';


const AddPhoneReview = ({sellerId, phoneId, t} : {sellerId: string, phoneId: string, t: any}) => {
    const [value,setValue] = React.useState(0);
    const [message,changeMessage] = React.useState('');
    const [snackBar, changeSnackBar] = React.useState({
      success: false,
      error: false,
      loading: false
    })
    const darkMode = useSelector((state: State) => state.userInfo.darkMode);
        
    const onSubmit = async () => {
      changeSnackBar({...snackBar, loading: true});

      const userId = localStorage.getItem('userId');

      const res = await fetchPost(`http://localhost:10025/api/v1/reviews/add`, {
        rating: value, buyerId: userId, sellerId, message, phoneId
      });

      if (res.ok) {
        await fetchPatch(`http://localhost:10025/api/v1/users/rating/${sellerId}`, {});
        changeSnackBar({...snackBar, success: true, loading: false});
        setTimeout(() =>  location.reload(), 1500);
      }
      else changeSnackBar({...snackBar, error: true, loading: false});
    }

    return ( 
        <Grid 
        className={darkMode ? "phone-details-dark" : "phone-details"} style={{display: 'flex', flexDirection: 'column'}} container>
            <Typography variant="h6" style={{margin: '10px', marginLeft: '40px',
        color: darkMode ? darker_green : blue}}>{t("addReview.title")}</Typography>
        <ColoredLine color={gray}/>
        <div style={{margin: '20px'}}>
        <Typography style={{display: 'inline-block', 
        marginRight: '15px', marginLeft: '5px', marginBottom: 10, color: darkMode ? gray : 'black'}}>{t("addReview.rating")}</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue: any) => {
            setValue(newValue);
          }}
          style={{display: 'inline-block', fontSize: '20px'}}
        />
        </div>
        <TextField placeholder={t("contact.input4")} value={message} rows="3" multiline={true} 
      onChange={e => changeMessage(e.target.value)}
      InputProps={{
        className: "review-message-imput", style: {padding: "10px"},
        disableUnderline: true
        }}/>
        <Button variant="contained" onClick={() => onSubmit()}
        style={{backgroundColor: darkMode ? darker_green : blue, color: white,
        width: '100px', margin: '20px'}}>{
        snackBar.loading ? <CircularProgress style={{color: white}} size={24}/> : t("add.submit")
        }</Button>


        
      <SnackBarSuccess snackBarOpen={snackBar.success} changeSnackBarOpen={() => changeSnackBar({...snackBar, success: false})} message={t("addReview.success")}/>

      <SnackBarFailed snackBarOpen={snackBar.error} changeSnackBarOpen={() => changeSnackBar({...snackBar, error: false})} message={t("addReview.failed")}/>

        </Grid>
    )
}

export default AddPhoneReview;