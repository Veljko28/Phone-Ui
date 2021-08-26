import React from 'react'

import { Button, Typography } from '@material-ui/core'
import { blue, white } from '../../../constants/CustomColors'
import { timeLeft } from '../../../constants/formatDate'

import HistoryIcon from '@material-ui/icons/History';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

import Bid from '../../models/Bid'
import BidHistory from '../BidHistory'

const BidInfo = ({bidAmount, changeBidAmount, phone, changeDialogOpen, historyOpen, history, closeHistory, openHistory, anchorEl} : any) => {
  return (
    <div>
      <span style={{fontSize: '12px'}}>Your Bid</span>
      <input type="number"
      value={bidAmount}
      onChange={e => changeBidAmount(e.target.value as any)}
      min={phone ? (phone?.price as number)+1 : 1}
      className="bid-price"/>
      <Button variant="contained" onClick={() => changeDialogOpen(true)}
      style={{backgroundColor: blue, color: white, padding: '15px', marginTop: '10px'}}>
      <MonetizationOnIcon style={{fontSize: '20px', marginRight: '5px'}}/>Bid {bidAmount}$</Button>
      <div 
      onClick={e => openHistory(e)} className="bid-history">
      <HistoryIcon style={{fontSize: '20px', marginRight: '5px'}}/>Bid History ({history?.length})
      </div>
      <BidHistory open={historyOpen} history={history} handleClose={() => closeHistory()} anchorEl={anchorEl}/>
      <Typography variant="subtitle1" style={{color: blue}}>Ends in: {timeLeft((phone as Bid)?.date_Ends)}</Typography>
    </div>
  )
}

export default BidInfo;
