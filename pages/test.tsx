import React from 'react'
import { Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const test = () => {
  return ( 
  <Grid container>
    <Grid md={4} lg={3} item/>
    <Grid xs={12} md={8} lg={9} item style={{borderLeft: '1px solid #eee',height: 650, backgroundColor: '#fff'}}>
    <table  className="mngm-table">
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
    </table>
    </Grid>
  </Grid>
  )
}

export default test
