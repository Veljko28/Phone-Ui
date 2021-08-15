import { Button } from '@material-ui/core'
import React from 'react'
import UserListings from './UserListings';
import UserReviews from './UserReviews';
import UserWishList from './UserWishList';


const UserTabs = ({id} : {id: string}) => {

  const selectedStyle = {color: '#0cafe5', borderBottom: '2px solid #0cafe5', borderRadius: 0, marginRight: 10};
  const normalStyle = {color: '#0cafe5', borderRadius: 0, paddingBottom: 10,  marginRight: 10};

  const [selected,changeSelected] = React.useState('Listings');

  return (
    <div style={{margin: '5px'}}>
      <Button  disableRipple
      style={selected === 'Listings' ? selectedStyle : normalStyle}
      onClick={() => {
        changeSelected('Listings');
      }}
      >Listings</Button>
      <Button  disableRipple
      style={selected === 'Reviews' ? selectedStyle : normalStyle}
      onClick={() => {
        changeSelected('Reviews');
      }}
      >Reviews</Button>
      <Button  disableRipple
      style={selected === 'Wish List' ? selectedStyle : normalStyle}
        onClick={() => {
        changeSelected('Wish List');
      }}
      >Wish List</Button>

      {selected === 'Listings' ? <UserListings id={id}/> : selected === 'Reviews' ? <UserReviews/> : <UserWishList id={id} />}
    </div>
  )
}

export default UserTabs
