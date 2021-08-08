import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Typography, Button} from '@material-ui/core';

const NoPhones = ({currentPage} : {currentPage: string}) => {
  return (
    <>
    {currentPage === "My Phones" || currentPage === "My Bids" ? (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Image src="/no_phones.svg" height="500" width="500"/>
        <Typography variant="h4" style={{color: "#0cafe5"}}>
          Couldn't find any {currentPage === "My Phones" ? "phones" : "bids"} !
        </Typography>
       <Link href={`${(currentPage === "My Phones" ? "phone" : "bid") + "/add"}`}>
          <Button>Add new {currentPage === "My Phones" ? "phone" : "bid"}</Button>
       </Link>
      </div>
    ) : (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Image src="/no_bought_phones.svg" height="500" width="500"/>
        <Typography variant="h4" style={{color: "#0cafe5"}}>
          Couldn't find any {currentPage === "Bought Phones" ? "bought phones" : "placed bids"} !
        </Typography>
       <Link href={`${currentPage === "Bought Phones" ? "/phones/1" : "/bids/1"}`}>
          <Button>{currentPage === "Bought Phones" ? "Buy a new phone" : "Place a new bid"}</Button>
       </Link>
      </div>
    )}
      
    </>
  )
}

export default NoPhones
