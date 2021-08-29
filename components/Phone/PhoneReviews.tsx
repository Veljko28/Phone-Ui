import React from 'react';
import Link from 'next/link';
import Rating from '@material-ui/lab/Rating';
import { Grid, Typography } from '@material-ui/core';

import ColoredLine from '../../constants/ColoredLine';
import { fetchGet } from '../../constants/CustomFetching';
import { blue, darker_green, dark_gray, gray } from '../../constants/CustomColors';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';

const ReviewMap = ({id, rating, userId, dateCreated, message, userName, darkMode}
    : {id: string, rating: number, userId: string, dateCreated: Date, message: string, userName: string, darkMode: boolean}) => {

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
                    <span style={{color: dark_gray, marginLeft: '10px'}}>By 
                    <Link href={`/user/${userId}`}><span style={{color: darkMode ? darker_green : blue}} className="curs-hvr"> {userName} </span></Link>on  
                    {" " + date.day + "/" + date.month + "/" + date.year}</span>
            </div>
            <br/>
            <div style={{color: darkMode ? gray : dark_gray, padding: '10px'}}>
                {message}
            </div>
            {hasLine(id)}
        </Grid>
    );
}

const PhoneReviews = ({phoneId} : {phoneId: string}) => {

   const [reviews, changeReviews] = React.useState([]);
   const darkMode = useSelector((state: State) => state.userInfo.darkMode);

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
        <Grid className={darkMode ? "phone-details-dark" : "phone-details"} container> 
            <Typography variant="h6" style={{margin: '10px', marginLeft: '40px',
            color: darkMode ? darker_green : blue}}>Customer Reviews</Typography>
            <ColoredLine color={gray}/>
            {reviews.length !== 0 ? reviews.map( (x: any) => {

                  const func = async () => {
                        const userNameGet = await fetchGet(`http://localhost:10025/api/v1/users/username/${x.userId}`);

                        if (userNameGet && userNameGet.ok) {
                            x.userName = await userNameGet.text();
                        }
                    }

                    func();
                    return ReviewMap({...x,darkMode})
                }) : <div>
            <Typography variant="h5" style={{margin: 30,color: darkMode ? darker_green : blue}}>
              Couldn't find any reviews for this product !
            </Typography></div>}
        </Grid>
    )
}

export default PhoneReviews;