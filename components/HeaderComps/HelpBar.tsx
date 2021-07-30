import React from 'react'
import Image from 'next/image';
import {Grid, Switch} from '@material-ui/core';
import { State } from '../../redux/reduxTypes';
import { useSelector } from 'react-redux';
import LanguagePopUp from './LanguagePopUp';




const HelpBar = () => {
  
  const lang = useSelector((state: State) => state.language.lang);


  const [langAnchorEl, setLangAnchorEl] = React.useState(null);
  const langOpen = Boolean(langAnchorEl);

  const openLang = (e: any) => {
    setLangAnchorEl(e.currentTarget);
  }

  const closeLang = () => {
    setLangAnchorEl(null);
  }

  return (
    <Grid container className="helper-container">
      <Grid item xs={6}/>
      <Grid item xs={6} className="top-grid">
        <Switch
        defaultChecked
        color="default"
        size="small"/>
        <div onClick={e => openLang(e)} className="flag-support">
         <Image src={lang == 'en' ? '/lang/en.png' : '/lang/sr.png'} 
              alt={lang == 'en' ? "English" : "Српски"} width="20" height="15"  />
        </div>
        <div className="support">Support: +381 063 800-3210 support@mobistore.com</div>
        <LanguagePopUp open={langOpen} handleClose={() => closeLang()} anchorEl={langAnchorEl}/>
      </Grid>
    </Grid>
  )
}


export default HelpBar;