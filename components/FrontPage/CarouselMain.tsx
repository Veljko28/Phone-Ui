import React from 'react';
import { Carousel } from 'react-bootstrap';
import Image from 'next/image';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Button } from '@material-ui/core';


const CarouselMain = () => {
  return (
  <Carousel slide={true} 
   nextIcon={<ArrowForwardIosIcon style={{fontSize: '25px', color: 'black'}}/>}
   prevIcon={<ArrowBackIosIcon style={{fontSize: '25px', color: 'black'}}/>}>

    <Carousel.Item interval={3000}>
      <Image
        src="/slider/slider1.jpg"
        alt="First slide"
        width="100%"
        layout="responsive"
        height="35px"
      />
      <Carousel.Caption>
        <div className="text-left">
          <Image src="/slider/mi_logo.png" width="40px" height="40px"/>
          <h3 style={{color: 'black'}}>Red Mi Y1</h3>
          <p style={{color: 'black'}}>LED Selfie-light | Fingerprint sensor 
          <br/> Dedicated microSD card slot Snapdragon 435 octa-core processor</p>
          <Button variant="contained" style={{padding: '20px', backgroundColor: '#ff4a00', color: '#fff'}}>BUY NOW !</Button>
        </div>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item interval={3000}>
      <Image
        src="/slider/slider2.jpg"
        alt="Second slide"
        width="100%"
        layout="responsive"
        height="35px"
      />
      <Carousel.Caption>
        <div className="text-left">
          <Image src="/slider/google_logo.png" width="40px" height="40px"/>
          <h3 style={{color: 'black'}}>Google Pixel 2</h3>
          <p style={{color: 'black'}}>The latest Qualcomm Snapdragon 835 processor 
          <br/> Water-resistant metal unibody | Up to 7 hours of battery.</p>
          <Button variant="contained" style={{padding: '20px', backgroundColor: '#ff4a00', color: '#fff'}}>BUY NOW !</Button>
        </div>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item interval={3000}>
      <Image
        src="/slider/slider3.jpg"
        alt="Third slide"
        width="100%"
        layout="responsive"
        height="35px"
      />
      <Carousel.Caption>
         <div className="text-left">
          <Image src="/slider/apple_logo.png" width="40px" height="40px"/>
          <h3 style={{color: 'black'}}>Iphone 8 Plus</h3>
          <p style={{color: 'black'}}>5.5 inch Retina HD Display | 12MP wide-angle cameras</p>
          <Button variant="contained" style={{padding: '20px', backgroundColor: '#ff4a00', color: '#fff'}}>BUY NOW !</Button>
        </div>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  )
}

export default CarouselMain
