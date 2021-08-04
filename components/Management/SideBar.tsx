import React from 'react';
import { Grid } from '@material-ui/core';
import Image from 'next/image';

const SideBar = () => {

    return (
        <Grid container >
              <div className="mngm-side" >
                    <span style={{display: 'flex', alignItems: 'center'}}>
                        <span style={{marginLeft: 10, marginRight: 10}}>
                            <Image src={'/phone_img.png'} width="35px" height="35px"/>
                        </span>
                        <div className="mngm-text">My Phones</div>
                    </span>
            </div>

                <div className="mngm-side" >
                    <span style={{display: 'flex', alignItems: 'center'}}>
                        <Image src={'/bid_img.png'} width="55px" height="35px" />
                        <div className="mngm-text">My Bids</div>
                    </span>
                </div>

        </Grid>
    )
}

export default SideBar;