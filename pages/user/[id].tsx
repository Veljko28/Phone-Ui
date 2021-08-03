import { Grid } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import UserCard from '../../components/User/UserCard';
import UserTabs from '../../components/User/UserTabs';
import { fetchGet } from '../../constants/CustomFetching';
import TitleChange from '../../constants/TitleChange';


const user = () => {

  
  const router = useRouter()
  const id = router.query['id'];
  const [user,changeUser] = React.useState<any>({});

  React.useEffect(() => {
    const func = async () => {
      if (id === undefined){
        return;
      }
      const res = await fetchGet(`http://localhost:10025/api/v1/users/${id}`);
      if ((res as Response).ok){
        changeUser(await (res as Response).json());
      }
    }

    func();
  },[id])


  return (
    <>
    
    <TitleChange title={`MobiStore - ${user.userName ? user.userName : "User Profile"}`} />

    <Grid container>

      <Grid md={1} lg={2} item/>

      <Grid xs={12} md={10} lg={8} item container> 

        <Grid md={4} xs={12} item>
          <UserCard 
          image={user.image !== null ? user.image : "/user.png"} 
          name={user.userName ? user.userName : "User Profile"}
          desc={user.description ? user.description : "This user has no description"} rating={user.rating ? user.rating : 3.5} id={id as string} />          
        </Grid>

        <Grid md={8} xs={12} item>
          <UserTabs id={id as string}/>
        </Grid>
      </Grid>

      <Grid md={1} lg={2} item/>
    </Grid>
    
    </>
    )
  
}

export default user;
