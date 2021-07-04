import { Grid } from "@material-ui/core";
import PhoneList from '../components/PhoneSearch/PhoneList';
import CategoryBar from '../components/PhoneSearch/CategoryBar';

const phones = () => {

    return ( 
        <Grid container>
            <Grid item xs={3}>
                <CategoryBar/>
            </Grid> 
            <Grid item xs={9}>
                <PhoneList/>
            </Grid> 
        </Grid>
    )
}

export default phones;