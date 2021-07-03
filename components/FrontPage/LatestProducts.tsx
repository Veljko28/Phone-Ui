import { Grid, Typography } from '@material-ui/core';
import { PhoneCard } from '../PhoneCard';
import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';
import ColoredLine from '../../constants/ColoredLine';



export const LatestProducts = () => {
  const list = useSelector((state: State) => state.phones.list);
  React.useEffect(() => {
    // axios code for fetching latest phones
  }, []);
  return (
    <Grid container spacing={3} style={{
      backgroundColor: '#fff',
      padding: '50px',
      marginTop: '25px'
    }}>
      <Typography variant="h6">Featured Products</Typography>
      <ColoredLine color="#eee"/>
      {list.splice(0,4).map(x => (
      <Grid item xs={12} sm={6} lg={3} key={x.id}>
        <PhoneCard name={x.name} imagePath="/phone.jpg" price="1500$" discount="1200$" />
      </Grid>
      ))}
    </Grid>
  )
}
