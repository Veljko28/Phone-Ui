import React from 'react';
import { Grid } from '@material-ui/core';

import { BidCard } from '../BidCard';
import { PhoneCard } from '../PhoneCard';

import BidSkeletonCard from '../Skeletons/BidSkeletonCard';
import PhoneSkeletonCard from '../Skeletons/PhoneSkeletonCard';

import Bid from '../models/Bid';
import Phone from '../models/Phone';

const PhoneList = ({bids, list} : {bids?: boolean, list: any}) => {
    const phoneSkeletons = [<PhoneSkeletonCard/>, <PhoneSkeletonCard/>, <PhoneSkeletonCard/>, <PhoneSkeletonCard/>, <PhoneSkeletonCard/>,
      <PhoneSkeletonCard/>, <PhoneSkeletonCard/>, <PhoneSkeletonCard/>, <PhoneSkeletonCard/>, <PhoneSkeletonCard/>]

    const bidSkeletons = [<BidSkeletonCard/>, <BidSkeletonCard/>, <BidSkeletonCard/>, <BidSkeletonCard/>, <BidSkeletonCard/>,
      <BidSkeletonCard/>, <BidSkeletonCard/>, <BidSkeletonCard/>, <BidSkeletonCard/>, <BidSkeletonCard/>]
      return (
        <Grid container style={{minHeight: 614}}> 
            {list === undefined || list.length === 0 ? bids ?
            <Grid item container xs={12}>{bidSkeletons.map(x => (<div>{x}</div>))}</Grid>
            :
            <Grid item container xs={12}>{phoneSkeletons.map(x => (<div>{x}</div>))}</Grid> : bids ? 
             list.map((x: Bid) => 
              <BidCard key={x.id} name={x.name} image={x.image as string} price={x.price as string}
              date_ends={x.date_Ends as Date} id={x.id} />
            )
            :
            list.map((x: Phone) => 
              <PhoneCard 
              key={x.id} name={x.name} image={x.image ? x.image : "/phone.jpg"} price={x.price} seller={x.seller}  id={x.id} />
            )}
        </Grid>
    )
} 

export default PhoneList;