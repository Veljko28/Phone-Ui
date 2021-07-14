import { LatestProducts } from "../components/FrontPage/LatestProducts"
import { Grid } from "@material-ui/core";
import SubBar from "../components/FrontPage/SubBar";
import EmailSubscribe from '../components/FrontPage/EmailSubscribe';
import CategoryButtons from "../components/FrontPage/CategoryButtons";
import CarouselMain from "../components/FrontPage/CarouselMain";
import TitleChange from "../constants/TitleChange";
// import { ImageCarousel } from "../components/ImageCarousel"

export default function Home() {
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
            <LatestProducts title="Latest Products"/>
          </Grid>

          <Grid item xs={2}/>

          <Grid item xs={2}/>

          <Grid item xs={8}>
            <LatestProducts title="Featured Products"/>
          </Grid>

          <Grid item xs={2}/>


          <EmailSubscribe />
          <SubBar />
    </Grid>
  )
}
