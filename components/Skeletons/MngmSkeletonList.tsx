import { Typography } from '@material-ui/core'
import React from 'react'
import { blue, darker_green } from '../../constants/CustomColors'
import MngmSkeletonCard from './MngmSkeletonCard'

const MngmSkeletonList = ({currentPage, darkMode, t} : {currentPage: string, darkMode: boolean, t: any}) => {
  return (<>
   <Typography variant="h4" style={{color: darkMode ? darker_green : blue,margin: 15}}>{t("management." + currentPage)}</Typography>
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
