import Rating from '@material-ui/lab/Rating';
import { Grid, Typography, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';


import ColoredLine from '../../constants/ColoredLine';
import { blue, darker_green, dark_gray, gray, white } from '../../constants/CustomColors';
import React from 'react';
import { fetchGet } from '../../constants/CustomFetching';
import { formatDate } from '../../constants/formatDate';
import Link from 'next/link';


const UserReviews = ({userId, display} : {userId: string, display?: boolean}) => {

    const darkMode = useSelector((state: State) => state.userInfo.darkMode);
    const [reviews,changeReviews] = React.useState<any>([]);
    const [currentPage, changeCurrentPage] = React.useState(0);


    React.useEffect(() => {
        const func = async () => {
            const res = await fetchGet(`http://localhost:10025/api/v1/users/reviews/${userId}`);

            const json = await res.json();
            const temp = json.slice(0,3);

          

            if (display){
                changeReviews(temp);
            }
            else {
                  let pageList: any[] = [];
                  const listOfPages: any[] = [];
            
                  json.forEach((x: any, idx: number) => {
                  pageList.push(x);

                  if (pageList.length === 3 || idx === json.length-1 ) {
                    listOfPages.push(pageList);
                    pageList = [];
                  }
                  }) 

                changeReviews(listOfPages);
            }
        } 

        if (userId) func();
    },[userId])


    
const ReviewMap = ({id, rating, buyerId, dateCreated, message, userName,  darkMode, idx}
    : {id: string, rating: number, buyerId: string, dateCreated: Date, message: string, userName:string, darkMode: boolean, idx: number}) => {

        const hasLine = () => {
            if (idx !== 2){
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
                    <Link href={`/user/${buyerId}`}>
                        <span style={{color: darkMode ? darker_green : blue}} className="curs-hver"> {userName} </span>
                    </Link>
                        on {formatDate(dateCreated)}</span>
            </div>
            <div style={{color: darkMode ? gray : dark_gray, padding: '10px'}}>
                {message}
            </div>
            {hasLine()}
        </Grid>
    );
    }

    return ( <>
        <Grid className={darkMode ? "phone-details-dark" : "phone-details"} container style={{marginTop: 15}}> 
            {display ? reviews.map((x: any, idx: number) => ReviewMap({...x,darkMode, idx})) : 
             reviews[currentPage]?.map((x: any, idx: number) => ReviewMap({...x,darkMode, idx}))}
        </Grid>
        
            {!display && <span style={{display: 'inline-block',}}>
                      <div>
                        {currentPage !== 0 ? (
                        <Button variant="contained" style={{backgroundColor: darkMode ? darker_green : blue, color: white, margin: 5}}
                            onClick={() => changeCurrentPage(currentPage-1)}>
                            Prev
                        </Button>
                        ) : null}
                        <Button variant="contained" disabled style={{backgroundColor: darkMode ? "#326307" : '#0a85ae', color: white, margin: 5}}>
                            {currentPage+1}
                        </Button>
                        {currentPage < reviews.length-1 ? (
                            <Button variant="contained" style={{backgroundColor: darkMode ? darker_green : blue, color: white, margin: 5}} onClick={() => changeCurrentPage(currentPage+1)}>
                                Next
                            </Button>
                        ) : null}
                        </div>
                    </span>}

        </>
    )
}

export default UserReviews;