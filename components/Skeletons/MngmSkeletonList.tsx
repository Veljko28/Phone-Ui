import { Typography } from '@material-ui/core'
import React from 'react'
import { blue } from '../../constants/CustomColors'
import MngmSkeletonCard from './MngmSkeletonCard'

const MngmSkeletonList = ({currentPage} : {currentPage: string}) => {
  return (<>
   <Typography variant="h4" style={{color: blue,margin: 15}}>{currentPage}</Typography>
     <table className="mngm-table">
          <thead>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </thead>
          <tbody>
            <MngmSkeletonCard/>
            <MngmSkeletonCard/>
            <MngmSkeletonCard/>
            <MngmSkeletonCard/>

            <MngmSkeletonCard/>
            <MngmSkeletonCard/>
            <MngmSkeletonCard/>
            <MngmSkeletonCard/>
          </tbody>
      </table>
    </>
  )
}

export default MngmSkeletonList
