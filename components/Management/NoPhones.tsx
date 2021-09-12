import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Typography, Button} from '@material-ui/core';
import { blue, darker_green, gray } from '../../constants/CustomColors';
import { useTranslation } from 'react-i18next';

const NoPhones = ({currentPage, darkMode} : {currentPage: string, darkMode: boolean}) => {

  const { t } = useTranslation();

  return (
    <>
    {currentPage === "My Phones" || currentPage === "My Bids" ? (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Image src={darkMode ? "/no_phones_dark.svg": "/no_phones.svg"} height="500" width="500"/>
        <Typography variant="h4" style={{color: darkMode ? darker_green : blue}}>
          {t("noPhones.notFound")} {currentPage === "My Phones" ? t("userTabs.phone") : t("userTabs.bid")} !
        </Typography>
       <Link href={`${(currentPage === "My Phones" ? "phone" : "bid") + "/add"}`}>
          <Button style={{color: darkMode ? gray : 'black'}}>{t("noPhones.add")} {currentPage === "My Phones" ? t("userTabs.phone") : t("userTabs.bid")}</Button>
       </Link>
      </div>
    ) : (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Image src={darkMode ? "/no_bought_phones_dark.svg" : "/no_bought_phones.svg"} height="500" width="500"/>
        <Typography variant="h4" style={{color: darkMode ? darker_green : blue}}>
          {t("noPhones.notFound")} {currentPage === "Bought Phones" ? "bought phones" : "placed bids"} !
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
