import React from 'react';
import Link from 'next/link';
import { Grid, Typography } from '@material-ui/core';

import { fetchGet } from '../../constants/CustomFetching';
import { blue, dark_gray } from '../../constants/CustomColors';



const UserListings = ({id} : {id: string}) => {

    const [list,changeList] = React.useState([]);

    React.useEffect(() => {
      const func = async () => {
        const res = await fetchGet(`http://localhost:10025/api/v1/phones/seller/${id}/1`);
        const json = await (res as Response).json();
        changeList(json.splice(0,3));
      }

      if (id) func();
    }, [id]);


    const ListingMap = ({id,image,name,description} :  
      {id: number, image: string, name: string, description: string}) => {
        return (
            <Link href={`/phone/${id.toString()}`} key={id}>
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
        <Grid className="phone-details" container style={{marginTop: 10, marginBottom: 10}}>
                {list.map(x => ListingMap(x) )}
        </Grid>
    );
}

export default UserListings;