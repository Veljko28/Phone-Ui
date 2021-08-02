import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Grid, Typography, IconButton } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import ColoredLine from '../../constants/ColoredLine';

import { useSelector, useDispatch} from 'react-redux';
import { State } from '../../redux/reduxTypes';
import { removeFromCart } from '../../redux/actions/cartActions';
import { Phone } from '../models/Phone';

const ItemsInCart = () => {
  const list = useSelector((state: State) => state.cart.items);
  const dispatch = useDispatch();

  console.log(list);

  return (
    <>
    <Grid container className="item-cart">
        <Typography variant="h6" style={{margin: '10px', marginLeft: '40px',
        color: '#0cafe5'}}>My Cart ({list.length})</Typography>
        <ColoredLine color="#eee"/>
        <table className="cart-table">
          <thead>
            <tr>
              <td>ITEM</td>
              <td>PRICE</td>
              <td>QUANTITY</td>
              <td>TOTAL</td>
              <td>&nbsp;</td>
            </tr>
          </thead>
          <tbody>
            {list.filter((v: Phone,i: number,self: any) => self.indexOf(v) === i).map((x: Phone) => (
              <tr>
                <td>
                  <Link href={`/phone/${x.id}`}>
                    <Grid container item style={{display: 'flex', alignContent: 'center'}}>
                      <Grid item xs={12} sm={6}>
                        <img src={x.image} width="50px" height="50px" className="phone-image-cart"/>
                      </Grid>
                      <Grid item xs={12} sm={6} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <span className="phone-name-cart">{x.name}</span>
                      </Grid>
                    </Grid>
                  </Link>
                  </td>
                <td>{x.price + "$"}</td>
                <td style={{textAlign: 'center'}}>{list.filter((y: Phone) => y == x).length}</td>
                <td style={{color: '#0cafe5'}}>{(list.filter((y: Phone) => y == x).length * parseInt(x.price)) + "$"}</td>
                <td>
                  <IconButton style={{background: 'transparent'}} disableRipple onClick={() => dispatch(removeFromCart(x))}>
                    <HighlightOffIcon style={{color: 'red'}}/>
                  </IconButton>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
    </Grid>
    <Link href="/phones/1">
      <div className="shopping-button">
        <ArrowBackIosIcon style={{fontSize: '15px',marginBottom: '5px'}}/>
        BACK TO SHOPPING
      </div>
    </Link>
    </>
  )
}

export default ItemsInCart;
