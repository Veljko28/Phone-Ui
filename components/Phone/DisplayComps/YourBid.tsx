import React from 'react'
import Bid from '../../models/Bid';
import { Typography } from '@material-ui/core'
import HistoryIcon from '@material-ui/icons/History';

import BidHistory from '../BidHistory'
import { blue, darker_green } from '../../../constants/CustomColors';
import { timeLeft } from '../../../constants/formatDate';

const YourBid = ({openHistory, historyOpen, history, closeHistory, anchorEl, phone, darkMode, t} : any) => {

  const time = timeLeft((phone as Bid)?.date_Ends);

  return (
    <div>
      <Typography variant="h6" style={{color: darkMode ? darker_green : blue}}>{t("display.yourBid")}</Typography>
        <div 
          onClick={e => openHistory(e)} className={darkMode ? "bid-history-dark" : "bid-history"}>
          <HistoryIcon style={{fontSize: '20px', marginRight: '5px'}}/>{t("display.bidHistory")} ({history?.length})
        </div>
        <BidHistory darkMode={darkMode} open={historyOpen} history={history} handleClose={() => closeHistory()} anchorEl={anchorEl}/>
        <Typography variant="subtitle1" style={{color: blue}}>{t("bidCard.ends")}: {time === "finished" ? t("bidCard." + time) : time}</Typography>
    </div>
  )
}

export default YourBid
