import React from 'react';
import {Grid} from '@material-ui/core';
import SideBar from '../components/Management/SideBar';
import ListView from '../components/Management/ListView';
import TitleChange from '../constants/TitleChange';
import NotLoggedIn from '../constants/NotLoggedIn';
import { useSelector } from 'react-redux';
import { State } from '../redux/reduxTypes';
import { dark_cont } from '../constants/CustomColors';
import { useTranslation } from 'react-i18next';


const management = () => {

    const [currentPage, changeCurrentPage] = React.useState('My Phones');
    const [page, changePage] = React.useState(1);
    const darkMode = useSelector((state: State) => state.userInfo.darkMode);
    const { t } = useTranslation();


    let jwt: string | null = null;

    if (typeof window !== 'undefined') {
      jwt = localStorage.getItem('jwt');
    }

    return (
        jwt === null ? <NotLoggedIn darkMode={darkMode} t={t}/> : (

        <Grid container style={{backgroundColor: darkMode ? dark_cont : '#fff', minHeight: 737}}>
            <TitleChange title={"MobiStore - Management"}/>
            <Grid xs={12} md={4} lg={3} item style={{minHeight: 737}}>
                <SideBar t={t} darkMode={darkMode} currentPage={currentPage} changeCurrentPage={(change: string) => {
                    changeCurrentPage(change)
                    changePage(1);
                    }}/>
            </Grid>
            <Grid xs={12} md={8} lg={9} item style={{borderLeft: '1px solid #eee',height: 675}}>
                <ListView t={t} darkMode={darkMode} currentPage={currentPage} page={page} changePage={(value: number) => changePage(value)} />
            </Grid>
        </Grid>
        
        )
    )
}

export default management;