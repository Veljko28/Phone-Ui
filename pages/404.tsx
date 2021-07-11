import React from 'react'
import {Grid, Typography, Button} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Link from 'next/link';

const Page404 = () => {

  const [userSearch,ChangeUserSearch] = React.useState('');

  return (
    <Grid container style={{marginTop: '20px'}}>
      <Grid item md={3}/>
      <Grid item xs={12} md={6} className="page404">
        <Typography variant="h6" style={{margin: '10px'}}>We Couldn’t Find The Page</Typography>
        <Typography variant="subtitle2" style={{color: '#999', margin: '15px'}}>The page you are looking for couldn't be found. It looks like you may have taken a wrong turn or we might have switched direction. You can search your directionin below searchbar.</Typography>
        <div className="search" style={{margin: '15px'}}>
            <input type="text" className="searchTerm" placeholder="What are you looking for?" value={userSearch} 
            onChange={e => ChangeUserSearch(e.target.value)} />
            <div className="searchButton">
              <Link href={`/search/${userSearch}`}>
                <SearchIcon/>
              </Link>
           </div>
      </div>
      <Typography variant="subtitle2">Or</Typography>
      <Link href="/">
        <Button variant="contained" style={{backgroundColor: '#0cafe5', color: '#fff', padding: '20px', marginTop: '10px'}}>
          BACK TO HOME
        </Button>
      </Link>
      </Grid>
      <Grid item md={3}/>
    </Grid>
  )
}

export default Page404;
