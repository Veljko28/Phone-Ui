import React from 'react';
import {Grid} from '@material-ui/core';
import SideBar from '../components/Management/SideBar';
import ListView from '../components/Management/ListView';


const management = () => {
    return (
        <Grid container style={{backgroundColor: '#fff'}}>
            <Grid xs={3} item  style={{backgroundColor: '#fff'}}>
                <SideBar/>
            </Grid>
            <Grid xs={9} item>
                <ListView/>
            </Grid>
        </Grid>
    )
}

export default management;