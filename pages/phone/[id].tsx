import React from 'react'
import { useRouter } from 'next/router'
import { Grid } from '@material-ui/core'
import PhoneDisplay from '../../components/Phone/PhoneDisplay';
import PhoneDetails from '../../components/Phone/PhoneDetails';
import PhoneRatings from '../../components/Phone/PhoneRatings';
import PhoneReviews from '../../components/Phone/PhoneReviews';
import AddPhoneReview from '../../components/Phone/AddPhoneReview';
import { LatestProducts } from '../../components/FrontPage/LatestProducts';


const PhonePage = () => {
  
  const router = useRouter()
  const { id } = router.query

  React.useEffect(() => {
    // Fetch phone using the id with axios
  },[])

  const reviewRef = React.useRef(null);

  // const executeScroll = () => reviewRef.current?.scrollIntoView()
  
  return (
    <Grid container>
      <Grid md={1} item/>

      <Grid xs={12} md={10} item> 
        <PhoneDisplay />
        <PhoneDetails />
        <PhoneRatings executeScroll={executeScroll} />
        <PhoneReviews />
        <AddPhoneReview ref={reviewRef}/>
        <LatestProducts title="Related Products" />
      </Grid>

      <Grid md={1} item/>
    </Grid>
  )
}

export default PhonePage
