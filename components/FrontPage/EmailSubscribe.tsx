import { Grid, Typography } from '@material-ui/core';

const EmailSubscribe = () => {
    return (
        <Grid container className="subscribe-form" justify="center">
                <Typography variant="h5" style={{color: '#fff'}}>
                    Subscribe To Get Discounts &#38; Offers</Typography>
                <div className="subscribe-input">
                    <input type="text" className="subscribe-input-field" placeholder="Your Email" />
                    <button type="submit" className="subscribe-button">
                        Subscribe
                    </button>
                </div>
        </Grid>
    );
}

export default EmailSubscribe;