import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { Typography } from '@material-ui/core';
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

  const BlockMap = (title: string, array: any[], type: number) => {
    return array.length === 0 ? null : (
        <div>
        <Typography variant="h4" style={{color: '#0cafe5', padding: 15, textAlign: 'center'}}>{title}</Typography>
          <ColoredLine color="#eee"/>
        <div style={{display: 'flex', justifyContent: 'center', padding: 25}}>

          {array.length > 0  && type == 0 ? array.map(x => (
              <PhoneCard name={x.name} key={x.id}
              image={x.image ? x.image : "phone.jpg"} price={x.price} id={x.id} />
            )) : null}


            {array.length > 0  && type === 1 ? array.map(x => (
              <BidCard name={x.name} key={x.id} image={x.image as string} price={x.price}
                  ends={x.timeEnds} id={x.id} />
            )) : null}

            {array.length > 0  && type === 2 ? array.map((x: any) => (
            <UserCard search={true} image={x.image ? x.image : "/user.png"} name={x.userName} desc="" rating={4.6} id={x.id as string}/>
            )) : null}


        </div>
      </div>
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
        <div style={{paddingBottom: 150, backgroundColor: '#fff'}}>
        {BlockMap("Phones",data.phones.slice(0,4), 0)}
        {BlockMap("Bids",data.bids.slice(0,4), 1)}
        {BlockMap("Users",data.users.slice(0,4), 2)}
        </div>)}
     
    </>
  )
}

export default search
