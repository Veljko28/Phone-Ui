import { Grid } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import UserCard from '../../components/User/UserCard';
import UserTabs from '../../components/User/UserTabs';
import TitleChange from '../../constants/TitleChange';


const user = () => {

  
  const router = useRouter()
  const { id } = router.query


  return (
    <>
    
    <TitleChange title="MobiStore - Cart" />

    <Grid container>

      <Grid md={1} lg={2} item/>

      <Grid xs={12} md={10} lg={8} item container> 

        <Grid md={3} xs={12} item>
          <UserCard image="/user.png" name={`User ${id}`} desc={`Description of user ${id}`} rating={4.6} id={id as string} />          
        </Grid>

        <Grid md={7} xs={12} item>
          <UserTabs/>
        </Grid>
      </Grid>

      <Grid md={1}  lg={2} item/>
    </Grid>
    
    </>
    )
  
}

export default user;
