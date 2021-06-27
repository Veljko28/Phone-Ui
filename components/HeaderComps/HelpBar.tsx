import React from 'react'
import {Grid} from '@material-ui/core';
import Image from 'next/image';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { State } from '../../redux/reduxTypes';
import { changeLanguage } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';




export const HelpBar = () => {
  
  const lang = useSelector((state: State) => state.lang);

  const dispatch = useDispatch();

  return (
    <Grid container>
      <Grid item xs={3}>
        <FormControl>
        {/* <Select
          labelId="select-label"
          id="languge"
          value={lang}
        >
          <MenuItem value="en" onClick={() => dispatch(changeLanguage("en"))}>
            <Image src="/en.png" alt="english" width="25" height="20" />
          </MenuItem>
          <MenuItem value="sr" onClick={() => dispatch(changeLanguage("sr"))}>
            <Image src="/sr.png" alt="Српски" width="25" height="20" />
          </MenuItem>
        </Select> */}
      </FormControl>
      </Grid>
      <Grid item xs={3}/>
      <Grid item xs={6} className="top-grid">
        <span className="nav-wrapper">
          <div className="sl-nav">
            <ul>
              <li><Image src={lang == 'en' ? '/en.png' : '/sr.png'} 
              alt={lang == 'en' ? "English" : "Српски"} width="20" height="15"/><i className="fa fa-angle-down" aria-hidden="true"></i>
                <div className="triangle"></div>
                <ul>
                  <li onClick={() => dispatch(changeLanguage("en"))}><Image src="/en.png" alt="english" width="20" height="15" /><span className="active">English</span></li>
                  <li onClick={() => dispatch(changeLanguage("sr"))}><Image src="/sr.png" alt="Српски" width="20" height="15" /><span>Српски</span></li>
                </ul>
              </li>
            </ul>
          </div>
        </span>
        <span className="support">Support: +381 063 800-3210 support@mobistore.com</span>
      </Grid>
    </Grid>
  )
}
