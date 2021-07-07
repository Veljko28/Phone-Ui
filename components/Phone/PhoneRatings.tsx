import { Grid, Typography, Button } from '@material-ui/core';
import ColoredLine from '../../constants/ColoredLine';
import Rating from '@material-ui/lab/Rating';


const PhoneRatings = ({executeScroll} : {executeScroll: () => any}) => {

    return (
        <Grid className="phone-details" container>
             <Typography variant="h6" style={{margin: '10px', marginLeft: '40px',
        color: '#0cafe5'}}>Ratings and Reviews</Typography>
            <ColoredLine color="#eee"/>
            <Grid xs={12} container item>
                <Grid xs={12} md={4} item className="review-grid-item">
                    <Typography variant="h4">4.6</Typography>
                    <Rating name="phone-rating" value={4.6} precision={0.1} readOnly
                     style={{fontSize: '20px', marginBottom: '20px'}}/>
                    <Typography variant="subtitle2" style={{color: '#999'}}>
                        20 Ratings &#38; 10 Reviews
                    </Typography>
                </Grid>
                <Grid xs={12} md={4} item className="review-grid-item">
                    <Typography variant="h4" style={{ marginBottom: '10px' }}>80%</Typography>
                    <Typography variant="subtitle2" style={{color: '#999'}}>
                        Based on 20 Recommendations.
                    </Typography>
                </Grid>
                <Grid xs={12} md={4} item className="review-grid-item">
                    <Typography variant="subtitle1" style={{ marginBottom: '10px' }}>
                        Have you used this product?
                    </Typography>
                    <Button variant="contained" onClick={() => executeScroll()}
                    style={{color: '#fff', backgroundColor: '#0cafe5', padding: '10px'}}>Review</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default PhoneRatings;