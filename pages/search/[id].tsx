import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { Grid, Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { BidCard } from '../../components/BidCard';
import UserCard from '../../components/User/UserCard';
import { PhoneCard } from '../../components/PhoneCard';

import ColoredLine from '../../constants/ColoredLine';
import { fetchGet } from '../../constants/CustomFetching';


const search = () => {

  const router = useRouter()
  const id = router.query['id']

  const initState = {
    phones: [],
    bids: [],
    users: []
  };

  const [data,changeData] = React.useState(initState);

  React.useEffect(() => {
      const func = async () => {
        const res = await fetchGet(`http://localhost:10025/api/v1/generic/search/${id}`);

        if ((res as Response).ok){
            const json = await (res as Response).json();
            if (json !== initState) changeData(json);
        }
        else console.log('error');
      }

      func();
  },[id])

    const ListingMap = ({phone: {id,image,name,description, price}, type} :  
      {phone: {id: number, image: string, name: string, description: string, price: string}, type: string}) => {
        return (
            <Link href={`/${type === "Bid" ? "bid" : "phone"}/${id.toString()}`} key={id}>
              <Grid container style={{width: '80%'}}>
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
                         <Typography variant="subtitle1" style={{display: 'flex', justifyContent: 'space-between'}}>
                           <div style={{color: '#43cf22'}}>
                              {price+"$"}   
                           </div>
                           <div style={{color: '#0cafe5', marginRight: 75}}>
                              {type}
                           </div>
                        </Typography>
                  </Grid>
               </Grid>
            </Link>
        )
      }

      const UserMap = ({id,image,userName,description,phones_sold} :  
      {id: number, image: string, userName: string, description: string, phones_sold: string}) => {
        return (
            <Link href={`/phone/${id.toString()}`} key={id}>
              <Grid container style={{width: '80%'}}>
                    <Grid xs={12} md={4} item className="review-grid-item">
                      <div className="curs-hvr">
                        <img src={'/user.png'} width="100px" height="100px" />
                      </div>
                    </Grid>
                  <Grid xs={12} md={8} item className="listing-grid-item">
                        <Typography variant="subtitle1" style={{color: '#0cafe5'}} className="curs-hver">
                          {userName}
                        </Typography>

                        <Typography variant="subtitle2" style={{color: '#999'}}>
                          {description ? description : "This user has no description"}
                        </Typography>
                         <Typography variant="subtitle1" style={{display: 'flex', justifyContent: 'space-between'}}>
                           <div style={{color: '#0cafe5'}}>
                              Phones Sold: {phones_sold}   
                           </div>
                           <div style={{color: '#0cafe5', marginRight: 75}}>
                              User
                           </div>
                        </Typography>
                  </Grid>
               </Grid>
            </Link>
        )
      }

  return (
    <>
      {data.phones.length === 0 && data.bids.length === 0 && data.users.length === 0 ? (
       <div style={{backgroundColor: '#fff', display: 'flex', alignItems: 'center', flexDirection: 'column', paddingBottom: 150}}>
         <Typography variant="h2" style={{color: '#0cafe5', padding: 15}}>Couldn't find anything with this name</Typography> 
         <Image src="/search_fail.svg" width="500px" height="500px"/>
         <Link href="/">
            <div className="shopping-button">
              <ArrowBackIosIcon style={{fontSize: '15px',marginBottom: '5px'}}/>
              BACK TO HOME
            </div>
         </Link>
       </div>
       ): (
        <div style={{paddingBottom: 150, backgroundColor: '#fff',display: 'flex',flexDirection: 'column', alignItems: 'center', minHeight: 600}}>
        <Typography variant="h6" style={{color: '#0cafe5', marginTop: 15}}>Results for {id}</Typography>
        {data.phones.slice(0,4).map(x => ListingMap({phone: x, type: "Listing"}))}
        {data.bids.slice(0,4).map(x => ListingMap({phone: x, type: "Bid"}))}
        {data.users.slice(0,4).map(x => UserMap(x))}
        </div>)}
     
    </>
  )
}

export default search
