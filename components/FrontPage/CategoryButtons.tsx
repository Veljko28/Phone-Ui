import { Grid } from '@material-ui/core'
import React from 'react'
import Image from 'next/image';

const BlockThree = (title: string, img: string ) => (
  <Grid item xs={12} md={6} lg={3} className="phone-block" key={title}>
    <div style={{margin: '20px'}}>
      <Image src={title} width="75px" height="40px" />
    </div>
    <div style={{margin: '20px'}}>
      <Image src={img} width="140px" height="140px" />
    </div>
  </Grid>
)

const CategoryButtons = () => {
  return (
    <Grid container style={{marginTop: '15px'}}>
      {BlockThree("/front/nexus.png", "/front/display_img_1.png")}
      {BlockThree("/front/samsung.png", "/front/display_img_3.png")}
      <Grid item xs={12} md={12} lg={6} className="phone-block-big">
        <div style={{margin: '20px'}}>
          <Image src="/front/iphone.png" width="110px" height="40px" />
        </div>
        <div style={{margin: '20px', alignSelf: 'flex-end', marginLeft: '150px'}}>
          <Image src="/front/display_img_2.png" width="210px" height="225px" />
        </div>
      </Grid>
      {BlockThree("/front/htc.png", "/front/display_img_4.png")}
      {BlockThree("/front/alcatel.png", "/front/display_img_5.png")}
      {BlockThree("/front/pixel.png", "/front/display_img_6.png")}
      {BlockThree("/front/vivo.png", "/front/display_img_7.png")}
    </Grid>
  )
}

export default CategoryButtons
