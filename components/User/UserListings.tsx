import { Grid, Typography } from '@material-ui/core';
import ColoredLine from '../../constants/ColoredLine';
import Image from 'next/image';
import Link from 'next/link';



const UserListings = () => {

    const desc = '12.2 MP Rear | 8 MP Front Camera,'
    + '4GB RAM, 2700 mAh battery, Android 8.0, Qualcomm Snapdragon 835, Fingerprint Sensor';

    const ListingTest = [
      {
        id: 1,
        image: '/phone.jpg',
        name: 'Google Pixel',
        desc
      },
      {
        id: 2,
        image: '/phone.jpg',
        name: 'IPhone 8+',
        desc
      },
      {
        id: 3,
        image: '/phone.jpg',
        name: 'Redmi Note 9',
        desc
      }
    ];

    const ListingMap = ({id,image,name,desc} :  
      {id: number, image: string, name: string, desc: string}) => {

        const hasLine = (id : number) => {
          if (id !== 3){
              return <ColoredLine color="#eee"/>
          }
          else return "";
      }

      // console.log(`/phone/${id.toString()}`); 

        return (
            <Link href={`/phone/${id.toString()}`} key={id}>
              <Grid container>
                  <Grid xs={12} md={4} item className="review-grid-item">
                    <div className="curs-hvr">
                      <Image src={image} width="100px" height="100px" />
                    </div>
                  </Grid>
                <Grid xs={12} md={8} item className="listing-grid-item">
                      <Typography variant="subtitle1" style={{color: '#0cafe5'}} className="curs-hver">
                        {name}
                      </Typography>

                      <Typography variant="subtitle2" style={{color: '#999'}}>
                        {desc}
                      </Typography>
                </Grid>
                {hasLine(id)}
               </Grid>
            </Link>
        )
      }

    return (
        <Grid className="phone-details" container style={{marginTop: 10, marginBottom: 10}}>
                {ListingTest.map(x => ListingMap(x) )}
        </Grid>
    );
}

export default UserListings;