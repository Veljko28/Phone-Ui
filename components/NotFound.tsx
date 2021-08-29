import React from 'react'
import {Grid, Typography, Button} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Link from 'next/link';
import { blue, dark_cont, dark_gray, white, gray, darker_green } from '../constants/CustomColors';
import { useSelector } from 'react-redux';
import { State } from '../redux/reduxTypes';

const NotFound = () => {

  const darkMode = useSelector((state: State) => state.userInfo.darkMode);

  const [userSearch,ChangeUserSearch] = React.useState('');

  return (
    <Grid container style={{marginTop: '20px'}}>
      <Grid item md={3}/>
      <Grid item xs={12} md={6} className={darkMode ? "page404-dark" : "page404"}>
        <Typography variant="h6" style={{margin: '10px', color: darkMode ? gray : 'black'}}>We Couldn’t Find The Page</Typography>
        <Typography variant="subtitle2" style={{color: darkMode ? gray :dark_gray, margin: '15px'}}>The page you are looking for couldn't be found. It looks like you may have taken a wrong turn or we might have switched direction. You can search with the below searchbar.</Typography>
        <div className="search" style={{margin: '15px'}}>
            <input type="text" className={darkMode ? "searchTerm-dark" : "searchTerm"} placeholder="What are you looking for?" value={userSearch} 
            onChange={e => ChangeUserSearch(e.target.value)} />
            <div className={darkMode ? "searchButton-dark" : "searchButton"}>
              <Link href={`/search/${userSearch}`}>
                <SearchIcon/>
              </Link>
           </div>
      </div>
      <Typography variant="subtitle2" style={{color: darkMode ? gray : 'black'}}>Or</Typography>
      <Link href="/">
        <Button variant="contained" style={{backgroundColor: darkMode ? darker_green : blue, color: white, padding: '20px', marginTop: '10px'}}>
          BACK TO HOME
        </Button>
      </Link>
      </Grid>
      <Grid item md={3}/>
    </Grid>
  )
}

export default NotFound;
