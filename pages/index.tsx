import { LatestProducts } from "../components/FrontPage/LatestProducts"
import { Grid } from "@material-ui/core";
import SubBar from "../components/FrontPage/SubBar";
import EmailSubscribe from '../components/FrontPage/EmailSubscribe';
import CategoryButtons from "../components/FrontPage/CategoryButtons";
import CarouselMain from "../components/FrontPage/CarouselMain";
import TitleChange from "../constants/TitleChange";
import React from 'react';
import { fetchGet } from "../constants/CustomFetching";
// import { ImageCarousel } from "../components/ImageCarousel"

export default function Home() {

  const [phones,changePhones] = React.useState({
    featured: undefined,
    latest: undefined
  });

  React.useEffect(() => {
    const func = async () => {
      const res = await fetchGet('http://localhost:10025/api/v1/phones/featured');

      if(res && res.ok){
        changePhones({...phones, featured: await (res as Response).json()});
      }
    }

    func();
  },[]);

  return (
    <Grid container justify="center">

          <TitleChange title="MobiStore - Online Mobile Store" />
          
          <Grid item xs={12}>
            <CarouselMain/>
          </Grid>
          
          <Grid item xs={2}/>

          <Grid item xs={8}>
            <CategoryButtons/>
          </Grid>

          <Grid item xs={2}/>
          
          <Grid item xs={2}/>

          <Grid item xs={8}>
            <LatestProducts title="Latest Products" />
          </Grid>

          <Grid item xs={2}/>

          <Grid item xs={2}/>

          <Grid item xs={8}>
            <LatestProducts title="Featured Products" phones={phones.featured}/>
          </Grid>

          <Grid item xs={2}/>


          <EmailSubscribe />
          <SubBar />
    </Grid>
  )
}
