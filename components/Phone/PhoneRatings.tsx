import Rating from '@material-ui/lab/Rating';
import { Grid, Typography, Button } from '@material-ui/core';

import ColoredLine from '../../constants/ColoredLine';
import { blue, dark_gray, gray, white, darker_green } from '../../constants/CustomColors';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';
import User from '../models/User';


const PhoneRatings = ({user, t} : {user: User, t: any}) => {

    const darkMode = useSelector((state: State) => state.userInfo.darkMode);

    return (
        <Grid className={darkMode ? "phone-details-dark" : "phone-details"} container>
             <Typography variant="h6" style={{margin: '10px', marginLeft: '40px',
        color: darkMode ? darker_green : blue}}>{t("reviews.title")}</Typography>
            <ColoredLine color={gray}/>
            <Grid xs={12} container item>
                <Grid xs={12} md={4} item className="review-grid-item">
                    <Typography variant="h4" style={{color: darkMode ? white : 'black'}}>{user?.rating}</Typography>
                    <Rating name="phone-rating" value={user?.rating ? parseFloat(user?.rating.toFixed(1)) : 0} precision={0.1} readOnly
                     style={{fontSize: '20px', marginBottom: '20px'}}/>
                    <Typography variant="subtitle2" style={{color: darkMode ? gray : dark_gray}}>
                        {t("reviews.based1", { sold: user?.phones_sold })}
                    </Typography>
                </Grid>
                <Grid xs={12} md={4} item className="review-grid-item">
                    <Typography variant="h4" style={{ marginBottom: '10px', color: darkMode ? white : 'black' }}>80%</Typography>
                    <Typography variant="subtitle2" style={{color: darkMode ? gray : dark_gray}}>
                        {t("reviews.based2")}
                    </Typography>
                </Grid>
                <Grid xs={12} md={4} item className="review-grid-item">
                    <Typography variant="subtitle1" style={{ marginBottom: '10px', color: darkMode ? white : 'black' }}>
                        {t("reviews.question")}
                    </Typography>
                    <Button variant="contained" 
                    // onClick={() => executeScroll()}
                    style={{color: white, backgroundColor: darkMode ? darker_green : blue, padding: '10px'}}>{t("reviews.button")}</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default PhoneRatings;