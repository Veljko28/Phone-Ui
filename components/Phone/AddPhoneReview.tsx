import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { Grid, Typography, TextField, Button, CircularProgress } from '@material-ui/core';

import ColoredLine from '../../constants/ColoredLine';
import { fetchPost } from '../../constants/CustomFetching';
import { SnackBarFailed, SnackBarSuccess } from '../../constants/CustomSnackBars';
import { blue, gray, white } from '../../constants/CustomColors';


const AddPhoneReview = ({phoneId} : {phoneId: string}) => {
    const [value,setValue] = React.useState(0);
    const [message,changeMessage] = React.useState('');
    const [snackBar, changeSnackBar] = React.useState({
      success: false,
      error: false,
      loading: false
    })
        
    const onSubmit = async () => {
      changeSnackBar({...snackBar, loading: true});

      const userId = localStorage.getItem('userId');

      const res = await fetchPost(`http://localhost:10025/api/v1/generic/review`, {userId,phoneId,message, rating: value} );

      if (res.ok) {
        changeSnackBar({...snackBar, success: true, loading: false});
        setTimeout(() =>  location.reload(), 1500);
      }
      else changeSnackBar({...snackBar, error: true, loading: false});
    }

    return ( 
        <Grid 
        className="phone-details" style={{display: 'flex', flexDirection: 'column'}} container>
            <Typography variant="h6" style={{margin: '10px', marginLeft: '40px',
        color: blue}}>Add a Review</Typography>
        <ColoredLine color={gray}/>
        <div style={{margin: '20px'}}>
        <Typography style={{display: 'inline-block', 
        marginRight: '15px', marginLeft: '5px', paddingBottom: '10px'}}>Your Rating: </Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue: any) => {
            setValue(newValue);
          }}
          style={{display: 'inline-block', fontSize: '20px'}}
        />
        </div>
        <TextField placeholder="Message" value={message} rows="3" multiline={true} 
      onChange={e => changeMessage(e.target.value)}
      InputProps={{
        className: "review-message-imput", style: {padding: "10px"},
        disableUnderline: true
        }}/>
        <Button variant="contained" onClick={() => onSubmit()}
        style={{backgroundColor: blue, color: white,
        width: '100px', margin: '20px'}}>{
        snackBar.loading ? <CircularProgress style={{color: white}} size={24}/> : "Submit"
        }</Button>


        
      <SnackBarSuccess snackBarOpen={snackBar.success} changeSnackBarOpen={() => changeSnackBar({...snackBar, success: false})} message="Successfully added your review !"/>

      <SnackBarFailed snackBarOpen={snackBar.error} changeSnackBarOpen={() => changeSnackBar({...snackBar, error: false})} message={"Failed to add your review. Try again later"}/>

        </Grid>
    )
}

export default AddPhoneReview;