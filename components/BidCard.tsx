import React from 'react'
import {Grid, Typography, IconButton} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Link from 'next/link';


export const BidCard = (props: {image: string, name: string, price: string, ends: Date, id: string}) => {

  const timeUntilEnd = () => {
    const now = new Date().getTime();

    const endTime = new Date(props.ends).getTime();

    if (now > endTime) return "Finished !";

    const distance = endTime - now;


    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (days > 0) {
      return days + "d " + hours + "h " + minutes + "m ";
    }
    
    return  hours + "h " + minutes + "m " + seconds + "s ";
  };

  let time = timeUntilEnd();

  return (
    <Grid container className="cardContainer" style={{width: '250px', border: '1px solid #eee'}}>
       {}<Link href={`/bid/${props.id}`}>
        <div>
            <div className="imageConatiner">
            <img src={props.image}  width="150px" height="150px"/>
            </div>

            <div className="card-textarea">
              <Typography variant="h6">
                {props.name}
              </Typography>
              <Typography variant="subtitle1" style={{display: 'inline-block'}}>
                <span style={{fontSize: "15px"}}>Current Price: <span style={{color: '#0cafe5'}}>{props.price + "$"}</span></span>
              </Typography>
              <div style={{fontSize: "15px"}}>Ends in: <span style={{color: '#0cafe5'}}>{time}</span></div>
            </div>
          </div>
        </Link>

        <div className="buttonConainer">
          <IconButton size="small" style={{backgroundColor: 'red', color: 'white', padding: '5px', margin: '5px'}}>
            <FavoriteIcon/>
          </IconButton>

          <Link href={`/bid/${props.id}`}>
            <IconButton size="small" style={{backgroundColor: '#4d88ff', color: 'white', padding: '5px', margin: '5px', fontSize: '15px'}} >
              <ArrowForwardIosIcon/>
            </IconButton>
          </Link>
        </div>
    </Grid>
  )
}
