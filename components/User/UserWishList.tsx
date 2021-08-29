import React from 'react';
import Link from 'next/link';
import { Button, Grid, Typography } from '@material-ui/core';

import Phone from '../models/Phone';
import { fetchDelete, fetchPost } from '../../constants/CustomFetching';
import { blue, darker_green, dark_cont, dark_gray, gray, red, white } from '../../constants/CustomColors';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';



const UserWishList = ({id} : {id: string}) => {

  const darkMode = useSelector((state: State) => state.userInfo.darkMode);


  const [list, changeList] = React.useState<any[]>([]);
  const [type, changeType] = React.useState<string>("phone");


  const fetchList = async () => {
      const res = await fetchPost(`http://localhost:10025/api/v1/wishlist/get`, {userId: id, type});
      if (res.ok){
        changeList(await res.json());
      }
      else changeList([]);
  }

  const removeFromWishList = async (phoneId: string) => {
     const res = await fetchDelete(`http://localhost:10025/api/v1/wishlist/remove`, {userId: id, phoneId});
     if (res.ok){
       await fetchList();
     }
  }

    React.useEffect(() => {
      const func = async () => {
        await fetchList();
      }

      if (id) func();
    },[id, type])


    const ListingMap = ({id,image,name,description}: Phone) => {

        return (
          <Grid container>
                <Link href={`/${type}/${id}`} key={id}>
                  <Grid xs={12} md={4} item className="review-grid-item">
                    <div className="curs-hvr">
                      <img src={image} width="100px" height="100px" />
                    </div>
                  </Grid>
                </Link>
                <Grid xs={12} md={8} item className="listing-grid-item">
                    <Link href={`/${type}/${id}`} key={id}>
                        <>
                          <Typography variant="subtitle1" style={{color: darkMode ? darker_green : blue}} className="curs-hver">
                            {name}
                          </Typography>

                          <Typography variant="subtitle2" style={{color: darkMode ? gray : dark_gray}}>
                            {description}
                          </Typography>
                        </>
                      </Link>
                      <div onClick={async () => await removeFromWishList(id)}
                      style={{fontSize: 13, color: red, width: 50, marginTop: 10}} className="curs-hver">Remove</div>
                  </Grid>
            </Grid>
        )
      }

    return list.length === 0 ? ( <Grid style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: darkMode ? dark_cont : white,height: 410, marginTop: 10}}>
       <Typography style={{color:  darkMode ? darker_green : blue, marginBottom: 25}} variant="h3">There are no {type}s in your wish list !</Typography>
        <Button variant="contained" style={{backgroundColor:  darkMode ? darker_green : blue, color: white, width: 200}} onClick={() => type === "phone" ? changeType("bid") : changeType("phone")}>{type === "phone" ? "bids" : "phones"}</Button>
       </Grid>
    ) : (
      <div style={{display: 'flex',flexDirection: 'column', alignItems: 'flex-end'}}>
        <Grid className={darkMode ? "phone-details-dark" : "phone-details"} container style={{marginTop: 10, marginBottom: 10}}>
            { list.map((x: Phone) => ListingMap(x) )}
        </Grid>
        <Button variant="contained" style={{backgroundColor:  darkMode ? darker_green : blue, color: white, width: 100}} onClick={() => type === "phone" ? changeType("bid") : changeType("phone")}>{type === "phone" ? "bids" : "phones"}</Button>
      </div>
    );
}

export default UserWishList;