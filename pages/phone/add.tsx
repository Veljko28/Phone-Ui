import React from 'react';
import * as yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Grid, Typography, TextField, InputAdornment, Button, CircularProgress} from '@material-ui/core';

import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import ImageIcon from '@material-ui/icons/Image';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import YupError from '../../constants/YupError';
import TitleChange from '../../constants/TitleChange';
import NotLoggedIn from '../../constants/NotLoggedIn';
import { formatYupError } from '../../constants/formYupError';
import {SnackBarSuccess, SnackBarFailed} from '../../constants/CustomSnackBars';
import { fetchPost, fetchPostForm, fetchForm } from '../../constants/CustomFetching';
import { white, blue, red, dark, darker_green, gray, dark_cont } from '../../constants/CustomColors';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';
import { useTranslation } from 'react-i18next';



const AddPhone = () => {

    const router = useRouter();

    const [currentImage,changeCurrentImage] = React.useState('');
    const [imageBlobs, changeImageBlob] = React.useState([]);
    const [files,changeFiles] = React.useState([]);
    const { t } = useTranslation();

    const yupSchema = yup.object().shape({
        name: yup.string().min(5).max(20),
        image: yup.string().min(5),
        description: yup.string().min(25),
        price: yup.number().moreThan(0),
        category: yup.string().min(1, "Please select a category"),
        brand: yup.string().min(1, "Please select a brand")
    });

    let jwt: string | null = null;

    if (typeof window !== 'undefined') {
      jwt = localStorage.getItem('jwt');
    }

    const [formInfo,changeFormInfo] = React.useState({
        name: "",
        image: "",
        description: "",
        price: 0,
        category: "",
        brand: "",
    });

    const [snackbar, changeSnackbarOpen] = React.useState(false);
    const [error, changeError] = React.useState({open: false, message: ""});
    const [yupErrors, changeYupErrors] = React.useState([]);
    const [loading, changeLoading] = React.useState(false);

    const darkMode = useSelector((state: State) => state.userInfo.darkMode);
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
        changeLoading(true);
        const userId = localStorage.getItem('userId');

        const file = files[0];
        if (file == null) {
            changeError({open: true, message: t("add.pls_pict")});
              try {
                await yupSchema.validate(formInfo, {abortEarly: false});
              }
              catch (err) {
                    changeYupErrors(formatYupError(err as any) as any);
              }
            changeLoading(false);
            return;
        }

        const displayPhotoRes = await fetchForm('http://localhost:10025/api/v1/generic/phone/display', file);

        if ((displayPhotoRes as Response).status !== 200 && (displayPhotoRes as Response).status !== 401){
            changeError({open: true, message: t("add.failed_pict")});
            changeLoading(false);
            return;
        }
        const photo: string | null = await displayPhotoRes.text();

        const newForm = {...formInfo, image: photo};

        try {
            await yupSchema.validate(newForm, {abortEarly: false});
        }
        catch (err) {
            changeYupErrors(formatYupError(err as any) as any);
            changeLoading(false);
            return;
        }

        // Sending Phone Info
        const res = await fetchPost('http://localhost:10025/api/v1/phones/add/' + userId, newForm);
        const phone = await res.json();
        const phoneId = phone?.id;

        if (!phoneId) {
            changeError({open: true, message: t("add.failed")});
            changeLoading(false);
            return;
        }

        // Sending Image
        const ok = await fetchPostForm('http://localhost:10025/api/v1/generic/phone/image', files, 0, phoneId);

       if (ok && phoneId) {
         changeSnackbarOpen(true);
         setTimeout(() => {
            router.push(`/phone/${phoneId}`)
         }, 3000)
       }
       else changeError({open: true, message: t("add.failed") });
       changeLoading(false);
    }

    return (jwt === null ? <NotLoggedIn darkMode={darkMode} t={t}/> : (

        <Grid container style={{backgroundColor: darkMode ? dark : white, paddingBottom: 200, paddingTop: 50}}>
          <TitleChange title={`MobiStore - Phone Add`} />
            <Grid item lg={1}/>

            <Grid item sm={12} md={6} lg={4}>

                <Grid item>
                    {currentImage === '' ? (
                        <div className={darkMode ? "display-image-none-dark": "display-image-none"} 
                        onClick={() => (inputRef as any).current.click()}>
                           <CloudUploadIcon style={{fontSize: 150, color: darkMode ? darker_green : blue}}/>
                            <div style={{fontSize: 25, color: darkMode ? darker_green : blue}}>{t("edit.upload")}</div> 
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
                            className={darkMode ? "add-another-dark" : "add-another"}>
                            <ImageIcon style={{fontSize: 35, color: darkMode ? darker_green : blue}}/>
                            <br/>
                            <span style={{color: darkMode ? darker_green : blue }}>{t("edit.add_pict")}</span>
                            </button>
                        </div>
                    )}
                </Grid>
                {currentImage === '' ? null : (
                    <button className="remove-image-button" onClick={() => removeCurrentImage()}>
                            <ClearIcon style={{fontSize: 18, margin: 2}}/>
                            {t("edit.remove_pict")}
                    </button>
                )}
                    
            </Grid>
            <Grid item lg={1}/>
            <Grid item sm={12} md={6} lg={5} style={{backgroundColor: darkMode ? darker_green : blue, padding: 25, height: 450}}>
                <Typography variant="h3"  
                style={{color: white, marginTop: 10, marginLeft: 10}}>{t("add.title_phone")}</Typography>
                
                <Grid container item xs={12} style={{marginTop: 15}}>
                    <Grid xs={6} item>
                        <TextField type="text" placeholder={t("edit.name")} fullWidth 
                        onChange={(e: any) => changeFormInfo({...formInfo,name: e.target.value})} value={formInfo.name}
                        InputProps={{
                            className: yupErrors.filter((x: any) => x.path === 'name').length > 0 ? "money-imput-error" : "money-imput",
                            disableUnderline: true
                        }}/>
                      <YupError errors={yupErrors} path="name" color={darkMode ? red : white}/>
                    </Grid>
                    <Grid xs={6} item>
                    <TextField placeholder={t("edit.price")} type="number" fullWidth
                     onChange={(e: any) => changeFormInfo({...formInfo,price: parseInt(e.target.value)})} value={formInfo.price}
                   InputProps={{
                        className: yupErrors.filter((x: any) => x.path === 'price').length > 0 ? "money-imput-error" : "money-imput",
                        endAdornment: (
                        <InputAdornment position="start">
                            <AttachMoneyIcon style={{fontSize: '18px', color: '#656'}}/>
                        </InputAdornment>
                        ),
                        disableUnderline: true
                      }}/>
                      <YupError errors={yupErrors} path="price" color={darkMode ? red : white}/>
                    </Grid>
                </Grid>


                <Grid container item xs={12}>
                    <Grid xs={6} item>
                        <select name="category" 
                        onChange={e => changeFormInfo({...formInfo,category: e.target.value})} value={formInfo.category}
                        className={yupErrors.filter((x: any) => x.path === 'category').length > 0 ? "money-select-error" : "money-select"}
                        >
                            <option value="" hidden>{t("category.title1")}</option>
                            <option value="android">Android</option>
                            <option value="ios">IOS</option>
                            <option value="other">{t("category.fields1.other")}</option>
                        </select>
                       <YupError errors={yupErrors} path="category" color={darkMode ? red : white}/>
                    </Grid>
                    <Grid xs={6} item>
                    <select name="brand"
                    onChange={e => changeFormInfo({...formInfo,brand: e.target.value})} value={formInfo.brand}
                        className={yupErrors.filter((x: any) => x.path === 'category').length > 0 ? "money-select-error" : "money-select"}>
                            <option value="" hidden>{t("category.title2")}</option>
                            <option value="google">Google</option>
                            <option value="apple">Apple</option>
                            <option value="samsung">Samsung</option>
                            <option value="huawei">Huawei</option>
                            <option value="xiaomi">Xiaomi</option>
                            <option value="alcatel">Alcatel</option>
                        </select>
                       <YupError errors={yupErrors} path="brand" color={darkMode ? red : white}/>
                    </Grid>

                </Grid>

                <TextField placeholder={t("edit.desc")} rows="3" multiline={true} fullWidth
                    onChange={e => changeFormInfo({...formInfo,description: e.target.value})} value={formInfo.description}
                    InputProps={{
                        className: yupErrors.filter((x: any) => x.path === 'description').length > 0 ? "money-desc-error" : "money-desc",
                        style: {padding: 10},
                        disableUnderline: true
                }}/>
                <YupError errors={yupErrors} path="description" color={darkMode ? red : white}/>
                <br/>


                <Button variant="contained" 
                style={{backgroundColor: darkMode ? dark_cont : white, color: darkMode ? darker_green : blue, width: 110}}
                onClick={() => addPhoneApi()}>
                   {loading ? <CircularProgress style={{color: darkMode ? darker_green : blue}} size={24}/> :
                     (<>
                        <CheckIcon style={{fontSize: 20, margin: 2}}/>
                        {t("add.submit")}
                    </>)}
                </Button>
                <Link href="/management">
                    <Button variant="contained" 
                    style={{backgroundColor: red, color: white, margin: 10}}>
                        <ClearIcon style={{fontSize: 20, margin: 2}}/>
                        {t("edit.cancel")}
                    </Button>
                </Link>

            </Grid>

            <Grid item lg={1}/>
            
            <SnackBarSuccess snackBarOpen={snackbar} changeSnackBarOpen={() => changeSnackbarOpen(false)} message="Successfully added your phone !"/>

            <SnackBarFailed snackBarOpen={error.open} changeSnackBarOpen={() => changeError({open: false, message: ""})} 
            message={error.message}/>

        </Grid>
        )
    )
}

export default AddPhone;