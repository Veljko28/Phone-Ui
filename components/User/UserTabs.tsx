import React from 'react'
import { Button } from '@material-ui/core'

import UserListings from './UserListings';
import UserReviews from './UserReviews';
import UserWishList from './UserWishList';
import { blue, darker_green } from '../../constants/CustomColors';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';


const UserTabs = ({id, t} : {id: string, t: any}) => {

  const darkMode = useSelector((state: State) => state.userInfo.darkMode);

  const selectedStyle = {color: darkMode ? darker_green : blue, borderBottom: '2px solid ' + (darkMode ? darker_green : blue), borderRadius: 0, marginRight: 10};
  const normalStyle = {color: darkMode ? darker_green : blue, borderRadius: 0, paddingBottom: 10,  marginRight: 10};

  const [selected,changeSelected] = React.useState('Listings');

   let userId: string | null = "";

    if (typeof window !== 'undefined') {
      userId = localStorage.getItem('userId');
    }

  return (
    <div style={{margin: '5px'}}>
      <Button  disableRipple 
      style={selected === 'Listings' ? selectedStyle : normalStyle}
      onClick={() => {
        changeSelected('Listings');
      }}
      >{t("userTabs.listings")}</Button>
      <Button  disableRipple
      style={selected === 'Reviews' ? selectedStyle : normalStyle}
      onClick={() => {
        changeSelected('Reviews');
      }}
      >{t("userTabs.reviews")}</Button>
      {id === userId ? (
        <Button  disableRipple
        style={selected === 'Wish List' ? selectedStyle : normalStyle}
          onClick={() => {
          changeSelected('Wish List');
        }}
        >{t("userTabs.wishList")}</Button>
      ) : ""}

      {selected === 'Listings' ? <UserListings id={id} ownProfile={id === userId} t={t}/> : selected === 'Reviews' ? <UserReviews userId={id} t={t}/> : <UserWishList id={id} t={t}/>}
    </div>
  )
}

export default UserTabs
