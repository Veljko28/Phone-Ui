import { Grid, Typography} from '@material-ui/core';
import Image from 'next/image';
import ColoredLine  from '../../constants/ColoredLine';

const ContactSubBar = () => {
    
    return (    
        <Grid container className="sub-bar-container">

            <Grid item xs={12} md={12}>
                <Typography variant="h6">How Can We Help You ?</Typography>
                <ColoredLine color="#eee"/>
            </Grid>
            <Grid item xs={12} md={6}>
                <div style={{float: 'left', marginTop: '10px'}}>
                <Image src="/contact/contact1.png" width="50" height="50" />
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Typography variant="subtitle1" style={{margin: '10px'}}>Sales Inquiry</Typography>
                    <Typography variant="subtitle2" style={{margin: '10px'}}>
                    If you have any questions about loyality points and the sales they 
                    provide contact our support team.
                    </Typography>
                </div>
            </Grid>
            <Grid item xs={12} md={6}>
               <div style={{float: 'left', marginTop: '10px'}}>
                 <Image src="/contact/contact2.png" width="50" height="50"/>
              </div>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Typography variant="subtitle1" style={{margin: '10px'}}>24/7 Support</Typography>
                    <Typography variant="subtitle2" style={{margin: '10px'}}>
                    Contact our support team at any time of the day and get fast and 
                    reliable feedback about your problem.
                    </Typography>
                </div>
            </Grid>

        </Grid>
    );
}

export default ContactSubBar;