import React from 'react';
import { useRouter } from 'next/router';
import { Grid, Typography, TextField, InputAdornment,
     Button} from '@material-ui/core';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import ImageIcon from '@material-ui/icons/Image';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import TitleChange from '../../constants/TitleChange';
import {SnackBarSuccess, SnackBarFailed} from '../../constants/CustomSnackBars';
import { fetchPostBid, fetchPostForm } from '../../constants/CustomFetching';



const AddBid = () => {

    const router = useRouter();

    const [currentImage,changeCurrentImage] = React.useState('');
    const [imageBlobs, changeImageBlob] = React.useState([]);
    const [files,changeFiles] = React.useState([]);

    const d = new Date();

    const m = d.getMonth()+1;
    const h = d.getHours();
    const min = d.getMinutes();

    const datestring = d.getFullYear()  + "-" + (m < 10 ? `0${m}` : m) + "-" 
    + d.getDate() + "T" + (h < 10 ? `0${h}` : h) + ":" + (min < 10 ? `0${min}` : min);


    const [formInfo,changeFormInfo] = React.useState({
        name: "",
        description: "",
        price: 0,
        category: "",
        brand: "",
        seller: "7953981b-8594-4299-b828-9386cdef9ec8",
        timeCreated: datestring,
        timeEnds: ""
    });

    const [snackbar, changeSnackbarOpen] = React.useState(false);
    const [error, changeError] = React.useState(false);

    const inputRef = React.useRef(null);
    
    const uploadFile = (e: any) => {
        if (e.target.files[0] === null || e.target.files[0] === undefined) return;

        
        const file = e.target.files[0];
        const blob = URL.createObjectURL(file);
        const list = imageBlobs as any;

        list.push(blob);
        
        let filesCopy = files as any;
        filesCopy.push(file);
        changeFiles(filesCopy);

        changeImageBlob(list);
        changeCurrentImage(blob);

        // console.log(imageBlobs);
        // console.log(file);
        // console.log(URL.createObjectURL(file));
    }

    const removeCurrentImage = () => {
        let list = imageBlobs as any;
        list = list.filter((x: string) => x !== currentImage);
        
        let idx = imageBlobs.length-1;

        for (let i = 0;i<list.length;i++){
            if (list[i] != imageBlobs[i]){
                idx = i;
                break;
            }
        }

        let filesCopy = files as any;
        filesCopy.splice(idx);
        changeFiles(filesCopy);
        
        changeImageBlob(list);
        if (list.length > 0) {
            changeCurrentImage(list[0]);
        }
        else changeCurrentImage('');
    }

    const addPhoneApi = async () => {
        // const phoneId = "1b3a55d9-d82a-42bf-910b-ee19e71496a4"; 

        // Sending Phone Info
        const bid_Id = await fetchPostBid('http://localhost:10025/api/v1/bid/add/', formInfo);

        console.log(bid_Id);
        if (!bid_Id) {
            changeError(true);
            return;
        }

        // Sending Image
        const ok = await fetchPostForm('http://localhost:10025/api/v1/generic/phone/image', files, 1, bid_Id);

       if (ok && bid_Id) {
         changeSnackbarOpen(true);
         setTimeout(() => {
            router.push(`/bid/${bid_Id}`)
         }, 3000)
       }
       else changeError(true);
    }

    return (
        <Grid container style={{backgroundColor: '#fff', paddingBottom: 200, paddingTop: 50}}>
          <TitleChange title={`MobiStore - Bid Add`} />
            <Grid item lg={2}/>

            <Grid item sm={12} md={6} lg={4}>

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
                    {imageBlobs.map(x => (
                        <div className="other-image" key={x} style={{margin: 10, marginLeft: 0}} onClick={() => changeCurrentImage(x)}>
                            <img src={x} width="65px"
                            height="65px" />
                        </div>
                    ))}
                    {imageBlobs.length === 3 ? null : (
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

            <Grid item sm={12} md={6} lg={4}>
                <Typography variant="h4"  
                style={{color: '#0cafe5', marginTop: 10, marginLeft: 10}}>Add Bid</Typography>
                
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

                 <Grid container item xs={12} style={{marginTop: 15}}>
                    <Grid xs={6} item>
                        <TextField
                        label="Start Date"
                        type="datetime-local"
                        disabled
                        fullWidth 
                        value={formInfo.timeCreated}
                        InputProps={{
                            className: "money-imput",
                            disableUnderline: true
                        }}/>
                    </Grid>
                    <Grid xs={6} item>
                    <TextField
                        fullWidth
                        label="End Date"
                        type="datetime-local"
                        InputProps={{
                            className: "money-imput",
                            disableUnderline: true
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={formInfo.timeEnds}
                        onChange={e => {
                            let time = e.target.value;
                            const added = new Date(time);
                            const now = new Date(formInfo.timeCreated);

                            if (added < now){
                                time = formInfo.timeCreated;
                            }

                            changeFormInfo({...formInfo, timeEnds: time})
                        }}
                    />
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
                style={{backgroundColor: '#0cafe5', color: '#fff'}}
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

            <Grid item lg={2}/>
            
            <SnackBarSuccess snackBarOpen={snackbar} changeSnackBarOpen={() => changeSnackbarOpen(false)} message="Successfully added your bid !"/>

            <SnackBarFailed snackBarOpen={error} changeSnackBarOpen={() => changeError(false)} message={"Failed to add your bid !"}/>

        </Grid>
    )
}

export default AddBid;