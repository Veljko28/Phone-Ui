import React from 'react';
import { Grid } from '@material-ui/core';
import Image from 'next/image';

const SideBar = ({currentPage, changeCurrentPage} :
    {currentPage: string, changeCurrentPage: (chnage: string) => void}) => {

    return (
        <Grid container >
              <div className="mngm-side" onClick={() => changeCurrentPage('My Phones')}>
                    <span style={{display: 'flex', alignItems: 'center'}}>
                        <span style={{marginLeft: 10, marginRight: 10}}>
                            <Image src={'/phone_img.png'} width="35px" height="35px"/>
                        </span>
                        <div className={currentPage === 'My Phones' ? "mngm-text" : undefined }>My Phones</div>
                    </span>
            </div>

            <div className="mngm-side" onClick={() => changeCurrentPage('My Bids')}>
                 <span style={{display: 'flex', alignItems: 'center'}}>
                    <Image src={'/bid_img.png'} width="55px" height="35px" />
                    <div className={currentPage === 'My Bids' ? "mngm-text" : undefined }>My Bids</div>
                </span>
             </div>

            <div className="mngm-side" onClick={() => changeCurrentPage('Bought Phones')}>
                    <span style={{display: 'flex', alignItems: 'center'}}>
                        <span style={{marginLeft: 10, marginRight: 10}}>
                            <Image src={'/phone_bought.png'} width="35px" height="35px"/>
                        </span>
                        <div className={currentPage === 'Bought Phones' ? "mngm-text" : undefined }>Bought Phones</div>
                    </span>
            </div>


             <div className="mngm-side" onClick={() => changeCurrentPage('Placed Bids')} >
                 <span style={{display: 'flex', alignItems: 'center'}}>
                    <Image src={'/bid_bought.png'} width="55px" height="35px" />
                    <div className={currentPage === 'Placed Bids' ? "mngm-text" : undefined }>Placed Bids</div>
                </span>
             </div>
        </Grid>
    )
}

export default SideBar;