import React from 'react';
import { Grid, Typography, TextField, InputAdornment,
     Button} from '@material-ui/core';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import ImageIcon from '@material-ui/icons/Image';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import TitleChange from '../../constants/TitleChange';
import {SnackBarSuccess, SnackBarFailed} from '../../constants/CustomSnackBars';
import { fetchPost } from '../../constants/CustomFetching';



const AddPhone = () => {

    const [currentImage,changeCurrentImage] = React.useState('');
    const [files, changeFiles] = React.useState([]);

    const [formInfo,changeFormInfo] = React.useState({
        name: "",
        description: "",
        price: 0,
        category: "",
        brand: "",
    });

    const [snackbar, changeSnackbarOpen] = React.useState(false);
    const [error, changeError] = React.useState(false);

    const inputRef = React.useRef(null);
    
    const uploadFile = (e: any) => {
        if (e.target.files[0] === null || e.target.files[0] === undefined) return;

        const file = e.target.files[0];
        const blob = URL.createObjectURL(file);
        const list = files as any;
        list.push(blob);
        changeFiles(list);
        changeCurrentImage(blob);
        console.log(files);
        console.log(file);
        console.log(URL.createObjectURL(file));
    }

    const removeCurrentImage = () => {
        let list = files as any;
        list = list.filter((x: string) => x !== currentImage);
        changeFiles(list);
        if (list.length > 0) {
            changeCurrentImage(list[0]);
        }
        else changeCurrentImage('');
    }

    const addPhoneApi = async () => {
        // for testing only
        const userId = "7953981b-8594-4299-b828-9386cdef9ec8"
        console.log(formInfo);
        const ok = await fetchPost('http://localhost:10025/api/v1/phones/add/' + userId, formInfo);

       if (ok) {
         changeSnackbarOpen(true);
       }
       else changeError(true);
    }


    return (
        <Grid container style={{backgroundColor: '#fff', paddingBottom: 100}}>
          <TitleChange title={`MobiStore - Phone Add`} />
            <Grid item xs={2}/>

            <Grid item xs={4}>

                <Grid item>
                    {currentImage === '' ? (
                        <div className="display-image-none" onClick={() => (inputRef as any).current.click()}>
                           <ImageSearchIcon style={{fontSize: 300, color: '#0cafe5'}}/> 
                        </div>
                    ) : (
                        <div className="display-image">
                            <img src={currentImage} 
                            className="active-image"/>
                        </div>
                    )}
                </Grid>

                <Grid item style={{display: 'flex', margin: 20, marginTop: 0}}>
                    {files.map(x => (
                        <div className="other-image" style={{margin: 10, marginLeft: 0}} onClick={() => changeCurrentImage(x)}>
                            <img src={x} width="65px"
                            height="65px" />
                        </div>
                    ))}
                    {files.length === 3 ? null : (
                        <div className="other-image" style={{margin: 10, marginLeft: 0}}>
                            <input type="file" accept="image/*" onChange={(e: any) => uploadFile(e)} ref={inputRef} style={{display: 'none'}}/>
                            <button onClick={() => (inputRef as any).current.click()}
                            className="add-another">
                            <ImageIcon style={{fontSize: 35, color: '#0cafe5'}}/> Add Picture
                            </button>
                        </div>
                    )}
                </Grid>
                {currentImage === '' ? null : (
                    <button className="remove-image-button" onClick={() => removeCurrentImage()}>
                            <ClearIcon style={{fontSize: 18, margin: 2}}/>
                            Remove Current Image
                    </button>
                )}
                    
            </Grid>

            <Grid item xs={4}>
                <Typography variant="h4"  
                style={{color: '#0cafe5', marginTop: 10, marginLeft: 10}}>Add Phone</Typography>
                
                <Grid container item xs={12} style={{marginTop: 15}}>
                    <Grid xs={6} item>
                        <TextField type="text" placeholder="Name" fullWidth 
                        onChange={(e: any) => changeFormInfo({...formInfo,name: e.target.value})} value={formInfo.name}
                        InputProps={{
                            className: "money-imput",
                            disableUnderline: true
                        }}/>
                    </Grid>
                    <Grid xs={6} item>
                    <TextField placeholder="Price" type="number" fullWidth
                     onChange={(e: any) => changeFormInfo({...formInfo,price: parseInt(e.target.value)})} value={formInfo.price}
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
                        <select name="category" 
                        onChange={e => changeFormInfo({...formInfo,category: e.target.value})} value={formInfo.category}
                        className="money-select">
                            <option value="" hidden>Category</option>
                            <option value="android">Android Phone</option>
                            <option value="ios">IOS Phone</option>
                            <option value="other">Other</option>
                        </select>
                    </Grid>
                    <Grid xs={6} item>
                    <select name="brand"
                    onChange={e => changeFormInfo({...formInfo,brand: e.target.value})} value={formInfo.brand}
                    className="money-select">
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
                    onChange={e => changeFormInfo({...formInfo,description: e.target.value})} value={formInfo.description}
                    InputProps={{
                        className: "money-desc",
                        style: {padding: 10},
                        disableUnderline: true
                }}/>

                <Button variant="contained" 
                style={{backgroundColor: '#0cafe5', color: '#fff', margin: 10}}
                onClick={() => addPhoneApi()}>
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
            
            {SnackBarSuccess(snackbar,changeSnackbarOpen,"Successfully added your phone !")}
            {SnackBarFailed(error,changeError,"Failed to add your phone !")}

        </Grid>
    )
}

export default AddPhone;