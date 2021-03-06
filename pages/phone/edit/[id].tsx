import React from 'react';
import * as yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, CircularProgress, Grid, InputAdornment, TextField, Typography } from '@material-ui/core';

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import ImageIcon from '@material-ui/icons/Image';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import YupError from '../../../constants/YupError';
import NotLoggedIn from '../../../constants/NotLoggedIn';
import TitleChange from '../../../constants/TitleChange';
import { formatYupError } from '../../../constants/formYupError';
import { SnackBarSuccess, SnackBarFailed } from '../../../constants/CustomSnackBars';
import { fetchForm, fetchPostForm, fetchGet, fetchPatch} from '../../../constants/CustomFetching';
import { white, blue, red, dark, darker_green, dark_cont } from '../../../constants/CustomColors';
import { useSelector } from 'react-redux';
import { State } from '../../../redux/reduxTypes';
import { useTranslation } from 'react-i18next';


const EditPage = () => {
  const router = useRouter()
  const id = router.query['id'];
  const { t } = useTranslation();

  
  
  const [currentImage,changeCurrentImage] = React.useState('');
  const [imageBlobs, changeImageBlob] = React.useState([]);
  const [files,changeFiles] = React.useState([]);
  
  
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


    const yupSchema = yup.object().shape({
        name: yup.string().min(5),
        image: yup.string(),
        description: yup.string().min(25),
        price: yup.number().moreThan(0),
        category: yup.string().min(1),
        brand: yup.string().min(1)
    });

  
  React.useEffect(() => {
      const func = async () => {
            const res = await fetchGet(`http://localhost:10025/api/v1/phones/${id as string}`);
      
            if ((res as Response).ok){
              changeFormInfo(await (res as Response).json());
            }
      
            const res2 = await fetchGet(`http://localhost:10025/api/v1/phones/images/${id}`);
      
            if ((res2 as Response).ok){
              changeImageBlob(await (res2 as Response).json());
              changeCurrentImage(formInfo.image);
            }
      }

      if (id) func();
    },[id, formInfo.image]);

    const [snackbar, changeSnackbarOpen] = React.useState(false);
    const [error, changeError] = React.useState({open: false, message: ""});
    const [yupErrors, changeYupErrors] = React.useState([]);
    const [loading, changeLoading] = React.useState(false);

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
        
        changeImageBlob(list);
        if (list.length > 0) {
            changeCurrentImage(list[0]);
        }
        else changeCurrentImage('');
    }

    const EditPhoneApi = async () => {
       changeLoading(true);
        try {
            await yupSchema.validate(formInfo, {abortEarly: false});
        }
        catch (err) {
            changeYupErrors(formatYupError(err as any) as any);
            changeLoading(false);
            return;
        }

        // Editing and removing photos no longer in user
        const res = await fetchPatch('http://localhost:10025/api/v1/phones/edit', {model: formInfo, images: imageBlobs});

        if (res.ok){
              // Sending New Images
              const updateImage = await fetchPostForm('http://localhost:10025/api/v1/generic/phone/image', files, 0, id as string);

            if (updateImage) {
              changeSnackbarOpen(true);
              setTimeout(() => {
                  router.push(`/phone/${id}`)
              }, 3000)
            }
            else {
                changeSnackbarOpen(false);
                changeError({open: true, message: t("edit.failed")});
                return;
            }
        }
        changeSnackbarOpen(true);
        setTimeout(() => router.push(`/phone/${id}`), 3000)
        changeLoading(false);
    }

    const darkMode = useSelector((state: State) => state.userInfo.darkMode);


  return (
      <>
      {jwt === null ? <NotLoggedIn darkMode={darkMode} t={t}/> : (

    <Grid container style={{backgroundColor: darkMode ? dark : white, paddingBottom: 200, paddingTop: 50}}>
          <TitleChange title={`MobiStore - Phone Edit`} />
            <Grid item lg={1}/>

            <Grid item sm={12} md={6} lg={4}>

                <Grid item>
                    {currentImage === '' ? (
                         <div className={darkMode ? "display-iamge-none-dark" : "display-image-none"}
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
                            {t("edit.add_pict")}
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

            <Grid item sm={12} md={6} lg={5}  
            style={{backgroundColor: darkMode ? darker_green : blue, padding: 25, height: yupErrors.length > 0 ? 450 : 400}}>
                <Typography variant="h4"  
                style={{color: white, marginTop: 10, marginLeft: 10}}>{t("edit.title_phone")}</Typography>
                
                <Grid container item xs={12} style={{marginTop: 15}}>
                    <Grid xs={6} item>
                        <TextField type="text" placeholder={t("edit.name")} fullWidth 
                        onChange={(e: any) => changeFormInfo({...formInfo,name: e.target.value})} value={formInfo.name}
                        InputProps={{
                            className: yupErrors.filter((x: any) => x.path === 'name').length > 0 ? "money-imput-error" : "money-imput",
                            disableUnderline: true
                        }}/>
                       <YupError errors={yupErrors} path="name"/>
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
                     <YupError errors={yupErrors} path="price"/>
                    </Grid>
                </Grid>


                <Grid container item xs={12}>
                    <Grid xs={6} item>
                        <select name="category" 
                        onChange={e => changeFormInfo({...formInfo,category: e.target.value})} value={formInfo.category}
                        className={yupErrors.filter((x: any) => x.path === 'category').length > 0 ? "money-select-error" : "money-select"}>
                            <option value="" hidden>{t("category.title1")}</option>
                            <option value="android">Android</option>
                            <option value="ios">IOS</option>
                            <option value="other">{t("category.fields1.other")}</option>
                        </select>
                     <YupError errors={yupErrors} path="category"/>
                    </Grid>
                    <Grid xs={6} item>
                    <select name="brand"
                    onChange={e => changeFormInfo({...formInfo,brand: e.target.value})} value={formInfo.brand}
                    className={yupErrors.filter((x: any) => x.path === 'brand').length > 0 ? "money-select-error" : "money-select"}>
                            <option value="" hidden>{t("category.title2")}</option>
                            <option value="google">Google</option>
                            <option value="apple">Apple</option>
                            <option value="samsung">Samsung</option>
                            <option value="htc">Htc</option>
                            <option value="alc">Alcatel</option>
                        </select>
                     <YupError errors={yupErrors} path="brand"/>
                    </Grid>

                </Grid>

                <TextField placeholder={t("edit.desc")} rows="3" multiline={true} fullWidth
                    onChange={e => changeFormInfo({...formInfo,description: e.target.value})} value={formInfo.description}
                    InputProps={{
                        className: yupErrors.filter((x: any) => x.path === 'description').length > 0 ? "money-desc-error" : "money-desc",
                        style: {padding: 10},
                        disableUnderline: true
                }}/>
                <YupError errors={yupErrors} path="description"/>
                <br/>
                <Button variant="contained" 
                style={{backgroundColor: darkMode ? dark_cont : white, color: darkMode ? darker_green : blue, width: 110}}
                onClick={() => EditPhoneApi()}>
                    {loading ? <CircularProgress style={{color: darkMode ? darker_green : blue}} size={24}/> :
                     (<>
                        <CheckIcon style={{fontSize: 20, margin: 2}}/>
                        {t("edit.update")}
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
            
            <SnackBarSuccess snackBarOpen={snackbar} changeSnackBarOpen={() => changeSnackbarOpen(false)} message={t("edit.success")}/>

            <SnackBarFailed snackBarOpen={error.open} changeSnackBarOpen={() => changeError({open: false, message: ""})} message={error.message}/>

        </Grid>
      )}
      </>
  )
}

export default EditPage;
