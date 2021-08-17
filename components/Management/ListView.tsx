import React from 'react';
import Link from 'next/link';
import AddIcon from '@material-ui/icons/Add';
import { Typography, Button, Fab } from '@material-ui/core';

import MyBids from './Tables/MyBids';
import MyPhones from './Tables/MyPhones';
import PlacedBids from './Tables/PlacedBids';
import BoughtPhones from './Tables/BoughtPhones';

import { fetchGet } from '../../constants/CustomFetching';
import { SnackBarSuccess } from '../../constants/CustomSnackBars';

import Loading from '../Loading';
import NoPhones from './NoPhones';
import Phone from '../models/Phone';
import MngmSkeletonList from './MngmSkeletonList';



const ListView = ({currentPage, page, changePage}: {currentPage: string, page: number, changePage: (value: number) => void}) => {

    const [snackBar,changeSnackBar] = React.useState(false);
    const [list,changeList] = React.useState<Phone[] | []>([]);
    const [loading, changeLoading] = React.useState(true);

    React.useEffect( () => {
        const func = async () => {
            changeList([]);
            changeLoading(true);
            let res: Response | undefined = undefined;

            if (currentPage === 'My Phones'){
                res = await fetchGet(`http://localhost:10025/api/v1/phones/seller/${localStorage.getItem('userId')}/${page}`);
            }
            else if (currentPage === 'My Bids') {
                res = await fetchGet(`http://localhost:10025/api/v1/bids/user/${localStorage.getItem('userId')}`);
            }

            if (res?.ok){
                const json = await res.json();
                const newList = (json as any[]).map((x: Phone) => {
                    x.status = x.status == 0 ? "Running" : x.status == 1 ? "Sold" : "Deleted";
                    return x; 
                })
                changeList(newList)
            }
            // changeLoading(false);
        }

        func();
    }, [currentPage, page])


    const [AnchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(AnchorEl);

    const openPopUp = (e: any) => {
      setAnchorEl(e.currentTarget);
    }

    const closePopUp = () => {
      setAnchorEl(null);
    }
    return (
        <>
        {list.length === 0 ? loading ? <MngmSkeletonList currentPage={currentPage}/>
        :
        <NoPhones currentPage={currentPage}/> 
                 : (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
            <div style={{minHeight: 575, maxHeight: 1500}}>
                <Typography variant="h4" style={{color: '#0cafe5',margin: 15}}>{currentPage}</Typography>
                {currentPage === 'My Phones' ? <MyPhones list={list} changeSnackBar={(value: boolean) => changeSnackBar(value)}
                openPopUp={(e: any) => openPopUp(e)} open={open} closePopUp={() => closePopUp()} AnchorEl={AnchorEl}/> : 

                
                currentPage === 'My Bids' ? <MyBids list={list} changeSnackBar={(value: boolean) => changeSnackBar(value)}
                openPopUp={(e: any) => openPopUp(e)} open={open} closePopUp={() => closePopUp()} AnchorEl={AnchorEl}/> : 
                
                currentPage === 'Bought Phones' ? <BoughtPhones list={[]} changeSnackBar={(value: boolean) => changeSnackBar(value)}
                openPopUp={(e: any) => openPopUp(e)} open={open} closePopUp={() => closePopUp()} AnchorEl={AnchorEl}/> : 

                <PlacedBids list={[]} changeSnackBar={(value: boolean) => changeSnackBar(value)}
                openPopUp={(e: any) => openPopUp(e)} open={open} closePopUp={() => closePopUp()} AnchorEl={AnchorEl}/>}
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span style={{display: 'inline-block',marginLeft: 10}}>
                      <div>
                        <Button variant="contained" style={{backgroundColor: '#0cafe5', color: '#fff', margin: 5}}
                            onClick={() => {
                                if (page > 1){
                                    changePage(page-1);
                                }
                            }}>
                            Prev
                        </Button>
                        <Button variant="contained" disabled style={{backgroundColor: '#0a85ae', color: '#fff', margin: 5}}>
                            {page}
                        </Button>
                        <Button variant="contained" style={{backgroundColor: '#0cafe5', color: '#fff', margin: 5}} onClick={() => changePage(page+1)}>
                            Next
                        </Button>
                        </div>
                    </span>
                    <div>

                        {currentPage === "Bought Phones" || currentPage === "Placed Bids" ? null : (
                            
                            <Link href={currentPage === "My Phones" ? "/phone/add" : "/bid/add"}>
                            <Fab color="primary" aria-label="add" style={{marginRight: 50, marginBottom: 5}}>
                                <AddIcon />
                            </Fab>
                        </Link>
                    )}
                    </div>
            </div>
                      

        <SnackBarSuccess snackBarOpen={snackBar} changeSnackBarOpen={() => changeSnackBar(false)} message="Successfully copied link !"/>

        </div>
            
        )}
        </>
    )
}

export default ListView;