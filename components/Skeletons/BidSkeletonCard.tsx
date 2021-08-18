import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid } from '@material-ui/core';

const BidSkeletonCard = () => {
    return (
    <Grid container className="cardContainer" style={{width: '250px', border: '1px solid #eee', maxHeight: 350, margin: 10}}>
        <div>
            <div className="imageConatiner" style={{padding: 3, display: 'flex', justifyContent: 'center'}}>
                <Skeleton height="150px" width="200px" variant="rect"/>
            </div>

            <div className="card-textarea" style={{paddingTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Skeleton height="20px" width="200px" variant="rect"/>
                <Skeleton height="20px" width="150px" variant="rect" style={{marginTop: 8}}/>
                <Skeleton height="20px" width="150px" variant="rect" style={{marginTop: 8}}/>
            </div>
          </div>

        <div className="buttonConainer" style={{display: 'flex',justifyContent: 'center'}}>
            <Skeleton height="35px" width="35px" variant="circle" style={{margin: 5}}/>
            <Skeleton height="35px" width="35px" variant="circle" style={{margin: 5}}/>
        </div>
    </Grid>
    )
}

export default BidSkeletonCard;
