import { Grid, IconButton, Badge } from '@material-ui/core'
import { useRouter } from 'next/router';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import NotificationsIcon from '@material-ui/icons/Notifications';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import { State } from '../../redux/reduxTypes';
import { useDispatch, useSelector } from 'react-redux';
import { changeLoginStatus, toggleNavbar } from '../../redux/actions/userInfoActions';
import { fetchPost } from '../../constants/CustomFetching';
import { JwtToken } from '../../constants/jwtTypes';
import { clearCart } from '../../redux/actions/cartActions';
import NotificationsPopOver from './NotificationsPopOver';

const MainHeader = () => {
  const router = useRouter();

  const numOfItems = useSelector((state : State) => state.cart.items.length);
  const numOfNotifications = useSelector((state: State) => state.notification.numOfNotifications);
  const [userSearch,ChangeUserSearch] = React.useState('');

  const dispatch = useDispatch();
  const displayMenu = useSelector((state : State) => state.userInfo.navbarToggle);

  let jwt: string | null = "";
  const loggedIn = useSelector((state : State) => state.userInfo.logged_in);
  const darkMode = useSelector((state: State) => state.userInfo.darkMode);


  const [anchorEl, setAnchorEl] = React.useState(null);
  const notificationsOpen = Boolean(anchorEl);

  const openNotifications = (e: any) => {
    setAnchorEl(e.currentTarget);
  }

  const closeNotifications = () => {
    setAnchorEl(null);
  }


  React.useEffect( () => {
    if (typeof window !== 'undefined') {

        jwt = localStorage.getItem('jwt');
        const exp = localStorage.getItem('exp');
        const refreshToken = localStorage.getItem('refresh');

        if (jwt !== null && refreshToken !== null && loggedIn === false) {
          if ((parseInt(exp as string)*1000) < Date.now()){
            const func = async () => {
                  const res = await fetchPost('http://localhost:10025/api/v1/token/refresh', {
                    token: jwt,
                    refreshToken
                  });
  
                  if (res?.ok){
                    const json: JwtToken = await res.json();
                    localStorage.setItem('jwt', json.token);
                    localStorage.setItem('refresh', json.refreshToken);
                    return;
                  }
                  else {
                    dispatch(changeLoginStatus(false));
                    localStorage.clear();
                    return;
                  }
                }
              }
           dispatch(changeLoginStatus(true));
        }
    }
  }, [])



  const exitApp = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
      dispatch(clearCart());
      dispatch(changeLoginStatus(false));
    }
    router.push('/');
  }

  return (
    <Grid container className="main-header">
      <Grid item lg={1}/>
      <Grid item xs={12} lg={2} container justifyContent="center">
        <Link href="/"><Image src={darkMode ? "/logo_dark.png" : "/logo.png"} alt="logo" width="157" height="47" className="pointer"/></Link>
      </Grid>
      <Grid item xs={12} lg={5}>
      <div className="wrap">
        <form onSubmit={e => {
          e.preventDefault();
          router.push(`/search/${userSearch}`)
          }} className="search">
            <input type="text" className={darkMode ? "searchTerm-dark" : "searchTerm"} placeholder="What are you looking for?" value={userSearch} 
            onChange={e => ChangeUserSearch(e.target.value)} />
            <div className={darkMode ? "searchButton-dark" : "searchButton"}>
              <Link href={`/search/${userSearch}`}>
                <SearchIcon/>
              </Link>
          </div>
        </form>
      </div>
      </Grid>
      <Grid item xs={12} lg={3} container justifyContent="center">
        <ul className={darkMode ? "user-control-dark" : "user-control"}>
          <li><Link href={loggedIn ? `/user/${localStorage.getItem('userId')}` : "/login"}>
            {loggedIn ? "Profile" : "Login"}</Link></li>
          <li>|</li>
          <li><Link href={loggedIn ? "/management" : "/register" }>
            {loggedIn ? "Management" : "Register"}</Link></li>
          <li>
            {loggedIn ? 
             (
               <>
                <IconButton onClick={() => exitApp()} style={{marginRight: 0, padding: '0', background: 'transparent'}} disableRipple>
                    <ExitToAppIcon className={darkMode ? "cartIcon-dark" : "cartIcon"} style={{fontSize: '20px'}}/>
                </IconButton>
                <Link href="/cart">
                  <IconButton style={{margin: '0', padding: '0', background: 'transparent'}} disableRipple>
                    <Badge badgeContent={numOfItems} color="secondary">
                      <ShoppingCartIcon  className={darkMode ? "cartIcon-dark" : "cartIcon"} style={{fontSize: '20px'}}/>
                    </Badge>
                  </IconButton>
                </Link>
                <IconButton style={{margin: '0', padding: '0', background: 'transparent'}} disableRipple onClick={e => openNotifications(e)}>
                    <Badge badgeContent={numOfNotifications} color="secondary">
                      <NotificationsIcon  className={darkMode ? "cartIcon-dark" : "cartIcon"} style={{fontSize: '20px'}}/>
                    </Badge>
                </IconButton>
                <NotificationsPopOver open={notificationsOpen} handleClose={() => closeNotifications()} anchorEl={anchorEl}/>
              </>
              )
            : ""}
          </li>
          <li className={displayMenu ? "closed" : "openMenu"} onClick={() => dispatch(toggleNavbar())}>
            <MenuIcon className={darkMode ? "cartIcon-dark" : "cartIcon"} style={{fontSize: '20px'}}/>
          </li>
        </ul> 
      </Grid>
      <Grid item lg={1}/>
    </Grid>
  )
}


export default MainHeader;