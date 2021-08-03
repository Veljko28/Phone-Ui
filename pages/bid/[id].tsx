import React from 'react'
import { useRouter } from 'next/router'
import { Grid } from '@material-ui/core'
import PhoneDisplay from '../../components/Phone/PhoneDisplay';
import PhoneDetails from '../../components/Phone/PhoneDetails';
import PhoneReviews from '../../components/Phone/PhoneReviews';
import SellerInfo from '../../components/Phone/SellerInfo';
import { LatestProducts } from '../../components/FrontPage/LatestProducts';
import TitleChange from '../../constants/TitleChange';
import { fetchGet } from '../../constants/CustomFetching';


const PhonePage = () => {
  
  const router = useRouter()
  const id = router.query['id'];
  const [bid,changeBid] = React.useState(undefined);
  const [images, changeImages] = React.useState(undefined);

  React.useEffect(() => {
    const func = async () => {
      const res = await fetchGet(`http://localhost:10025/api/v1/bid/${id}`);
      const json = await (res as Response).json();
      changeBid(json);

       const res2 = await fetchGet(`http://localhost:10025/api/v1/bid/images/${id}`);
    
        if ((res2 as Response).ok){
            changeImages(await (res2 as Response).json());
        }
    }

     if (id) func();
  },[id])

  return (
    <Grid container>

      <TitleChange title={`MobiStore - Phone Bid ${id}`} />

      <Grid md={1} lg={2} item/>

      <Grid xs={12} md={10} lg={8} item> 
        <PhoneDisplay bid={true} phone={bid} images={images}/>
        <PhoneDetails />
        <SellerInfo id={id as string}/>
        <PhoneReviews />
        <LatestProducts title="Related Products" />
      </Grid>

      <Grid md={1}  lg={2} item/>
    </Grid>
  )
}

export default PhonePage
