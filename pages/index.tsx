import { LatestProducts } from "../components/FrontPage/LatestProducts"
import { Grid } from "@material-ui/core";
import SubBar from "../components/FrontPage/SubBar";
import EmailSubscribe from '../components/FrontPage/EmailSubscribe';
// import { ImageCarousel } from "../components/ImageCarousel"

export default function Home() {
  return (
    <Grid container justify="center">
      {/* <ImageCarousel/> */}
          <Grid xs={2}/>

          <Grid item xs={8}>
            <LatestProducts title="Latest Products"/>
          </Grid>

          <Grid xs={2}/>

          <Grid xs={2}/>

          <Grid item xs={8}>
            <LatestProducts title="Featured Products"/>
          </Grid>

          <Grid xs={2}/>
          <EmailSubscribe />
          <SubBar />
    </Grid>
  )
}
