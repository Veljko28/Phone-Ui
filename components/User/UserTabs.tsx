import { Button } from '@material-ui/core'
import React from 'react'
import UserListings from './UserListings';
import UserReviews from './UserReviews';
import UserWishList from './UserWishList';


const UserTabs = () => {

  const selectedStyle = {color: '#0cafe5', borderBottom: '2px solid #0cafe5', borderRadius: 0, marginRight: 10};
  const normalStyle = {color: '#0cafe5', borderRadius: 0, paddingBottom: 10,  marginRight: 10};

  const [selected,changeSelected] = React.useState('Listings');

  return (
    <div style={{margin: '10px'}}>
      <Button 
      style={selected === 'Listings' ? selectedStyle : normalStyle}
      onClick={() => {
        changeSelected('Listings');
      }}
      >Listings</Button>
      <Button 
      style={selected === 'Reviews' ? selectedStyle : normalStyle}
      onClick={() => {
        changeSelected('Reviews');
      }}
      >Reviews</Button>
      <Button 
      style={selected === 'Wish List' ? selectedStyle : normalStyle}
        onClick={() => {
        changeSelected('Wish List');
      }}
      >Wish List</Button>

      {selected === 'Listings' ? <UserListings/> : selected === 'Reviews' ? <UserReviews/> : <UserWishList />}
    </div>
  )
}

export default UserTabs
