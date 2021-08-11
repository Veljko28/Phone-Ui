import React from 'react';
import Link from 'next/link';
import { Typography, Grid, IconButton, Button, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { SnackBarSuccess } from '../../constants/CustomSnackBars';
import MyPhones from './Tables/MyPhones';
import MyBids from './Tables/MyBids';
import BoughtPhones from './Tables/BoughtPhones';
import PlacedBids from './Tables/PlacedBids';
import { fetchGet } from '../../constants/CustomFetching';
import Phone from '../models/Phone';
import NoPhones from './NoPhones';
import Loading from '../Loading';



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
                res = await fetchGet(`http://localhost:10025/api/v1/bid/user/${localStorage.getItem('userId')}`);
            }

            if (res?.ok){
                const json = await res.json();
                const newList = (json as Phone[]).map((x: Phone) => {
                    x.status = x.status == 0 ? "Running" : x.status == 1 ? "Sold" : "Deleted";
                    return x; 
                })
                changeList(newList)
            }
            changeLoading(false);
        }

        func();
    }, [currentPage, page])


     const testPhones = [
        {
            name: "Phone 1",
            category: "Android Phone",
            seller: "User 1",
            price: "125$",
        },
        {
            name: "Phone 2",
            category: "IOS Phone",
            seller: "User 2",
            price: "725$",
        },
        {
            name: "Phone 2",
            category: "Other",
            seller: "User 3",
            price: "400$",
        },
    ]

    const testPlacedBids = [
        {
            name: "Phone 1",
            price: "125$",
            seller: "User 1",
            status: "Running"
        },
        {
            name: "Phone 2",
            price: "725$",
            seller: "User 2",
            status: "Won !",
        },
        {
            name: "Phone 2",
            price: "400$",
            seller: "User 3",
            status: "Lost !",
        },
    ]

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
        {list.length === 0 ? loading ? <div style={{
              display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: 614
            }}><Loading size={60}/></div> : <NoPhones currentPage={currentPage}/> : (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
            <div>
                <Typography variant="h4" style={{color: '#0cafe5',margin: 15}}>{currentPage}</Typography>
                {currentPage === 'My Phones' ? <MyPhones list={list} changeSnackBar={(value: boolean) => changeSnackBar(value)}
                openPopUp={(e: any) => openPopUp(e)} open={open} closePopUp={() => closePopUp()} AnchorEl={AnchorEl}/> : 

                
                currentPage === 'My Bids' ? <MyBids list={list} changeSnackBar={(value: boolean) => changeSnackBar(value)}
                openPopUp={(e: any) => openPopUp(e)} open={open} closePopUp={() => closePopUp()} AnchorEl={AnchorEl}/> : 
                
                currentPage === 'Bought Phones' ? <BoughtPhones list={testPhones} changeSnackBar={(value: boolean) => changeSnackBar(value)}
                openPopUp={(e: any) => openPopUp(e)} open={open} closePopUp={() => closePopUp()} AnchorEl={AnchorEl}/> : 

                <PlacedBids list={testPlacedBids} changeSnackBar={(value: boolean) => changeSnackBar(value)}
                openPopUp={(e: any) => openPopUp(e)} open={open} closePopUp={() => closePopUp()} AnchorEl={AnchorEl}/>}
            </div>
            <span style={{position: 'absolute', bottom: 225}}>
                <div style={{margin: 10, display: 'inline-flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
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
                    </div>
                </span>
                <span style={{position: 'absolute', right: 50, bottom: 225}}>
                        {currentPage === "Bought Phones" || currentPage === "Placed Bids" ? null : (

                            <Link href={currentPage === "My Phones" ? "/phone/add" : "/bid/add"}>
                                <Fab color="primary" aria-label="add" style={{marginRight: 50, marginBottom: 5}}>
                                    <AddIcon />
                                </Fab>
                            </Link>

                        )}
                </span>

        <SnackBarSuccess snackBarOpen={snackBar} changeSnackBarOpen={() => changeSnackBar(false)} message="Successfully copied link !"/>

        </div>
            
        )}
        </>
    )
}

export default ListView;