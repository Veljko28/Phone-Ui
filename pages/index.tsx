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

  const initState = {featured: undefined, latest: undefined};

  const [phones,changePhones] = React.useState(initState);

  React.useEffect(() => {
    const func = async () => {
      const res = await fetchGet('http://localhost:10025/api/v1/phones/featured/1');

      const json = await (res as Response).json();

      const res2 = await fetchGet('http://localhost:10025/api/v1/phones/latest');

      if (res && res.ok && res2 && res2.ok){
        changePhones({featured: json, latest: await (res2 as Response).json()});
      }
    }

     func();
  },[]);

  return (
    <Grid container justifyContent="center">

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
            <LatestProducts title="Latest Products"  phones={phones.latest}/>
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
