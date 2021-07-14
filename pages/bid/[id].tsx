import React from 'react'
import { useRouter } from 'next/router'
import { Grid } from '@material-ui/core'
import PhoneDisplay from '../../components/Phone/PhoneDisplay';
import PhoneDetails from '../../components/Phone/PhoneDetails';
import PhoneReviews from '../../components/Phone/PhoneReviews';
import SellerInfo from '../../components/Phone/SellerInfo';
import { LatestProducts } from '../../components/FrontPage/LatestProducts';
import TitleChange from '../../constants/TitleChange';


const PhonePage = () => {
  
  const router = useRouter()
  const { id } = router.query

  React.useEffect(() => {
    // Fetch phone using the id with axios
  },[])

  return (
    <Grid container>

      <TitleChange title={`MobiStore - Phone Bid ${id}`} />

      <Grid md={1} lg={2} item/>

      <Grid xs={12} md={10} lg={8} item> 
        <PhoneDisplay bid={true}/>
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
