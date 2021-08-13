import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid } from '@material-ui/core';

const UserCardSkeleton = () => {
    return (
     <Grid container style={{width: '250px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div>
            <Skeleton  width="200px" height="200px" variant="circle"/>
        </div>
        <div className="card-textarea" style={{display: 'flex',flexDirection: 'column', alignItems: 'center'}}>
            <Skeleton height="20px" width="150px" variant="rect" style={{margin: 5}}/>
            <Skeleton height="50px" width="225px" variant="rect" style={{margin: 5}}/>
            <Skeleton height="20px" width="150px" variant="rect" />
            <Skeleton height="20px" width="165px" variant="rect" style={{margin: 5}}/>
            <Skeleton height="20px" width="170px" variant="rect" />
            <Skeleton height="45px" width="190px" variant="rect" style={{margin: 10}}/>
        </div>
    </Grid>
    )
}

export default UserCardSkeleton;
