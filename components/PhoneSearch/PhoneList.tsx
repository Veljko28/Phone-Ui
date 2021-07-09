import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';
import { PhoneCard } from '../PhoneCard';

const PhoneList = () => {
    const list = useSelector((state: State ) => state.phones.list);

    return (
        <Grid container> 
            {list.map(x => 
              <PhoneCard key={x.id} name={x.name} images={["/phone.jpg","/phone2.jpg","/phone3.jpg"]}price="1500$" discount="1200$" id={x.id} />
            )}
        </Grid>
    )
} 

export default PhoneList;