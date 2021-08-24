import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { Grid, Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { fetchGet } from '../../constants/CustomFetching';
import Loading from '../../components/Loading';
import { blue, dark_gray, white } from '../../constants/CustomColors';
import SearchSkeleton from '../../components/Skeletons/SearchSkeleton';


const search = () => {

  const router = useRouter()
  const id = router.query['id']

  const initState = {
    phones: [],
    bids: [],
    users: []
  };

  const [data,changeData] = React.useState(initState);
  const [loading, changeLoading] = React.useState(true);

  React.useEffect(() => {
      const func = async () => {
        changeLoading(true);
        const res = await fetchGet(`http://localhost:10025/api/v1/generic/search/${id}`);

        if (res && (res as Response).ok){
            const json = await (res as Response).json();
            if (json !== initState) changeData(json);
        }
        else console.log('error');

        // changeLoading(false);
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
                        <Typography variant="subtitle1" style={{color: blue}} className="curs-hver">
                          {name}
                        </Typography>

                        <Typography variant="subtitle2" style={{color: dark_gray}}>
                          {description}
                        </Typography>
                         <Typography variant="subtitle1" style={{display: 'flex', justifyContent: 'space-between'}}>
                           <div style={{color: '#43cf22'}}>
                              {price+"$"}   
                           </div>
                           <div style={{color: blue, marginRight: 15}}>
                              {type}
                           </div>
                        </Typography>
                  </Grid>
               </Grid>
            </Link>
        )
      }

      const UserMap = ({id,userName,description,phones_sold} :  
      {id: number, userName: string, description: string, phones_sold: string}) => {
        return (
            <Link href={`/user/${id.toString()}`} key={id}>
              <Grid container className="curs-hver" style={{width: '80%'}}>
                    <Grid xs={12} md={4} item className="review-grid-item">
                      <div className="curs-hvr">
                        <img src='/user.png' width="100px" height="100px" />
                      </div>
                    </Grid>
                  <Grid xs={12} md={8} item className="listing-grid-item">
                        <Typography variant="subtitle1" style={{color: blue}} className="curs-hver">
                          {userName}
                        </Typography>

                        <Typography variant="subtitle2" style={{color: dark_gray}}>
                          {description ? description : "This user has no description"}
                        </Typography>
                         <Typography variant="subtitle1" style={{display: 'flex', justifyContent: 'space-between'}}>
                           <div style={{color: blue}}>
                              Phones Sold: {phones_sold}   
                           </div>
                           <div style={{color: blue, marginRight: 15}}>
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
      {
      data.phones.length === 0 && data.bids.length === 0 && data.users.length === 0 ? 
      loading ?
       <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%',paddingBottom: 150 , backgroundColor: white}}>
            <Typography variant="h6" style={{color: blue, marginTop: 15}}>Results for {id}</Typography>
            <SearchSkeleton/>
            <SearchSkeleton/>
            <SearchSkeleton/>
      </div>
            :
            (
       <div style={{backgroundColor: white, display: 'flex', alignItems: 'center', flexDirection: 'column', paddingBottom: 150}}>
         <Typography variant="h2" style={{color: blue, padding: 15}}>Couldn't find anything with this name</Typography> 
         <Image src="/search_fail.svg" width="500px" height="500px"/>
         <Link href="/">
            <div className="shopping-button">
              <ArrowBackIosIcon style={{fontSize: '15px',marginBottom: '5px'}}/>
              BACK TO HOME
            </div>
         </Link>
       </div>
       ): (
        <div style={{paddingBottom: 150, backgroundColor: white,display: 'flex',flexDirection: 'column', alignItems: 'center', minHeight: 650}}>
        <Typography variant="h6" style={{color: blue, marginTop: 15}}>Results for {id}</Typography>
        {data.phones.map(x => ListingMap({phone: x, type: "Listing"}))}
        {data.bids.map(x => ListingMap({phone: x, type: "Bid"}))}
        {data.users.map(x => UserMap(x))}
        </div>)}
     
    </>
  )
}

export default search
