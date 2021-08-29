import React from 'react'
import { Popover, Typography } from '@material-ui/core'

import BidHistoryModel from '../models/BidHistory'
import { blue, darker_green, dark_cont, white, gray } from '../../constants/CustomColors'

const BidHistory = ({open, anchorEl, handleClose, history, darkMode} : 
  {open: boolean, anchorEl: any, handleClose: () => void, history?: BidHistoryModel[], darkMode: boolean }) => {

  return (
    <Popover
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
      <div style={{padding: '15px', backgroundColor: darkMode ? dark_cont : white}}>
        {history !== undefined && history.length !== 0 ? (
          <table style={{minWidth: '225px'}}>
            <thead style={{borderBottom: '1px solid #eee'}}>
              <tr style={{color: darkMode ? gray : 'black'}}>
                <th>User</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {history?.map((x: BidHistoryModel) => (
                <tr key={x.amount}>
                  <td style={{color: darkMode ? gray : 'black'}}>{x.userName}</td>
                  <td style={{color: darkMode ? darker_green : blue}}>{x.amount+"$"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Typography style={{color: blue}}>There are no placed bets on this bid</Typography>
        )}
      </div>
      </Popover>
  )
}

export default BidHistory
