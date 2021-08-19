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
import { dark_gray } from '../constants/CustomColors';

const QuickLink = ({href,name} : {href: string, name: string}) => {
  return (
  <div className="footer-text" key={name}>
   <li>
     <ArrowForwardIosIcon style={{fontSize: '10px', margin: '5px'}}/>
     <Link href={href}>{name}</Link>
    </li>
 </div>
  );
}

const Footer = () => {

  return (
      <Grid container className="footer-container">
          <Grid xs={12} md={6} lg={3} item>
            Contact Info
            <div className="footer-text">
              <RoomIcon className="footer-mui-icons" style={{fontSize: '15px'}}/>
               16. октобра 40, Смедерево 11300
            </div>

            <div className="footer-text">
              <PhoneIcon className="footer-mui-icons" style={{fontSize: '15px'}}/>
               +381 063 800-3210
            </div>

            <div className="footer-text">
               <MailIcon className="footer-mui-icons" style={{fontSize: '15px'}}/>
               support@mobistore.com
            </div>
          </Grid>
          <Grid xs={12} md={6} lg={3} item >
            <div style={{marginLeft: '25px'}}>Quick Links</div>
            <ul className="footer-links">
              {links.map(x => QuickLink(x))}
            </ul>
          </Grid>
          <Grid xs={1} lg={3} item />
          <Grid xs={12} md={6} lg={3} item >
            <div style={{marginBottom: '10px',}}>Connect With Us</div>
            {socialLinks.map(x => <SocialIcon key={Math.random() % 100} url={x} style={{width: '35px', height: '35px', margin: '5px'}} /> )}
            <div style={{marginTop: '50px', fontSize: '12px', color: dark_gray}}>Copyright © All Rights Reserved {new Date().getFullYear()} Website Design by <a href="https://github.com/Veljko28">Veljko28</a></div>
          </Grid>
      </Grid>
  )
}


export default Footer;