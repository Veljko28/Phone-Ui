import { Grid } from '@material-ui/core';
import React from 'react';
import { fetchGet } from '../../constants/CustomFetching';
import { BidCard } from '../BidCard';
import { Phone } from '../models/Phone';
import { PhoneCard } from '../PhoneCard';

const PhoneList = ({bids, id} : {bids?: boolean, id: string}) => {

    const [list,changeList] = React.useState([]);
    React.useEffect(() => {
      const func = async () => {
        const res = await fetchGet(`http://localhost:10025/api/v1/phones/page/${id}`);
        const json = await res.json();
        changeList(json);
      }

      func();
    },[id])

    return (
        <Grid container> 
            {bids ? 
             list.map((x: Phone) => 
              <BidCard key={x.id} name={x.name} images={["/phone.jpg","/phone2.jpg","/phone3.jpg"]} price="250$" 
              ends={new Date("Jul 14, 2021 23:59:59")} id={x.id} />
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