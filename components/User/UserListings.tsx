import { Grid, Typography } from '@material-ui/core';
import ColoredLine from '../../constants/ColoredLine';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { fetchGet } from '../../constants/CustomFetching';



const UserListings = ({id} : {id: string}) => {

    const [list,changeList] = React.useState([]);

    React.useEffect(() => {
      const func = async () => {
        const res = await fetchGet(`http://localhost:10025/api/v1/phones/seller/${id}`);
        const json = await (res as Response).json();
        console.log(json);
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
                {list.map(x => ListingMap(x) )}
        </Grid>
    );
}

export default UserListings;