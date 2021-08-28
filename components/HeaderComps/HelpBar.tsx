import React from 'react'
import Image from 'next/image';
import {Grid, Switch} from '@material-ui/core';
import { State } from '../../redux/reduxTypes';
import { useSelector } from 'react-redux';
import LanguagePopUp from './LanguagePopUp';
import { dark_gray } from '../../constants/CustomColors';
import AnimatedIcon from './AnimatedIcon';




const HelpBar = () => {
  
  const lang = useSelector((state: State) => state.language.lang);
  const darkMode = useSelector((state: State) => state.userInfo.darkMode);


  const [langAnchorEl, setLangAnchorEl] = React.useState(null);
  const langOpen = Boolean(langAnchorEl);

  const openLang = (e: any) => {
    setLangAnchorEl(e.currentTarget);
  }

  const closeLang = () => {
    setLangAnchorEl(null);
  }

  return (
    <Grid container className={darkMode ? "helper-container-dark" : "helper-container"}>
      <Grid item xs={12} lg={4} style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{fontSize: 12, marginTop: 5, color: dark_gray, marginLeft: 25}}>Best Online Mobile Selling Store !</div>
      </Grid>
      <Grid item xs={12} lg={8} className="top-grid">
        <div className={darkMode ? "support-dark" : "support"}>support: +381 063 800-3210 </div>
        <div className={darkMode ? "support-dark" : "support"}>support@mobistore.com</div>
        <div onClick={e => openLang(e)} className="flag-support">
         <Image src={lang == 'en' ? '/lang/en.png' : '/lang/sr.png'} 
              alt={lang == 'en' ? "English" : "Српски"} width="20" height="15"  />
        </div>
        <LanguagePopUp open={langOpen} handleClose={() => closeLang()} anchorEl={langAnchorEl}/>
        <AnimatedIcon/>
      </Grid>
    </Grid>
  )
}


export default HelpBar;