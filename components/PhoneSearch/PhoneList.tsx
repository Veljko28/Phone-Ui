import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';
import { PhoneCard } from '../PhoneCard';

const PhoneList = () => {
    const list = useSelector((state: State ) => state.phones.list);

    return (
        <Grid container> 
            {list.map(x => (
             <Grid item xs={12} sm={6} lg={4} key={x.id} >
                <PhoneCard name={x.name} images={["/phone.jpg","/phone2.jpg","/phone3.jpg"]}price="1500$" discount="1200$" id={x.id} />
              </Grid>
            ))}
        </Grid>
    )
} 

export default PhoneList;