import React from 'react';
import { Grid, Typography, TextField, InputAdornment,
     Button} from '@material-ui/core';
import Image from 'next/image';
import ImageIcon from '@material-ui/icons/Image';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';


const AddPhone = () => {

    const [currentImage,changeCurrentImage] = React.useState('/phone.jpg');

    const inputRef = React.useRef(null);

    return (
        <Grid container style={{backgroundColor: '#fff'}}>
            <Grid item xs={2}/>

            <Grid item xs={4}>

                <Grid item>
                    <div className="display-image">
                        <Image src={currentImage} width="325px" height="325px" 
                        className="active-image"/>
                    </div>
                </Grid>

                <Grid item style={{display: 'flex', margin: 20, marginTop: 0}}>
                    <div className="other-image" style={{margin: 10, marginLeft: 0}}>
                        <Image src={currentImage} width="65px"
                         height="65px" />
                    </div>
                    <div className="other-image" style={{margin: 10}}>
                        <input type="file" ref={inputRef} style={{display: 'none'}}/>
                        <button onClick={() => (inputRef as any).current.click()}
                        className="add-another">
                           <ImageIcon style={{fontSize: 50, color: '#0cafe5'}}/> Add Picture
                        </button>
                    </div>
                </Grid>
            </Grid>

            <Grid item xs={4}>
                <Typography variant="h4" 
                style={{color: '#0cafe5', marginTop: 10, marginLeft: 10}}>Add Phone</Typography>
                
                <Grid container item xs={12} style={{marginTop: 15}}>
                    <Grid xs={6} item>
                        <TextField type="text" placeholder="Name"
                        InputProps={{
                            className: "money-imput",
                            disableUnderline: true
                        }}/>
                    </Grid>
                    <Grid xs={6} item>
                    <TextField placeholder="Price" type="number"
                   InputProps={{
                        className: "money-imput",
                        endAdornment: (
                        <InputAdornment position="start">
                            <AttachMoneyIcon style={{fontSize: '18px', color: '#656'}}/>
                        </InputAdornment>
                        ),
                        disableUnderline: true
                    }}/>
                    </Grid>
                </Grid>


                <Grid container item xs={12}>
                    <Grid xs={6} item>
                        <select name="category" value="" className="money-select">
                            <option value="" hidden>Category</option>
                            <option value="android">Android Phone</option>
                            <option value="ios">IOS Phone</option>
                            <option value="other">Other</option>
                        </select>
                    </Grid>
                    <Grid xs={6} item>
                    <select name="brand" value="" className="money-select">
                            <option value="" hidden>Brand</option>
                            <option value="google">Google</option>
                            <option value="apple">Apple</option>
                            <option value="sams">Samsung</option>
                            <option value="htc">Htc</option>
                            <option value="alc">Alcatel</option>
                        </select>
                    </Grid>

                </Grid>

                <TextField placeholder="Description" rows="3" multiline={true} fullWidth
                    InputProps={{
                        className: "money-desc",
                        style: {padding: 10},
                        disableUnderline: true
                }}/>

                <Button variant="contained" 
                style={{backgroundColor: '#0cafe5', color: '#fff', margin: 10}}>
                    <CheckIcon style={{fontSize: 20, margin: 2}}/>
                    Submit
                </Button>

                <Button variant="contained" 
                style={{backgroundColor: 'red', color: '#fff', margin: 10}}>
                    <ClearIcon style={{fontSize: 20, margin: 2}}/>
                    Cancel
                </Button>

            </Grid>

            <Grid item xs={2}/>

        </Grid>
    )
}

export default AddPhone;