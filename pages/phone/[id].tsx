import React from 'react'
import { useRouter } from 'next/router'
import { Grid } from '@material-ui/core'
import PhoneDisplay from '../../components/Phone/PhoneDisplay';
import PhoneDetails from '../../components/Phone/PhoneDetails';
import PhoneRatings from '../../components/Phone/PhoneRatings';
import PhoneReviews from '../../components/Phone/PhoneReviews';
import AddPhoneReview from '../../components/Phone/AddPhoneReview';
import { LatestProducts } from '../../components/FrontPage/LatestProducts';
import TitleChange from '../../constants/TitleChange';
import { fetchGet } from '../../constants/CustomFetching';
import Phone from '../../components/models/Phone';
import SellerInfo from '../../components/Phone/SellerInfo';
import User from '../../components/models/User';


const PhonePage = () => {
  
  const router = useRouter()
  const id = router.query['id'];

  const [phone,changePhone] = React.useState<Phone | undefined>(undefined);
  const [images, changeImages] = React.useState<string[] | undefined>(undefined);
  const [relatedProducts, changeRelatedProducts] = React.useState<Phone[] | undefined>(undefined);
  const [user, changeUser] = React.useState<User | undefined>(undefined);
  
  React.useEffect(() => {
    const func = async () => {
      if (!phone){

          const res = await fetchGet(`http://localhost:10025/api/v1/phones/${id as string}`);
    
          if ((res as Response).ok){
            changePhone(await (res as Response).json());
          }
    
          const res2 = await fetchGet(`http://localhost:10025/api/v1/phones/images/${id}`);
    
          if ((res2 as Response).ok){
            changeImages(await (res2 as Response).json());
          }

          const related = await fetchGet('http://localhost:10025/api/v1/phones/featured');

          if ((related as Response).ok){
            changeRelatedProducts(await (related as Response).json());
          }
        }

          if (phone?.seller) {
              const getUser = await fetchGet(`http://localhost:10025/api/v1/users/${phone?.seller}`);

            if ((getUser as Response).ok){
              changeUser( await getUser.json());
            }
          }
    }

    if (id) func();
  },[id, phone?.seller])

    let jwt: string | null = "";

    if (typeof window !== 'undefined') {
      jwt = localStorage.getItem('jwt');
    }

  return (
    <Grid container> 
      <TitleChange title={`MobiStore - Phone Listing ${phone?.name ? phone.name : ""}`} />
      <Grid md={1} lg={2} item/>

      <Grid xs={12} md={10} lg={8} item> 
        <PhoneDisplay 
        phone={phone} images={images} id={id as string}
        />
        <SellerInfo user={user} />
        <PhoneRatings />
        <PhoneReviews  phoneId={id as string}/>
        <AddPhoneReview phoneId={id as string}/>
        <LatestProducts title="Related Products" phones={relatedProducts} />
      </Grid>

      <Grid md={1}  lg={2} item/>
    </Grid>
  )
}

export default PhonePage
