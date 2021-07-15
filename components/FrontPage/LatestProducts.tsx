import { Grid, Typography } from '@material-ui/core';
import { PhoneCard } from '../PhoneCard';
import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';
import ColoredLine from '../../constants/ColoredLine';



export const LatestProducts = ({title}: {title: string}) => {
  const list = useSelector((state: State) => state.phones.list);
  React.useEffect(() => {
    // axios code for fetching latest phones
  }, []);
  return (
    <Grid container style={{
      backgroundColor: '#fff',
      padding: '10px',
      marginTop: '25px',
      marginBottom: '25px'
    }}>
      <Typography variant="h6" style={{color: '#0cafe5', marginLeft: '40px'}}>{title}</Typography>
      <ColoredLine color="#eee"/>
      {list.splice(0,4).map(x => (
      <Grid item xs={12} md={6} lg={3} key={x.id}>
        <PhoneCard name={x.name} images={["/phone.jpg","/phone2.jpg","/phone3.jpg"]} price="1500$" discount="1200$" id={x.id} />
      </Grid>
      ))}
    </Grid>
  )
}
