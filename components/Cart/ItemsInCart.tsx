import React from 'react';
import Link from 'next/link';

import { Grid, Typography, IconButton } from '@material-ui/core';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import ColoredLine from '../../constants/ColoredLine';

import { useSelector, useDispatch} from 'react-redux';
import { State } from '../../redux/reduxTypes';
import { removeFromCart } from '../../redux/actions/cartActions';
import Phone from '../models/Phone';
import { blue, gray, red } from '../../constants/CustomColors';

const ItemsInCart = () => {
  const list = useSelector((state: State) => state.cart.items);
  const dispatch = useDispatch();

  console.log(list);

  return (
    <>
    <Grid container className="item-cart">
        <Typography variant="h6" style={{margin: '10px', marginLeft: '40px',
        color: blue}}>My Cart ({list.length})</Typography>
        <ColoredLine color={gray}/>
        <table className="cart-table">
          <thead>
            <tr>
              <td style={{textAlign: 'center'}}>ITEM</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>PRICE</td>
              <td>&nbsp;</td>
            </tr>
          </thead>
          <tbody>
            {list.filter((v: Phone,i: number,self: any) => self.indexOf(v) === i).map((x: Phone) => (
              <tr>
                <td colSpan={3}>
                  <Link href={`/phone/${x.id}`}>
                    <Grid container item style={{display: 'flex', alignContent: 'center'}}>
                      <Grid item xs={12} sm={6}>
                        <img src={x.image} width="50px" height="50px" className="phone-image-cart"/>
                      </Grid>
                      <Grid item xs={12} sm={6} style={{display: 'flex'}}>
                        <span className="phone-name-cart">{x.name}</span>
                      </Grid>
                    </Grid>
                  </Link>
                  </td>
                <td style={{color: blue, marginLeft: 15}}>{(list.filter((y: Phone) => y == x).length * parseInt(x.price as string)) + "$"}</td>
                <td>
                  <IconButton style={{background: 'transparent'}} disableRipple onClick={() => dispatch(removeFromCart(x.id))}>
                    <RemoveCircleIcon style={{color: red}}/>
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
