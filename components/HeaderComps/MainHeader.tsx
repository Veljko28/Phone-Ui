import { Grid } from '@material-ui/core'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';

const MainHeader = () => {
  return (
    <Grid container className="main-header">
      <Grid item xs={1}/>
      <Grid item xs={2}>
        <Link href="/"><Image src="/logo.png" alt="logo" width="157" height="47" className="pointer"/></Link>
      </Grid>
      <Grid item xs={5}>
      <div className="wrap">
        <div className="search">
            <input type="text" className="searchTerm" placeholder="What are you looking for?" />
            <button type="submit" className="searchButton">
              <SearchIcon/>
          </button>
        </div>
      </div>
      </Grid>
      <Grid item xs={3}>
        <ul className="user-control">
          <li><Link href="/login">Login</Link></li>
          <li>|</li>
          <li><Link href="/register">Register</Link></li>
          <li className="pointer">
            <ShoppingCartIcon/>
          </li>
        </ul>
      </Grid>
      <Grid item xs={1}/>
    </Grid>
  )
}


export default MainHeader;