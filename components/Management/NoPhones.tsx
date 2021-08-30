import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Typography, Button} from '@material-ui/core';
import { blue, darker_green, gray } from '../../constants/CustomColors';

const NoPhones = ({currentPage, darkMode} : {currentPage: string, darkMode: boolean}) => {
  return (
    <>
    {currentPage === "My Phones" || currentPage === "My Bids" ? (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Image src={darkMode ? "/no_phones_dark.svg": "/no_phones.svg"} height="500" width="500"/>
        <Typography variant="h4" style={{color: darkMode ? darker_green : blue}}>
          Couldn't find any {currentPage === "My Phones" ? "phones" : "bids"} !
        </Typography>
       <Link href={`${(currentPage === "My Phones" ? "phone" : "bid") + "/add"}`}>
          <Button style={{color: darkMode ? gray : 'black'}}>Add new {currentPage === "My Phones" ? "phone" : "bid"}</Button>
       </Link>
      </div>
    ) : (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Image src={darkMode ? "/no_bought_phones_dark.svg" : "/no_bought_phones.svg"} height="500" width="500"/>
        <Typography variant="h4" style={{color: darkMode ? darker_green : blue}}>
          Couldn't find any {currentPage === "Bought Phones" ? "bought phones" : "placed bids"} !
        </Typography>
       <Link href={`${currentPage === "Bought Phones" ? "/phones/1" : "/bids/1"}`}>
          <Button style={{color: darkMode ? gray : 'black'}}>{currentPage === "Bought Phones" ? "Buy a new phone" : "Place a new bid"}</Button>
       </Link>
      </div>
    )}
      
    </>
  )
}

export default NoPhones
