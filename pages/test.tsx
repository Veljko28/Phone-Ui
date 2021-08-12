import React from 'react'
import Link from 'next/link';
import { Skeleton } from '@material-ui/lab';
import { Grid, Typography } from '@material-ui/core';

const test = () => {
    return (
         <Grid container className="cardContainer" style={{width: '250px', border: '1px solid #eee', maxHeight: 287}}>
        <div>
            <div className="imageConatiner">
                <Skeleton height="150px" width="150px" variant="rect"></Skeleton>
            </div>

            <div className="card-textarea">
          
            </div>
          </div>

        <div className="buttonConainer">
         
        </div>
    </Grid>
    )
}

export default test
