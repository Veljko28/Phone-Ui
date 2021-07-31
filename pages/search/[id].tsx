import React from 'react'
import { useRouter } from 'next/router'
import { Typography } from '@material-ui/core';
import { PhoneCard } from '../../components/PhoneCard';
import { BidCard } from '../../components/BidCard';
import ColoredLine from '../../constants/ColoredLine';


const search = () => {

  const router = useRouter()
  const id = router.query['id']

  const testData = [{name: 'Pixel 1', id: '1', price: 150}, {name: 'IPhone 7+', id: '2',price: 270},
  {name: 'Redmi Note 9', id: '3',price: 475}, {name: 'Nokia 5', id: '4', price: 80},
  {name: 'Pixel 1', id: '5', price: 420}, {name: 'IPhone 7+', id: '6', price: 570},
  {name: 'Redmi Note 9', id: '7', price: 350}, {name: 'Nokia 5', id: '8', price: 125},
  {name: 'Nokia 5', id: '9', price: 650}]

  const [data,changeData] = React.useState({
    phones: testData,
    bids: testData,
    users: []
  });

  React.useEffect(() => {

  },[])


  return (
    <div>
      <Typography variant="h4" style={{color: '#0cafe5', margin: 15}}>Phones</Typography>
      {data.phones.map(x => (
        <PhoneCard key={x.id} name={x.name} 
        images={["/phone.jpg","/phone2.jpg","/phone3.jpg"]} price={x.price + '$'} id={x.id} />
      ))}
      <ColoredLine color="#eee"/>
    </div>
  )
}

export default search
