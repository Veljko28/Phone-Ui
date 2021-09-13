import { Grid } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import NotFound from '../../components/NotFound';
import UserCard from '../../components/User/UserCard';
import UserTabs from '../../components/User/UserTabs';
import { fetchGet } from '../../constants/CustomFetching';
import TitleChange from '../../constants/TitleChange';


const user = () => {

  
  const router = useRouter()
  const id = router.query['id'];
  const [user,changeUser] = React.useState<any>({});
  const [sellingPhones, changeSellingPhones] = React.useState("");
  const [notFound, changeNotFound] = React.useState(false);

  React.useEffect(() => {
    const func = async () => {
      const res = await fetchGet(`http://localhost:10025/api/v1/users/${id}`);
      if ((res as Response).ok){
        changeUser(await (res as Response).json());
      }
      else {
        changeNotFound(true);
        return;
      }

      const phones = await fetchGet(`http://localhost:10025/api/v1/phones/userphones/${id}`);
      if ((phones as Response).ok){
        changeSellingPhones(await phones.text());
      }
    }

    if (id) func();
  },[id])

  const { t } = useTranslation();

  return (
    <>
    
    <TitleChange title={`MobiStore - ${user.userName ? user.userName : "User Profile"}`} />

    <Grid container>

      <Grid md={1} lg={2} item/>
      <Grid xs={12} md={10} lg={8} item container> 

      {notFound === true ? <NotFound t={t}/> : (
        <>
          <Grid md={4} xs={12} item style={{display: 'flex', justifyContent: 'center', minHeight: 700}} >
            <UserCard selling_phones={sellingPhones} t={t}
            name={user.userName ? user.userName : "User Profile"} email={user.email} phoneNumber={user.phoneNumber} phones_sold={user.phones_sold}
            desc={user.description ? user.description : "This user has no description"} rating={user.rating} id={id as string} />          
          </Grid>

          <Grid md={8} xs={12} item>
            <UserTabs id={id as string} t={t}/>
          </Grid>
       </>
      )}
      </Grid>

      <Grid md={1} lg={2} item/>
    </Grid>
    
    </>
    )
  
}

export default user;
