import { LatestProducts } from "../components/FrontPage/LatestProducts"
import { Grid } from "@material-ui/core";
// import { ImageCarousel } from "../components/ImageCarousel"

export default function Home() {
  return (
    <Grid container justify="center">
      {/* <ImageCarousel/> */}
        <Grid item>
          <LatestProducts/>
        </Grid>
    </Grid>
  )
}
