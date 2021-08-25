import React from 'react';
import Phone from '../models/Phone';
import { PhoneCard } from '../PhoneCard';
import { Grid, Typography } from '@material-ui/core';
import ColoredLine from '../../constants/ColoredLine';
import PhoneSkeletonCard from '../Skeletons/PhoneSkeletonCard';
import { blue, gray } from '../../constants/CustomColors';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';



export const LatestProducts = ({title, phones}: {title: string, phones?: Phone[]}) => {

  const skeletons = [<PhoneSkeletonCard/>, <PhoneSkeletonCard/>, <PhoneSkeletonCard/>, <PhoneSkeletonCard/>];

  const list = useSelector((state: State) => state.cart.items);

  return (
    <Grid container style={{
      backgroundColor: '#fff',
      padding: '25px',
      marginTop: '25px',
      marginBottom: '25px'
    }}>
      <Typography variant="h6" style={{color: blue, marginLeft: '40px'}}>{title}</Typography>
      <ColoredLine color={gray}/>
      {phones?.length === 0 || phones === undefined ? (
        <Grid item container xs={12} style={{display: 'flex',margin: 20}}>{skeletons.map(x => (<Grid xs={12} md={6} lg={3} item>{x}</Grid>))}</Grid>
      ) : ""}
      {phones?.map(x => (
        <div style={{margin: 15}} key={x.id}>
          <PhoneCard inCart={list.filter(y => y.id == x.id).length === 1}
          name={x.name} 
          image={x.image ? x.image : "/phone.jpg"} price={x.price} id={x.id} 
          />
        </div>
      ))}
    </Grid>
  )
}
