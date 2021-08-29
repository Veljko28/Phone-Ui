import Rating from '@material-ui/lab/Rating';
import { Grid, Typography, Button } from '@material-ui/core';

import ColoredLine from '../../constants/ColoredLine';
import { blue, dark_gray, gray, white, darker_green } from '../../constants/CustomColors';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';


const PhoneRatings = () => {

    const darkMode = useSelector((state: State) => state.userInfo.darkMode);

    return (
        <Grid className={darkMode ? "phone-details-dark" : "phone-details"} container>
             <Typography variant="h6" style={{margin: '10px', marginLeft: '40px',
        color: darkMode ? darker_green : blue}}>Ratings and Reviews</Typography>
            <ColoredLine color={gray}/>
            <Grid xs={12} container item>
                <Grid xs={12} md={4} item className="review-grid-item">
                    <Typography variant="h4" style={{color: darkMode ? white : 'black'}}>4.6</Typography>
                    <Rating name="phone-rating" value={4.6} precision={0.1} readOnly
                     style={{fontSize: '20px', marginBottom: '20px'}}/>
                    <Typography variant="subtitle2" style={{color: darkMode ? gray : dark_gray}}>
                        20 Ratings &#38; 10 Reviews
                    </Typography>
                </Grid>
                <Grid xs={12} md={4} item className="review-grid-item">
                    <Typography variant="h4" style={{ marginBottom: '10px', color: darkMode ? white : 'black' }}>80%</Typography>
                    <Typography variant="subtitle2" style={{color: darkMode ? gray : dark_gray}}>
                        Based on 20 Recommendations.
                    </Typography>
                </Grid>
                <Grid xs={12} md={4} item className="review-grid-item">
                    <Typography variant="subtitle1" style={{ marginBottom: '10px', color: darkMode ? white : 'black' }}>
                        Have you used this product?
                    </Typography>
                    <Button variant="contained" 
                    // onClick={() => executeScroll()}
                    style={{color: white, backgroundColor: darkMode ? darker_green : blue, padding: '10px'}}>Review</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default PhoneRatings;