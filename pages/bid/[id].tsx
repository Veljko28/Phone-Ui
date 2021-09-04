import React from 'react'
import { useRouter } from 'next/router'
import { Grid } from '@material-ui/core'

import SellerInfo from '../../components/Phone/SellerInfo';
import PhoneDisplay from '../../components/Phone/PhoneDisplay';
import PhoneReviews from '../../components/Phone/PhoneReviews';
import { LatestProducts } from '../../components/FrontPage/LatestProducts';

import TitleChange from '../../constants/TitleChange';
import { fetchGet, fetchPost } from '../../constants/CustomFetching';

import Bid from '../../components/models/Bid';
import User from '../../components/models/User';
import Phone from '../../components/models/Phone';
import NotFound from '../../components/NotFound';
import { timeLeft } from '../../constants/formatDate';
import UserReviews from '../../components/User/UserReviews';


const PhonePage = () => {
  
  const router = useRouter()
  const id = router.query['id'];
  const [bid,changeBid] = React.useState<Bid | undefined>(undefined);
  const [images, changeImages] = React.useState(undefined);
  const [user, changeUser] = React.useState<User | undefined>(undefined);
  const [relatedProducts, changeRelatedProducts] = React.useState<Phone[] | undefined>(undefined);
  const [history, changeHistory] = React.useState([]);
  const [notFound, changeNotFound] = React.useState<boolean>(false);
  const [sellingPhones, changeSellingPhones] = React.useState("");


  React.useEffect(() => {
    const func = async () => {
      const res = await fetchGet(`http://localhost:10025/api/v1/bids/${id}`);

      if (res.ok) {
        const json = await (res as Response).json();
        changeBid(json);
        const userRes = await fetchGet(`http://localhost:10025/api/v1/users/${json!.seller}`);
        if (timeLeft(json!.date_Ends) === "Finished !" && json!.status === 0){
           // change status
           const userNameReq = await fetchPost(`http://localhost:10025/api/v1/bids/status`, {bid_Id: id,status: 1});
           if (userNameReq?.ok){
              const userName = (await userNameReq.json()).userName;
              const userIdReq = await fetchGet(`http://localhost:10025/api/v1/users/userId/${userName}`);

              if (userIdReq?.ok){
                // send notification
                const buyerId = await userIdReq.text(); 
                
                await fetchPost('http://localhost:10025/api/v1/notifications/add', 
                 {name: json!.name, type: "bid", userId: json!.seller, message: `/user/${buyerId}`});

                const userEmail = await fetchGet(`http://localhost:10025/api/v1/users/${json!.seller}/email`);

                const email = await userEmail.text();

                await fetchPost('http://localhost:10025/api/v1/email/sold', {
                    name: json!.name, type: "bid", email, buyerId, sellerId: json!.seller
                })
              }
           }
        }

        if (userRes.ok){
          changeUser(await userRes.json());
        }

         const phones = await fetchGet(`http://localhost:10025/api/v1/phones/userphones/${json!.seller}`);
         if ((phones as Response).ok){
          changeSellingPhones(await phones.text());
       }

        const related = await fetchGet(`http://localhost:10025/api/v1/phones/featured/${id}`);

        if ((related as Response).ok){
            changeRelatedProducts(await (related as Response).json());
        }


      }
      else {
        changeNotFound(true);
      }

       const res2 = await fetchGet(`http://localhost:10025/api/v1/bids/images/${id}`);
    
      if ((res2 as Response).ok){
          changeImages(await (res2 as Response).json());
      }

      const histories = await fetchGet(`http://localhost:10025/api/v1/bids/histories/${id}`);

      if (histories.ok){
        const historyJson = await histories.json();
        changeHistory(historyJson);
        console.log(historyJson);
      }

     

    }

     if (id) func();
  },[id])

  return (
    <Grid container>

      <TitleChange title={`MobiStore - Bid ${bid?.name}`} />

      <Grid md={1} lg={2} item/>

      <Grid xs={12} md={10} lg={8} item> 
      {notFound === true ? <NotFound/> : (
        <>
          <PhoneDisplay bid={true} phone={bid} images={images} history={history} userId={user?.id as string} id={id as string}/>
          <SellerInfo user={user} sellingPhones={sellingPhones}/>
          <UserReviews display={true} userId={user?.id as string}/>
          <LatestProducts title="Related Products"  phones={relatedProducts} />
        </>
      )}
      </Grid>

      <Grid md={1}  lg={2} item/>
    </Grid>
  )
}

export default PhonePage
