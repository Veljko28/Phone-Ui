import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';
import { BidCard } from '../BidCard';
import { PhoneCard } from '../PhoneCard';

const PhoneList = ({bids} : {bids?: boolean}) => {
    const list = useSelector((state: State ) => state.phones.list);

    return (
        <Grid container> 
            {bids ? 
             list.map(x => 
              <BidCard key={x.id} name={x.name} images={["/phone.jpg","/phone2.jpg","/phone3.jpg"]} price="250$" 
              ends={new Date("Jul 14, 2021 23:59:59")} id={x.id} />
            )
            :
            list.map(x => 
              <PhoneCard key={x.id} name={x.name} images={["/phone.jpg","/phone2.jpg","/phone3.jpg"]}price="1500$" discount="1200$" id={x.id} />
            )}
        </Grid>
    )
} 

export default PhoneList;