import React from 'react';
import Link from 'next/link';
import { Grid } from '@material-ui/core';
import { SocialIcon } from 'react-social-icons';

import RoomIcon from '@material-ui/icons/Room';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import links from '../constants/Links';
import socialLinks from '../constants/SocialLinks';
import { dark_gray, white } from '../constants/CustomColors';
import { useSelector } from 'react-redux';
import { State } from '../redux/reduxTypes';
import { useTranslation } from 'react-i18next';

const QuickLink = ({href,name,t} : {href: string, name: string, t: any}) => {

  name = name.replace(/\s/g, '').toLocaleLowerCase();

  return (
  <div className="footer-text" key={name}>
   <li>
     <ArrowForwardIosIcon style={{fontSize: '10px', margin: '5px'}}/>
     <Link href={href}>{t("navBar." + name)}</Link>
    </li>
 </div>
  );
}

const Footer = () => {

  const darkMode = useSelector((state: State) => state.userInfo.darkMode);

  const { t } = useTranslation();

  return (
      <Grid container className={darkMode ? "footer-container-dark" : "footer-container"}>
          <Grid xs={12} md={6} lg={3} item>
            {t("footer.info")}
            <div className="footer-text">
              <RoomIcon className={darkMode ? "footer-mui-icons-dark" : "footer-mui-icons"} style={{fontSize: '15px'}}/>
               16. октобра 40, Смедерево 11300
            </div>

            <div className="footer-text">
              <PhoneIcon className={darkMode ? "footer-mui-icons-dark" : "footer-mui-icons"} style={{fontSize: '15px'}}/>
               +381 063 800-3210
            </div>

            <div className="footer-text">
               <MailIcon className={darkMode ? "footer-mui-icons-dark" : "footer-mui-icons"} style={{fontSize: '15px'}}/>
               support@mobistore.com
            </div>
          </Grid>
          <Grid xs={12} md={6} lg={3} item >
            <div style={{marginLeft: '5px'}}>{t("footer.links")}</div>
            <ul className="footer-links">
              {links.map(x => QuickLink({...x,t}))}
            </ul>
          </Grid>
          <Grid xs={1} lg={3} item />
          <Grid xs={12} md={6} lg={3} item >
            <div style={{marginBottom: '10px',}}>{t("footer.contact")}</div>
            {socialLinks.map(x => <SocialIcon key={Math.random() % 100} url={x} style={{width: '35px', height: '35px', margin: '5px', backgroundColor: white, borderRadius: 100}} /> )}
            <div style={{marginTop: '50px', fontSize: '12px', color: dark_gray}}>Copyright © All Rights Reserved {new Date().getFullYear()} Website Design by <a href="https://github.com/Veljko28">Veljko28</a></div>
          </Grid>
      </Grid>
  )
}


export default Footer;