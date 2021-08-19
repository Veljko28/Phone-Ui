import { Grid, Typography } from '@material-ui/core';
import ColoredLine from '../../constants/ColoredLine';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { blue, gray } from '../../constants/CustomColors';

const PhoneDetails = () => {

    const items = ["Android 8.0", "Qualcomm Snapdragon 835","Fingerprint Sensor",
    '12.2 MP Rear | 8 MP Front Camera',
    '4GB RAM', "2700 mAh Battery"];
    
    return (
        <Grid className="phone-details" container>
            <Typography variant="h6" style={{margin: '10px', marginLeft: '40px',
        color: blue}}>Phone Details</Typography>
            <ColoredLine color={gray}/>
            <ul className="details-list">
                {items.splice(3).map(x => (
                    <li key={x}>
                    <ArrowForwardIosIcon style={{fontSize: '15px', margin: '5px', color: blue}}/>
                    {x}
                </li>
                ))}
            </ul>
            <ul className="details-list">
                {items.splice(0,3).map(x => (
                    <li key={x}>
                    <ArrowForwardIosIcon style={{fontSize: '15px', margin: '5px', color: blue}}/>
                    {x}
                </li>
                ))}
            </ul>
        </Grid>
    )
}

export default PhoneDetails;