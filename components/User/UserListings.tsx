import React from 'react';
import Link from 'next/link';

import { Button, Grid, Typography } from '@material-ui/core';
import ReportIcon from '@material-ui/icons/Report';

import { fetchGet } from '../../constants/CustomFetching';
import { blue, darker_green, dark_gray, gray, white, dark } from '../../constants/CustomColors';
import UserListingSkeleton from '../Skeletons/UserListingSkeleton';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';
import Phone from '../models/Phone';



const UserListings = ({id, ownProfile} : {id: string, ownProfile: boolean}) => {

    const [list,changeList] = React.useState<any>([]);
    const [loading, changeLoading] = React.useState(true);
    const [currentPage, changeCurrentPage] = React.useState(0);

   const darkMode = useSelector((state: State) => state.userInfo.darkMode);


    React.useEffect(() => {
      const func = async () => {
        changeLoading(true);
        const res = await fetchGet(`http://localhost:10025/api/v1/phones/seller/${id}/1`);
        const json = await (res as Response).json();
        
        let pageList: Phone[] = [];
        const listOfPages: any[] = [];
        
        json.phones.forEach((x: Phone, idx: number) => {
          pageList.push(x);

          if (pageList.length === 3 || idx === json.phones.length-1 ) {
            listOfPages.push(pageList);
            pageList = [];
          }
        }) 
        
        changeList(listOfPages as any);
        changeLoading(false);
      }

      if (id) func();
    }, [id]);

    const skeletons = [<UserListingSkeleton/>,<UserListingSkeleton/>,<UserListingSkeleton/>];

    const ListingMap = ({id,image,name,description} :  
      {id: number, image: string, name: string, description: string}) => {
        return (
            <Link href={`/phone/${id.toString()}`} key={id}>
              <Grid container>
                    <Grid xs={12} md={4} item className="review-grid-item">
                      <div className="curs-hvr">
                        <img src={image} width="100px" height="100px" />
                      </div>
                    </Grid>
                  <Grid xs={12} md={8} item className="listing-grid-item">
                        <Typography variant="subtitle1" style={{color: darkMode ? darker_green : blue}} className="curs-hver">
                          {name}
                        </Typography>

                        <Typography variant="subtitle2" style={{color:  darkMode ? gray : dark_gray}}>
                          {description}
                        </Typography>
                  </Grid>
               </Grid>
            </Link>
        )
      }

    return (
      <>
        <Grid className={darkMode ? "phone-details-dark" : "phone-details"} container style={{marginTop: 10, marginBottom: 10}}>
                {list.length > 0 ? 
                <>
                
                {list[currentPage].map((x: any) => ListingMap(x))}
                

             

                </>
                : loading ? <div>{skeletons}</div> : ownProfile ? (
                  <Grid container item style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',height: 450}}>
                    <ReportIcon style={{color: darkMode ? darker_green : blue,fontSize: 175}}/>
                    <Typography variant="h4" style={{color: darkMode ? darker_green : blue}}>You don't have any listings</Typography>
                    <Link href="/phone/add"><Button variant="contained" style={{color: white, backgroundColor: darkMode ? darker_green : blue, marginTop: 15}}>Add new listing</Button></Link>
                  </Grid>
                ) : 

                (<Grid container item style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',height: 450}}>
                    <ReportIcon style={{color:  darkMode ? darker_green : blue,fontSize: 175}}/>
                    <Typography variant="h4" style={{color: darkMode ? darker_green : blue}}>Couldn't find any listings for this user</Typography>
                  </Grid>
                )}
        </Grid>
      
        {list.length > 0 ? (<span style={{display: 'inline-block',}}>
                      <div>
                        {currentPage !== 0 ? (
                        <Button variant="contained" style={{backgroundColor: darkMode ? darker_green : blue, color: white, margin: 5}}
                            onClick={() => changeCurrentPage(currentPage-1)}>
                            Prev
                        </Button>
                        ) : null}
                        <Button variant="contained" disabled style={{backgroundColor: darkMode ? "#326307" : '#0a85ae', color: white, margin: 5}}>
                            {currentPage+1}
                        </Button>
                        {currentPage < list.length-1 ? (
                            <Button variant="contained" style={{backgroundColor: darkMode ? darker_green : blue, color: white, margin: 5}} onClick={() => changeCurrentPage(currentPage+1)}>
                                Next
                            </Button>
                        ) : null}
                        </div>
                    </span>) : null}
      </>
    );
}

export default UserListings;