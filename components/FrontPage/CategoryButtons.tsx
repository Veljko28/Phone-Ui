import { Grid } from '@material-ui/core'
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { changePhoneCategory } from '../../redux/actions/phonesActions';

// const BlockThree = (title: string, img: string ) => (
//   <Grid item xs={12} md={6} lg={3} className="phone-block" key={title}>
//     <div style={{margin: '20px'}}>
//       <Image src={title} width="75px" height="40px" />
//     </div>
//     <div style={{margin: '20px'}}>
//       <Image src={img} width="140px" height="140px" />
//     </div>
//   </Grid>
// )

const CategoryButtons = () => {

  const dispatch = useDispatch();

  const defaultOptions = {
        category: "All Phones",
        brand: "All",
        price: "All",
        sorting: "none"
  };

  return (
    <Link href="/phones/1">
      <Grid container style={{marginTop: '15px'}}>

        <Grid item xs={12} md={12} lg={3} className="phone-block"
        onClick={() => dispatch(changePhoneCategory({...defaultOptions, brand: "Google"}))}>
            <div style={{margin: '20px'}}>
              <Image src="/front/nexus.png" width="75px" height="40px" />
            </div>
            <div style={{margin: '20px'}}>
              <Image src="/front/display_img_1.png" width="140px" height="140px" />
            </div>
        </Grid>

        <Grid item xs={12} md={12} lg={6} className="phone-block-big"
        onClick={() => dispatch(changePhoneCategory({...defaultOptions, brand: "Apple"}))}>
          <div style={{margin: '20px'}}>
            <Image src="/front/iphone.png" width="110px" height="40px" />
          </div>
          <div style={{margin: '20px', alignSelf: 'flex-end', marginLeft: '150px'}}>
            <Image src="/front/display_img_2.png" width="210px" height="225px" />
          </div>
        </Grid>

        <Grid item xs={12} md={12} lg={3} className="phone-block"
        onClick={() => dispatch(changePhoneCategory({...defaultOptions, brand: "Samsung"}))}>
            <div style={{margin: '20px'}}>
              <Image src="/front/samsung.png" width="75px" height="35px" />
            </div>
            <div style={{margin: '20px'}}>
              <Image src="/front/display_img_3.png" width="140px" height="140px" />
            </div>
        </Grid>


        <Grid item xs={12} md={6} lg={3} className="phone-block"
        onClick={() => dispatch(changePhoneCategory({...defaultOptions, brand: "Htc"}))}>
            <div style={{margin: '20px'}}>
              <Image src="/front/htc.png" width="75px" height="40px" />
            </div>
            <div style={{margin: '20px'}}>
              <Image src="/front/display_img_4.png" width="130px" height="130px" />
            </div>
        </Grid>

        <Grid item xs={12} md={6} lg={3} className="phone-block"
        onClick={() => dispatch(changePhoneCategory({...defaultOptions, brand: "Alcatel"}))}>
            <div style={{margin: '20px'}}>
              <Image src="/front/alcatel.png" width="85px" height="40px" />
            </div>
            <div style={{margin: '20px'}}>
              <Image src="/front/display_img_5.png" width="130px" height="130px" />
            </div>
        </Grid>


        <Grid item xs={12} md={6} lg={3} className="phone-block"
        onClick={() => dispatch(changePhoneCategory({...defaultOptions, brand: "Google"}))}>
            <div style={{margin: '20px'}}>
              <Image src="/front/pixel.png" width="70px" height="45px" />
            </div>
            <div style={{margin: '20px'}}>
              <Image src="/front/display_img_6.png" width="130px" height="130px" />
            </div>
        </Grid>


        
        <Grid item xs={12} md={6} lg={3} className="phone-block"
        onClick={() => dispatch(changePhoneCategory({...defaultOptions, brand: "Vivo"}))}>
            <div style={{margin: '20px'}}>
              <Image src="/front/vivo.png" width="75px" height="40px" />
            </div>
            <div style={{margin: '20px'}}>
              <Image src="/front/display_img_7.png" width="130px" height="130px" />
            </div>
        </Grid>

      </Grid>
    </Link>
  )
}

export default CategoryButtons
