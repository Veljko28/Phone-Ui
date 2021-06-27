import React from 'react'
import {Grid} from '@material-ui/core';
import Image from 'next/image';
import styles from '../../styles/Header.module.css';

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
    <Grid container className={styles.supportText}>
      <Grid item xs={3}>
        <FormControl>
        <InputLabel id="languge-select">Language</InputLabel>
        <Select
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
        </Select>
      </FormControl>
      </Grid>
      <Grid item xs={5}/>
      <Grid item xs={4}>
        <div>Support: +381 063 800-3210 support@mobistore.com</div>
      </Grid>
    </Grid>
  )
}
