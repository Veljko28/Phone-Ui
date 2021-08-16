import React from 'react'
import { Grid } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

const MngmSkeletonCard = () => {
  return (
       <tr>
          <td>
              <Grid container item style={{display: 'flex', alignContent: 'center'}}>
                      <Grid item xs={12} sm={6}>
                        <Skeleton width="50px" height="50px"/>
                      </Grid>
                        <Grid item xs={12} sm={6} style={{display: 'flex', alignItems: 'center'}}>
                           <Skeleton width="75px" height="20px"/>
                        </Grid>
                    </Grid>
              </td>
              <td style={{color: '#43cf22'}}><Skeleton width="25px" height="20px"/></td>
              <td>
                 <Skeleton width="55px" height="20px"/>
              </td>
              <td><Skeleton width="65px" height="20px"/></td>
              <td style={{display: 'flex', justifyContent: 'center'}}>
                <Skeleton width="30px" height="30px" variant="circle"/>
                <Skeleton width="30px" height="30px" variant="circle"/>
            </td>
        </tr>             
  )
}

export default MngmSkeletonCard
