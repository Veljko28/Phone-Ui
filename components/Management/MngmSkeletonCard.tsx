import React from 'react'
import { Grid } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

const MngmSkeletonCard = () => {
  return (
       <tr>
          <td>
                  <Grid container item style={{display: 'flex', alignContent: 'center'}}>
                      <Grid item sm={3}/>
                      <Grid item xs={12} sm={3}>
                        <Skeleton width="50px" height="60px"/>
                      </Grid>
                        <Grid item xs={12} sm={6} style={{display: 'flex', alignItems: 'center'}}>
                           <Skeleton width="100px" height="20px"/>
                        </Grid>
                    </Grid>
              </td>
              <td><Skeleton width="45px" height="20px"/></td>
              <td>
                 <Skeleton width="75px" height="20px"/>
              </td>
              <td><Skeleton width="85px" height="20px"/></td>
              <td style={{display: 'flex', justifyContent: 'center'}}>
                <Skeleton width="35px" height="35px" variant="circle" style={{margin: 10, marginRight: 5}}/>
                <Skeleton width="35px" height="35px" variant="circle" style={{margin: 10, marginLeft: 5}}/>
            </td>
        </tr>           
  )
}

export default MngmSkeletonCard
