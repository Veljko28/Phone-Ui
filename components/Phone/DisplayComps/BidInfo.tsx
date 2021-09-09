import React from 'react'

import { Button, Typography } from '@material-ui/core'
import { blue, white, gray, darker_green } from '../../../constants/CustomColors'
import { timeLeft } from '../../../constants/formatDate'

import HistoryIcon from '@material-ui/icons/History';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

import Bid from '../../models/Bid'
import BidHistory from '../BidHistory'

const BidInfo = ({bidAmount, changeBidAmount, phone, changeDialogOpen, historyOpen, history, closeHistory, openHistory, anchorEl, darkMode, t} : any) => {
  return (
    <div>
      <span style={{fontSize: '12px', color: darkMode ? gray : 'black'}}>{t("bidHistory.your")}</span>
      <input type="number"
      value={bidAmount}
      onChange={e => changeBidAmount(e.target.value as any)}
      min={phone ? (phone?.price as number)+1 : 1}
      className="bid-price"/>
      <Button variant="contained" onClick={() => changeDialogOpen(true)}
      style={{backgroundColor: darkMode ? darker_green : blue, color: white, padding: '15px', marginTop: '10px'}}>
      <MonetizationOnIcon style={{fontSize: '20px', marginRight: '5px'}}/>Bid {bidAmount}$</Button>
      <div 
      onClick={e => openHistory(e)} className={darkMode ? "bid-history-dark" : "bid-history"}>
      <HistoryIcon style={{fontSize: '20px', marginRight: '5px'}}/>{t("display.bidHistory")} ({history?.length})
      </div>
      <BidHistory darkMode={darkMode} open={historyOpen} history={history} handleClose={() => closeHistory()} anchorEl={anchorEl}/>
      <Typography variant="subtitle1" style={{color: blue}}>{t("bidCard.ends")}: {timeLeft((phone as Bid)?.date_Ends)}</Typography>
    </div>
  )
}

export default BidInfo;
