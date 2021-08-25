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

import NoPhones from './NoPhones';
import Phone from '../models/Phone';
import MngmSkeletonList from '../Skeletons/MngmSkeletonList';
import { blue, white } from '../../constants/CustomColors';



const ListView = ({currentPage, page, changePage}: {currentPage: string, page: number, changePage: (value: number) => void}) => {

    const [snackBar,changeSnackBar] = React.useState(false);
    const [list,changeList] = React.useState<Phone[] | []>([]);
    const [loading, changeLoading] = React.useState(true);
    const [numOfPages, changeNumOfPages] = React.useState(1);
    

    React.useEffect( () => {
        const func = async () => {
            changeList([]);
            changeLoading(true);
            let res: Response | undefined = undefined;
            const userId = localStorage.getItem('userId');

            if (currentPage === 'My Phones'){
                res = await fetchGet(`http://localhost:10025/api/v1/phones/seller/${userId}/${page}`);
            }
            else if (currentPage === 'My Bids') {
                res = await fetchGet(`http://localhost:10025/api/v1/bids/user/${userId}/${page}`);
            }
            else if (currentPage === "Bought Phones"){
                res = await fetchGet(`http://localhost:10025/api/v1/purchase/phones/${userId}/${page}`)
            }

            if (res?.ok){
                const json: any = await res.json();
                if (page == 1){
                    
                    if (currentPage === 'My Bids') {
                        const newList = json.bids.map((x: Phone) => {
                            x.status = x.status == 0 ? "Running" : x.status == 1 ? "Sold" : "Deleted";
                            return x; 
                        });
                        changeList(newList);   
                    }
                    else {
                        const newList = json.phones.map((x: Phone) => {
                            x.status = x.status == 0 ? "Running" : x.status == 1 ? "Sold" : "Deleted";
                            return x; 
                        });
                        changeList(newList);  
                    }

                    changeNumOfPages(json.numOfPages);
                }
                else {
                     const newList = (json as any[]).map((x: Phone) => {
                    x.status = x.status == 0 ? "Running" : x.status == 1 ? "Sold" : "Deleted";
                    return x; 
                    })
                    changeList(newList)
                }
               
            }
            changeLoading(false);
        }

        if (page) func();
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
                <Typography variant="h4" style={{color: blue,margin: 15}}>{currentPage}</Typography>
                {currentPage === 'My Phones' ? <MyPhones list={list} changeSnackBar={(value: boolean) => changeSnackBar(value)}
                openPopUp={(e: any) => openPopUp(e)} open={open} closePopUp={() => closePopUp()} AnchorEl={AnchorEl}/> : 

                
                currentPage === 'My Bids' ? <MyBids list={list} changeSnackBar={(value: boolean) => changeSnackBar(value)}
                openPopUp={(e: any) => openPopUp(e)} open={open} closePopUp={() => closePopUp()} AnchorEl={AnchorEl}/> : 
                
                currentPage === 'Bought Phones' ? <BoughtPhones list={list} changeSnackBar={(value: boolean) => changeSnackBar(value)}
                openPopUp={(e: any) => openPopUp(e)} open={open} closePopUp={() => closePopUp()} AnchorEl={AnchorEl}/> : 

                <PlacedBids list={[]} changeSnackBar={(value: boolean) => changeSnackBar(value)}
                openPopUp={(e: any) => openPopUp(e)} open={open} closePopUp={() => closePopUp()} AnchorEl={AnchorEl}/>}
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span style={{display: 'inline-block',marginLeft: 10}}>
                      <div>
                        {page !== 1 ? (
                        <Button variant="contained" style={{backgroundColor: blue, color: white, margin: 5}}
                            onClick={() => changePage(page-1)}>
                            Prev
                        </Button>
                        ) : null}
                        <Button variant="contained" disabled style={{backgroundColor: '#0a85ae', color: white, margin: 5}}>
                            {page}
                        </Button>
                        {page < numOfPages ? (
                            <Button variant="contained" style={{backgroundColor: blue, color: white, margin: 5}} onClick={() => changePage(page+1)}>
                                Next
                            </Button>
                        ) : null}
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