import React from 'react';
import { Grid } from '@material-ui/core';

import { BidCard } from '../BidCard';
import { PhoneCard } from '../PhoneCard';

import BidSkeletonCard from '../Skeletons/BidSkeletonCard';
import PhoneSkeletonCard from '../Skeletons/PhoneSkeletonCard';

import Bid from '../models/Bid';
import Phone from '../models/Phone';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';
import { fetchPost } from '../../constants/CustomFetching';
import { useTranslation } from 'react-i18next';

const PhoneList = ({bids, list} : {bids?: boolean, list: any}) => {

    const darkMode = useSelector((state: State) => state.userInfo.darkMode);
    const { t } = useTranslation();


    const phoneSkeletons = [<PhoneSkeletonCard darkMode={darkMode}/>, <PhoneSkeletonCard  darkMode={darkMode}/>,
       <PhoneSkeletonCard  darkMode={darkMode}/>, <PhoneSkeletonCard  darkMode={darkMode}/>, <PhoneSkeletonCard  darkMode={darkMode}/>,
      <PhoneSkeletonCard  darkMode={darkMode}/>, <PhoneSkeletonCard  darkMode={darkMode}/>, <PhoneSkeletonCard  darkMode={darkMode}/>, <PhoneSkeletonCard  darkMode={darkMode}/>, <PhoneSkeletonCard  darkMode={darkMode}/>]

    const bidSkeletons = [<BidSkeletonCard darkMode={darkMode}/>, <BidSkeletonCard darkMode={darkMode}/>,
       <BidSkeletonCard darkMode={darkMode}/>, <BidSkeletonCard darkMode={darkMode}/>, <BidSkeletonCard darkMode={darkMode}/>,
      <BidSkeletonCard darkMode={darkMode}/>, <BidSkeletonCard darkMode={darkMode}/>, <BidSkeletonCard darkMode={darkMode}/>, 
      <BidSkeletonCard darkMode={darkMode}/>, <BidSkeletonCard darkMode={darkMode}/>];

      const [inWishList, changeInWishList] = React.useState([]);
      const items = useSelector((state: State) => state.cart.items);

      let userId: string | null = null;
      
      if (typeof window !== 'undefined'){
        userId = localStorage.getItem('userId');
      }

      const getWishListItems = async () => {
          const res = await fetchPost(`http://localhost:10025/api/v1/wishlist/contains`, {userId, list, type: bids ? "bid" : "phone"});
          if (res.ok){
              const json = await res.json();
              changeInWishList(json);
          }
      }

      React.useEffect(() => {
        const func = async () => await getWishListItems();
        if (userId && list?.length > 0) func();

      }, [userId, list])
 
      return (
        <Grid container style={{minHeight: 614}}> 
            {list === undefined || list?.length === 0 ? bids ?
            <Grid item container xs={12}>{bidSkeletons.map(x => (<div>{x}</div>))}</Grid>
            :
            <Grid item container xs={12}>{phoneSkeletons.map(x => (<div>{x}</div>))}</Grid> : bids ? 
             list.map((x: Bid) => 
              <BidCard key={x.id} name={x.name} image={x.image as string} price={x.price as string}
              date_ends={x.date_Ends as Date} id={x.id} inWishList={inWishList} 
              getWishListItems={async () => await getWishListItems()}/>
            )
            :
            list.map((x: Phone) => 
              <PhoneCard inCart={items.filter(y => y.id == x.id).length === 1} inWishList={inWishList} 
              getWishListItems={async () => await getWishListItems()} t={t}
              key={x.id} name={x.name} image={x.image ? x.image : "/phone.jpg"} price={x.price} seller={x.seller}  id={x.id} status={x.status} />
            )}
        </Grid>
    )
} 

export default PhoneList;