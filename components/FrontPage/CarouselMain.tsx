import React from 'react';
import { Carousel } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';
import { gray } from '../../constants/CustomColors';


const CarouselMain = () => {

  const darkMode = useSelector((state: State) => state.userInfo.darkMode);

  return (
  <Carousel slide={true} 
   nextIcon={<ArrowForwardIosIcon style={{fontSize: '25px', color: darkMode ? gray : 'black'}}/>}
   prevIcon={<ArrowBackIosIcon style={{fontSize: '25px', color: darkMode ? gray : 'black'}}/>}>

    <Carousel.Item interval={3000}>
      <Image
        src={darkMode ? "/slider/slider1_dark.jpg" : "/slider/slider1.jpg"}
        alt="First slide"
        width="100%"
        layout="responsive"
        height="35px"
      />
      <Carousel.Caption>
        <div className="text-left">
          <Image src="/slider/mi_logo.png" width="40px" height="40px"/>
          <h3 style={{color: darkMode ? gray : 'black'}}>Red Mi Y1</h3>
          <p style={{color: darkMode ? gray : 'black'}}>LED Selfie-light | Fingerprint sensor 
          <br/> Dedicated microSD card slot Snapdragon 435 octa-core processor</p>
          <Link href="/phones/1">
            <Button variant="contained" style={{padding: '20px', backgroundColor: '#ff4a00', color: '#fff'}}>BUY NOW !</Button>
          </Link>
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
          <Link href="/phones/1">
            <Button variant="contained" style={{padding: '20px', backgroundColor: '#ff4a00', color: '#fff'}}>BUY NOW !</Button>
          </Link>
        </div>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item interval={3000}>
      <Image
        src={darkMode ? "/slider/slider3_dark.jpg" : "/slider/slider3.jpg"}
        alt="Third slide"
        width="100%"
        layout="responsive"
        height="35px"
      />
      <Carousel.Caption>
         <div className="text-left">
          <Image src="/slider/apple_logo.png" width="40px" height="40px"/>
          <h3 style={{color: darkMode ? gray : 'black'}}>Iphone 8 Plus</h3>
          <p style={{color: darkMode ? gray : 'black'}}>5.5 inch Retina HD Display | 12MP wide-angle cameras</p>
          <Link href="/phones/1">
            <Button variant="contained" style={{padding: '20px', backgroundColor: '#ff4a00', color: '#fff'}}>BUY NOW !</Button>
          </Link>
        </div>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  )
}

export default CarouselMain
