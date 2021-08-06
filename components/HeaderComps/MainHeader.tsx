import { Grid, IconButton, Badge } from '@material-ui/core'
import { useRouter } from 'next/router';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import { State } from '../../redux/reduxTypes';
import { useDispatch, useSelector } from 'react-redux';
import { changeLoginStatus, toggleNavbar } from '../../redux/actions/userInfoActions';
import { fetchPost } from '../../constants/CustomFetching';
import { JwtToken } from '../../constants/jwtTypes';

const MainHeader = () => {
  const router = useRouter();

  const numOfItems = useSelector((state : State) => state.cart.items.length);
  const [userSearch,ChangeUserSearch] = React.useState('');

  const dispatch = useDispatch();
  const displayMenu = useSelector((state : State) => state.userInfo.navbarToggle);

  let jwt: string | null = "";
  const loggedIn = useSelector((state : State) => state.userInfo.logged_in);

  if (typeof window !== 'undefined') {
      jwt = localStorage.getItem('jwt');
      if (jwt !== null && loggedIn === false) {
        const exp = localStorage.getItem('exp');
        if (parseInt(exp as string) < Date.now()){
          const func = async () => {
                const res = await fetchPost('http://localhost:10025/api/v1/token/refresh', {
                  token: jwt,
                  refreshToken: localStorage.getItem('refresh')
                });

                if (res?.ok){
                  const json: JwtToken = await res.json();
                  localStorage.setItem('jwt', json.token);
                  localStorage.setItem('refresh', json.refreshToken);
                }
          }
          
          func();
        }
        dispatch(changeLoginStatus(true));
      }
  }


  const exitApp = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt');
      dispatch(changeLoginStatus(false));
    }
    router.push('/');
  }

  return (
    <Grid container className="main-header">
      <Grid item lg={1}/>
      <Grid item xs={12} lg={2} container justify="center">
        <Link href="/"><Image src="/logo.png" alt="logo" width="157" height="47" className="pointer"/></Link>
      </Grid>
      <Grid item xs={12} lg={5}>
      <div className="wrap">
        <form onSubmit={e => {
          e.preventDefault();
          router.push(`/search/${userSearch}`)
          }} className="search">
            <input type="text" className="searchTerm" placeholder="What are you looking for?" value={userSearch} 
            onChange={e => ChangeUserSearch(e.target.value)} />
            <div className="searchButton">
              <Link href={`/search/${userSearch}`}>
                <SearchIcon/>
              </Link>
          </div>
        </form>
      </div>
      </Grid>
      <Grid item xs={12} lg={3} container justify="center">
        <ul className="user-control">
          <li><Link href={loggedIn ? `/user/${localStorage.getItem('userId')}` : "/login"}>
            {loggedIn ? "Profile" : "Login"}</Link></li>
          <li>|</li>
          <li><Link href={loggedIn ? "/management" : "/register" }>
            {loggedIn ? "Management" : "Register"}</Link></li>
          <li>
            {loggedIn ? 
             (
              <IconButton onClick={() => exitApp()} style={{marginRight: 0, padding: '0', background: 'transparent'}} disableRipple>
                  <ExitToAppIcon className="cartIcon" style={{fontSize: '20px'}}/>
              </IconButton>)
            : ""}
            <Link href="/cart">
              <IconButton style={{margin: '0', padding: '0', background: 'transparent'}} disableRipple>
                <Badge badgeContent={numOfItems} color="secondary">
                  <ShoppingCartIcon className="cartIcon" style={{fontSize: '20px'}}/>
                </Badge>
              </IconButton>
            </Link>
          </li>
          <li className={displayMenu ? "closed" : "openMenu"} onClick={() => dispatch(toggleNavbar())}>
            <MenuIcon className="cartIcon" style={{fontSize: '20px'}}/>
          </li>
        </ul> 
      </Grid>
      <Grid item lg={1}/>
    </Grid>
  )
}


export default MainHeader;