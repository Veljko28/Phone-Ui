import React from 'react';
import { Phone } from '../models/Phone';
import { PhoneCard } from '../PhoneCard';
import { State } from '../../redux/reduxTypes';
import { Grid, Typography } from '@material-ui/core';
import ColoredLine from '../../constants/ColoredLine';



export const LatestProducts = ({title, phones}: {title: string, phones?: [Phone]}) => {
  console.log(phones);
  return (
    <Grid container style={{
      backgroundColor: '#fff',
      padding: '10px',
      marginTop: '25px',
      marginBottom: '25px'
    }}>
      <Typography variant="h6" style={{color: '#0cafe5', marginLeft: '40px'}}>{title}</Typography>
      <ColoredLine color="#eee"/>
      {phones?.map(x => (
        <PhoneCard key={x.id} name={x.name} 
        images={["/phone.jpg","/phone2.jpg","/phone3.jpg"]} price={x.price + '$'} id={x.id} />
      ))}
    </Grid>
  )
}
