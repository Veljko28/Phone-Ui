import React from 'react'
import { useRouter } from 'next/router'
import { Grid } from '@material-ui/core'
import PhoneDisplay from '../../components/Phone/PhoneDisplay';
import PhoneReviews from '../../components/Phone/PhoneReviews';
import SellerInfo from '../../components/Phone/SellerInfo';
import { LatestProducts } from '../../components/FrontPage/LatestProducts';
import TitleChange from '../../constants/TitleChange';
import { fetchGet } from '../../constants/CustomFetching';
import Bid from '../../components/models/Bid';
import User from '../../components/models/User';
import Phone from '../../components/models/Phone';


const PhonePage = () => {
  
  const router = useRouter()
  const id = router.query['id'];
  const [bid,changeBid] = React.useState<Bid | undefined>(undefined);
  const [images, changeImages] = React.useState(undefined);
  const [user, changeUser] = React.useState<User | undefined>(undefined);
  const [relatedProducts, changeRelatedProducts] = React.useState<Phone[] | undefined>(undefined);
  const [history, changeHistory] = React.useState([]);


  React.useEffect(() => {
    const func = async () => {
      const res = await fetchGet(`http://localhost:10025/api/v1/bids/${id}`);

      if (res.ok) {
        const json = await (res as Response).json();
        changeBid(json);
        const userRes = await fetchGet(`http://localhost:10025/api/v1/users/${json!.seller}`);

        if (userRes.ok){
          changeUser(await userRes.json());
        }

        const related = await fetchGet('http://localhost:10025/api/v1/phones/featured');

        if ((related as Response).ok){
            changeRelatedProducts(await (related as Response).json());
        }

      }

       const res2 = await fetchGet(`http://localhost:10025/api/v1/bids/images/${id}`);
    
      if ((res2 as Response).ok){
          changeImages(await (res2 as Response).json());
      }

      const histories = await fetchGet(`http://localhost:10025/api/v1/bids/histories/${id}`);

      if (histories.ok){
        changeHistory(await histories.json());
      }

    }

     if (id) func();
  },[id])

  return (
    <Grid container>

      <TitleChange title={`MobiStore - Bid ${bid?.name}`} />

      <Grid md={1} lg={2} item/>

      <Grid xs={12} md={10} lg={8} item> 
        <PhoneDisplay bid={true} phone={bid} images={images} history={history}  id={id as string}/>
        <SellerInfo user={user}/>
        <PhoneReviews phoneId={id as string}/>
        <LatestProducts title="Related Products"  phones={relatedProducts} />
      </Grid>

      <Grid md={1}  lg={2} item/>
    </Grid>
  )
}

export default PhonePage
