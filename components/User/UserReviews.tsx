import Rating from '@material-ui/lab/Rating';
import { Grid, Typography, Button } from '@material-ui/core';

import ColoredLine from '../../constants/ColoredLine';
import { blue, dark_gray } from '../../constants/CustomColors';

const ReviewMap = ({id, rating, user, date, message}
    : {id: string, rating: number, user: string, date: string, message: string}) => {

        const hasLine = (id : string) => {
            if (id !== '3'){
                return <ColoredLine color="#eee"/>
            }
            else return "";
        }

    return (
        <Grid container style={{padding: '10px'}} key={id}>
            <div>
            <Rating name="phone-rating" value={rating} precision={0.1} readOnly
                     style={{fontSize: '16px', margin: '10px'}}/>
                    <span style={{color: dark_gray, marginLeft: '10px'}}>By 
                    <span style={{color: blue}}> {user} </span>on {date}</span>
            </div>
            <div style={{color: dark_gray, padding: '10px'}}>
                {message}
            </div>
            {hasLine(id)}
        </Grid>
    );
}

const UserReviews = () => {

    const reviews = [
        {
            id: '1',
            rating: 5,
            user: 'John Smith',
            date: '4 July 2021',
            message: "I'm so happy with the purchase the device was very clean " +
            "and almost scratch free just as the photos indicated. I'll start by saying this is a very nice phone."
            + "The 4 gb of RAM makes a huge difference in speed and overall performance,"
        },
        {
            id: '2',
            rating: 4,
            user: 'Mary Sue',
            date: '1 July 2021',
            message: "I had the nexus 6p for a few years and I loved that phone. But I recently started" + 
            " looking for a smaller, faster and newer alternative." +
            " I love Google phones so pixel was the obvious choice. "
        },
        {
            id: '3',
            rating: 5,
            user: 'Thomas Burr',
            date: '27 Jun 2021',
            message: "This was a replacement phone for a lost one. Didn’t want to pay full price." +
            " This one was new and unlocked. Son has had it since February and it works great."
        },
    ]

    return (
        <Grid className="phone-details" container style={{marginTop: 15}}> 
            {reviews.map(x => ReviewMap(x))}
        </Grid>
    )
}

export default UserReviews;