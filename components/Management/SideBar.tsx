import React from 'react';
import { Grid } from '@material-ui/core';
import Image from 'next/image';
import { blue, darker_green, dark_cont, gray, white } from '../../constants/CustomColors';

const SideBar = ({currentPage, changeCurrentPage, darkMode} :
    {currentPage: string, changeCurrentPage: (chnage: string) => void, darkMode: boolean}) => {


    return (
        <Grid container style={{backgroundColor: darkMode ? dark_cont : white}}>
              <div className={darkMode ? "mngm-side-dark" : "mngm-side"} onClick={() => changeCurrentPage('My Phones')}>
                    <span style={{display: 'flex', alignItems: 'center'}}>
                        <span style={{marginLeft: 10, marginRight: 10}}>
                            <Image src={'/phone_img.png'} width="35px" height="35px"/>
                        </span>
                        <div className={currentPage === 'My Phones' ? 
                    darkMode ? "mngm-text-selected-dark" : "mngm-text-selected" : 
                    darkMode ? "mngm-text-dark" : "mngm-text"}>My Phones</div>
                    </span>
            </div>

            <div className={darkMode ? "mngm-side-dark" : "mngm-side"} onClick={() => changeCurrentPage('My Bids')}>
                 <span style={{display: 'flex', alignItems: 'center'}}>
                    <Image src={'/bid_img.png'} width="55px" height="35px" />
                    <div className={ currentPage === 'My Bids' ? 
                    darkMode ? "mngm-text-selected-dark" : "mngm-text-selected" : 
                    darkMode ? "mngm-text-dark" : "mngm-text"}>My Bids</div>
                </span>
             </div>

            <div className={darkMode ? "mngm-side-dark" : "mngm-side"} onClick={() => changeCurrentPage('Bought Phones')}>
                    <span style={{display: 'flex', alignItems: 'center'}}>
                        <span style={{marginLeft: 10, marginRight: 10}}>
                            <Image src={'/phone_bought.png'} width="35px" height="35px"/>
                        </span>
                        <div className={currentPage === 'Bought Phones' ? 
                    darkMode ? "mngm-text-selected-dark" : "mngm-text-selected" : 
                    darkMode ? "mngm-text-dark" : "mngm-text"}>Bought Phones</div>
                    </span>
            </div>


             <div className={darkMode ? "mngm-side-dark" : "mngm-side"} onClick={() => changeCurrentPage('Placed Bids')} >
                 <span style={{display: 'flex', alignItems: 'center'}}>
                    <Image src={'/bid_bought.png'} width="55px" height="35px" />
                    <div className={ currentPage === 'Placed Bids' ? 
                    darkMode ? "mngm-text-selected-dark" : "mngm-text-selected" : 
                    darkMode ? "mngm-text-dark" : "mngm-text"}>Placed Bids</div>
                </span>
             </div>
        </Grid>
    )
}

export default SideBar;