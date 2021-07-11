import { Grid, IconButton, Badge } from '@material-ui/core'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import { State } from '../../redux/reduxTypes';
import { useSelector } from 'react-redux';

const MainHeader = () => {
  const numOfItems = useSelector((state : State) => state.cart.items.length);
  const [userSearch,ChangeUserSearch] = React.useState('');

  return (
    <Grid container className="main-header">
      <Grid item lg={1}/>
      <Grid item xs={12} lg={2} container justify="center">
        <a href="/"><Image src="/logo.png" alt="logo" width="157" height="47" className="pointer"/></a>
      </Grid>
      <Grid item xs={12} lg={5}>
      <div className="wrap">
        <div className="search">
            <input type="text" className="searchTerm" placeholder="What are you looking for?" value={userSearch} 
            onChange={e => ChangeUserSearch(e.target.value)} />
            <div className="searchButton">
              <Link href={`/search/${userSearch}`}>
                <SearchIcon/>
              </Link>
          </div>
        </div>
      </div>
      </Grid>
      <Grid item xs={12} lg={3} container justify="center">
        <ul className="user-control">
          <li><Link href="/login">Login</Link></li>
          <li>|</li>
          <li><Link href="/register">Register</Link></li>
          <li>
            <Link href="/cart">
              <IconButton style={{margin: '0', padding: '0', background: 'transparent'}} disableRipple>
                <Badge badgeContent={numOfItems} color="secondary">
                  <ShoppingCartIcon className="cartIcon" style={{fontSize: '20px'}}/>
                </Badge>
              </IconButton>
            </Link>
          </li>
        </ul> 
      </Grid>
      <Grid item lg={1}/>
    </Grid>
  )
}


export default MainHeader;