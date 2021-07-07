import { Grid, Typography, TextField, Button } from '@material-ui/core';
import ColoredLine from '../../constants/ColoredLine';
import Rating from '@material-ui/lab/Rating';
import React from 'react';


const AddPhoneReview = ({ref} : {ref: React.MutableRefObject<null>}) => {
    const [value,setValue] = React.useState(0);
    const [message,changeMessage] = React.useState('');

    return ( 
        <Grid 
        ref={ref}
        className="phone-details" style={{display: 'flex', flexDirection: 'column'}} container>
            <Typography variant="h6" style={{margin: '10px', marginLeft: '50px',
        color: '#0cafe5'}}>Add a Review</Typography>
        <ColoredLine color="#eee"/>
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
        <Button variant="contained" 
        style={{backgroundColor: '#0cafe5', color: '#fff',
        width: '100px', margin: '20px'}}>Submit</Button>
        </Grid>
    )
}

export default AddPhoneReview;