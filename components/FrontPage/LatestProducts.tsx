import React from 'react';
import Phone from '../models/Phone';
import { PhoneCard } from '../PhoneCard';
import { Grid, Typography } from '@material-ui/core';
import ColoredLine from '../../constants/ColoredLine';
import PhoneSkeletonCard from '../Skeletons/PhoneSkeletonCard';
import { blue, dark_cont, dark_green, gray, white } from '../../constants/CustomColors';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';
import { fetchPost } from '../../constants/CustomFetching';



export const LatestProducts = ({title, phones}: {title: string, phones?: Phone[]}) => {

  const darkMode = useSelector((state: State) => state.userInfo.darkMode);
  const skeletons = [<PhoneSkeletonCard darkMode={darkMode}/>, <PhoneSkeletonCard darkMode={darkMode}/>, <PhoneSkeletonCard darkMode={darkMode}/>, <PhoneSkeletonCard darkMode={darkMode}/>];

  const list = useSelector((state: State) => state.cart.items);

  let userId: string | null = null;

  if (typeof window !== 'undefined'){
    userId = localStorage.getItem('userId');
  }


  const [inWishList, changeInWishList] = React.useState([]);
  const getWishListItems = async () => {
          const res = await fetchPost(`http://localhost:10025/api/v1/wishlist/contains`, {userId, list, type: "phone"});
          if (res.ok){
              const json = await res.json();
              changeInWishList(json);
          }
      }

  return (
    <Grid container style={{
      backgroundColor: darkMode ? dark_cont : white,
      padding: '25px',
      marginTop: '25px',
      marginBottom: '25px'
    }}>
      <Typography variant="h6" style={{color: darkMode ? dark_green : blue, marginLeft: '40px'}}>{title}</Typography>
      <ColoredLine color={gray}/>
      {phones?.length === 0 || phones === undefined ? (
        <Grid item container xs={12} style={{display: 'flex',margin: 20}}>{skeletons.map(x => (<Grid xs={12} md={6} lg={3} item>{x}</Grid>))}</Grid>
      ) : ""}
      {phones?.map(x => (
        <div style={{margin: 15, display: 'flex'}} key={x.id}>
          <PhoneCard inCart={list.filter(y => y.id == x.id).length === 1} inWishList={inWishList} 
            getWishListItems={async () => await getWishListItems()}
              key={x.id} name={x.name} image={x.image ? x.image : "/phone.jpg"} price={x.price} seller={x.seller}  id={x.id} status={x.status}
          />
        </div>
      ))}
    </Grid>
  )
}
