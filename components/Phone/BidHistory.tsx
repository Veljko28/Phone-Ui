import { Popover, Typography } from '@material-ui/core'
import React from 'react'
import ColoredLine from '../../constants/ColoredLine'

const BidHistory = ({open, anchorEl, handleClose} : 
  {open: boolean,anchorEl: any, handleClose: () => void}) => {


    const test = [
      {
        name: 'John Smith',
        amount: '135$'
      },
      {
        name: 'Mary Sue',
        amount: '215$'
      },
      {
        name: 'Thomas Burr',
        amount: '250$'
      },
    ]
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
        <table style={{border: '1px solid #eee', width: '225px'}}>
          <thead style={{borderBottom: '1px solid #eee'}}>
            <tr>
              <th>User</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
             {test.map(x => (
               <tr>
                 <td>{x.name}</td>
                 <td style={{color: '#0cafe5'}}>{x.amount}</td>
               </tr>
             ))}
          </tbody>
        </table>
      </Popover>
  )
}

export default BidHistory
