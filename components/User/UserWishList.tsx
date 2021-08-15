import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Grid, Typography } from '@material-ui/core';
import { fetchGet, fetchPost } from '../../constants/CustomFetching';
import Phone from '../models/Phone';



const UserWishList = ({id} : {id: string}) => {

  const [list, changeList] = React.useState<any>([]);
  const [type, changeType] = React.useState<string>("phone");

  React.useEffect(() => {
    const func = async () => {
      changeList([]);
      console.log(list);
      const res = await fetchPost(`http://localhost:10025/api/v1/wishlist/get`, {userId: id, type});

      if (res.ok){
        const phoneIds = await res.json();
        phoneIds.forEach(async (x: string) => {
          const phoneRes = await fetchGet(`http://localhost:10025/api/v1/${type}s/${x}`);

          if (phoneRes.ok){
            const newList = list;
            console.log(newList);
            newList.push(await phoneRes.json());
            changeList(newList);
          }
        })
      }
    }

    if (id) func();
  },[type])


    const ListingMap = ({id,image,name,description}: Phone) => {

        return (
            <Link href={`/phone/${id}`} key={id}>
              <Grid container>
                  <Grid xs={12} md={4} item className="review-grid-item">
                    <div className="curs-hvr">
                      <img src={image} width="100px" height="100px" />
                    </div>
                  </Grid>
                <Grid xs={12} md={8} item className="listing-grid-item">
                      <Typography variant="subtitle1" style={{color: '#0cafe5'}} className="curs-hver">
                        {name}
                      </Typography>

                      <Typography variant="subtitle2" style={{color: '#999'}}>
                        {description}
                      </Typography>
                </Grid>
               </Grid>
            </Link>
        )
      }

    return (
        <Grid className="phone-details" container style={{marginTop: 10, marginBottom: 10}}>
            {list.map((x: Phone) => ListingMap(x) )}
            <Button variant="contained" onClick={() => type === "phone" ? changeType("bid") : changeType("phone")}>{type}</Button>
        </Grid>
    );
}

export default UserWishList;