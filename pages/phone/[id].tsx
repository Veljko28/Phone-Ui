import React from 'react'
import { useRouter } from 'next/router'
import { Grid } from '@material-ui/core'
import PhoneDisplay from '../../components/Phone/PhoneDisplay'


const PhonePage = () => {
  
  const router = useRouter()
  const { id } = router.query

  React.useEffect(() => {
    // Fetch phone using the id with axios
  },[])

  
  return (
    <Grid container>
      <Grid md={2} item/>

      <Grid xs={12} md={8} item> 
        <PhoneDisplay />
      </Grid>

      <Grid md={2} item/>
    </Grid>
  )
}

export default PhonePage
