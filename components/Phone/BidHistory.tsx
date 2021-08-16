import React from 'react'
import { Popover, Typography } from '@material-ui/core'

import ColoredLine from '../../constants/ColoredLine'
import BidHistoryModel from '../models/BidHistory'

const BidHistory = ({open, anchorEl, handleClose, history} : 
  {open: boolean, anchorEl: any, handleClose: () => void, history?: BidHistoryModel[] }) => {

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
      <div style={{padding: '15px'}}>
        {history !== undefined && history.length !== 0 ? (
          <table style={{minWidth: '225px'}}>
            <thead style={{borderBottom: '1px solid #eee'}}>
              <tr>
                <th>User</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {history?.map((x: BidHistoryModel) => (
                <tr key={x.amount}>
                  <td>{x.userName}</td>
                  <td style={{color: '#0cafe5'}}>{x.amount+"$"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Typography style={{color: '#0cafe5'}}>There are not place bets on this bid</Typography>
        )}
      </div>
      </Popover>
  )
}

export default BidHistory
