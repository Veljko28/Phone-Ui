import { Grid } from '@material-ui/core';
import React from 'react';
import { BidCard } from '../BidCard';
import { Bid } from '../models/Bid';
import { Phone } from '../models/Phone';
import { PhoneCard } from '../PhoneCard';

const PhoneList = ({bids, list} : {bids?: boolean, list: any}) => {
    return (
        <Grid container> 
            {bids ? 
             list.map((x: Bid) => 
              <BidCard key={x.id} name={x.name} image={x.image as string} price={x.price}
              ends={x.timeEnds as Date} id={x.id} />
            )
            :
            list.map((x: Phone) => 
              <PhoneCard 
              key={x.id} name={x.name} image={x.image ? x.image : "/phone.jpg"} price={x.price}  id={x.id} />
            )}
        </Grid>
    )
} 

export default PhoneList;