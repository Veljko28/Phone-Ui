import { LatestProducts } from "../components/FrontPage/LatestProducts"
import { Grid } from "@material-ui/core";
import SubBar from "../components/FrontPage/SubBar";
import EmailSubscribe from '../components/FrontPage/EmailSubscribe';
// import { ImageCarousel } from "../components/ImageCarousel"

export default function Home() {
  return (
    <Grid container justify="center">
      {/* <ImageCarousel/> */}
          <LatestProducts title="Latest Products"/>
          <EmailSubscribe />
          <SubBar />
    </Grid>
  )
}
