import React from 'react';
import Link from 'next/link';
import Rating from '@material-ui/lab/Rating';
import { Grid, Typography, Button } from '@material-ui/core';
import ColoredLine from '../../constants/ColoredLine';
import { fetchGet } from '../../constants/CustomFetching';

const ReviewMap = ({id, rating, userId, dateCreated, message, userName}
    : {id: string, rating: number, userId: string, dateCreated: Date, message: string, userName: string}) => {

        const hasLine = (id : string) => {
            if (id !== '3'){
                return <ColoredLine color="#eee"/>
            }
            else return "";
        }

        const str = dateCreated?.toString().split('T')[0].replace(/-/g,"/");
        const date = {
            year: str?.slice(0,4),
            month: str?.slice(5,7),
            day: str?.slice(8,10)
        }

    return (
        <Grid container style={{padding: '10px'}} key={id}>
            <div>
            <Rating name="phone-rating" value={rating} precision={0.1} readOnly
                     style={{fontSize: '16px', margin: '10px'}}/>
                    <span style={{color: '#999', marginLeft: '10px'}}>By 
                    <Link href={`/user/${userId}`}><span style={{color: "#0cafe5"}} className="curs-hvr"> {userName} </span></Link>on  
                    {" " + date.day + "/" + date.month + "/" + date.year}</span>
            </div>
            <br/>
            <div style={{color: '#999', padding: '10px'}}>
                {message}
            </div>
            {hasLine(id)}
        </Grid>
    );
}

const PhoneReviews = ({phoneId} : {phoneId: string}) => {

   const [reviews, changeReviews] = React.useState([]);


    React.useEffect(() => {
        const func = async () => {
            const res =  await fetchGet(`http://localhost:10025/api/v1/phones/reviews/${phoneId}`);

            if (res && res.ok){
                changeReviews( await res.json());

            }
        };

        if (phoneId) func();
    },[phoneId])

    return (
        <Grid className="phone-details" container> 
            <Typography variant="h6" style={{margin: '10px', marginLeft: '40px',
            color: '#0cafe5'}}>Customer Reviews</Typography>
            <ColoredLine color="#eee"/>
            {reviews.length !== 0 ? reviews.map( (x: any) => {

                  const func = async () => {
                        const userNameGet = await fetchGet(`http://localhost:10025/api/v1/users/username/${x.userId}`);

                        if (userNameGet && userNameGet.ok) {
                            x.userName = await userNameGet.text();
                        }
                    }

                    func();
                    return ReviewMap(x)
                }) : <div>
            <Typography variant="h5" style={{margin: 30,color: '#0cafe5'}}>
              Failed to find any reviews for this product !
            </Typography></div>}
        </Grid>
    )
}

export default PhoneReviews;