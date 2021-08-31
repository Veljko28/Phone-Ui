import Rating from '@material-ui/lab/Rating';
import { Grid, Typography, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';


import ColoredLine from '../../constants/ColoredLine';
import { blue, darker_green, dark_gray, gray } from '../../constants/CustomColors';
import React from 'react';
import { fetchGet } from '../../constants/CustomFetching';
import { formatDate } from '../../constants/formatDate';

const ReviewMap = ({id, rating, userId, dateCreated, message, userName,  darkMode, idx}
    : {id: string, rating: number, userId: string, dateCreated: Date, message: string, userName:string, darkMode: boolean, idx: number}) => {

        const hasLine = (id : string) => {
            if (idx == 2){
                return <ColoredLine color="#eee"/>
            }
            else return "";
        }

    return (
        <Grid container style={{padding: 23}} key={id}>
            <div>
            <Rating name="phone-rating" value={rating} precision={0.1} readOnly
                     style={{fontSize: '16px', margin: '10px'}}/>
                    <span style={{color: dark_gray, marginLeft: '10px'}}>By 
                    <span style={{color: darkMode ? darker_green : blue}}> {userName} </span>on {formatDate(dateCreated)}</span>
            </div>
            <div style={{color: darkMode ? gray : dark_gray, padding: '10px'}}>
                {message}
            </div>
            {hasLine(id)}
        </Grid>
    );
}

const UserReviews = ({userId} : {userId: string}) => {

    const darkMode = useSelector((state: State) => state.userInfo.darkMode);
    const [reviews,changeReviews] = React.useState([]);

    React.useEffect(() => {
        const func = async () => {
            const res = await fetchGet(`http://localhost:10025/api/v1/reviews/${userId}`);

            const json = await res.json();
            const temp = json.slice(0,3);

            changeReviews( temp.map((x: any) => {
                let userName = "";
                const func2 = async () => {
                    const res = fetchGet(`http://localhost:10025/api/v1/users/username/${userId}`);
                    if (res.ok){
                      userName = await res.text(); // map username to user reviews
                    }
                }
                func2();

                return {...x,userName};
            })
            );
        } 

        if (userId) func();
    },[userId])

    console.log(reviews);
    const reviewsTest = [
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
        <Grid className={darkMode ? "phone-details-dark" : "phone-details"} container style={{marginTop: 15}}> 
            {reviews.map((x: any, idx) => ReviewMap({...x,darkMode, idx}))}
        </Grid>
    )
}

export default UserReviews;