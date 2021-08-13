import React from 'react';
import Phone from '../models/Phone';
import { PhoneCard } from '../PhoneCard';
import { Grid, Typography } from '@material-ui/core';
import ColoredLine from '../../constants/ColoredLine';



export const LatestProducts = ({title, phones}: {title: string, phones?: Phone[]}) => {
  return (
    <Grid container style={{
      backgroundColor: '#fff',
      padding: '25px',
      marginTop: '25px',
      marginBottom: '25px'
    }}>
      <Typography variant="h6" style={{color: '#0cafe5', marginLeft: '40px'}}>{title}</Typography>
      <ColoredLine color="#eee"/>
      {phones?.map(x => (
        <div style={{margin: 15}} key={x.id}>
          <PhoneCard
           name={x.name} 
          image={x.image ? x.image : "/phone.jpg"} price={x.price} id={x.id} 
          />
        </div>
      ))}
    </Grid>
  )
}
