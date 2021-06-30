import { Grid } from '@material-ui/core'
import { PhoneCard } from './PhoneCard'
import React from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../redux/reduxTypes'



export const LatestProducts = () => {
  const list = useSelector((state: State) => state.phones.list);
  React.useEffect(() => {
    // axios code for fetching latest phones
  }, []);
  return (
    <Grid container spacing={3} style={{
      backgroundColor: '#fff',
      paddingLeft: '50px',
      paddingRight: '50px',
      marginTop: '25px'
    }}>
      {list.map(x => (
      <Grid item xs={12} sm={6} xl={4} key={x.id}>
        <PhoneCard name={x.name} />
      </Grid>
      ))}
    </Grid>
  )
}
