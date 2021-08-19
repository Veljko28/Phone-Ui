import React from 'react';
import Link from 'next/link';
import { Button, Grid, Typography } from '@material-ui/core';

import Phone from '../models/Phone';
import { fetchPost } from '../../constants/CustomFetching';
import { blue, dark_gray, white } from '../../constants/CustomColors';



const UserWishList = ({id} : {id: string}) => {

  const [list, changeList] = React.useState<any[]>([]);
  const [type, changeType] = React.useState<string>("phone");


  const fetchList = async () => {
      const res = await fetchPost(`http://localhost:10025/api/v1/wishlist/get`, {userId: id, type});
      if (res.ok){
        changeList(await res.json());
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
            <Link href={`/${type}/${id}`} key={id}>
              <Grid container>
                  <Grid xs={12} md={4} item className="review-grid-item">
                    <div className="curs-hvr">
                      <img src={image} width="100px" height="100px" />
                    </div>
                  </Grid>
                <Grid xs={12} md={8} item className="listing-grid-item">
                      <Typography variant="subtitle1" style={{color: blue}} className="curs-hver">
                        {name}
                      </Typography>

                      <Typography variant="subtitle2" style={{color: dark_gray}}>
                        {description}
                      </Typography>
                </Grid>
               </Grid>
            </Link>
        )
      }

    return (
      <div style={{display: 'flex',flexDirection: 'column', alignItems: 'flex-end'}}>
        <Grid className="phone-details" container style={{marginTop: 10, marginBottom: 10}}>
            {list.map((x: Phone) => ListingMap(x) )}
        </Grid>
        <Button variant="contained" style={{backgroundColor: blue, color: white, width: 100}} onClick={() => type === "phone" ? changeType("bid") : changeType("phone")}>{type}</Button>
      </div>
    );
}

export default UserWishList;