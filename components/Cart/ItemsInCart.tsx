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
import { blue, gray, red, darker_green } from '../../constants/CustomColors';

const ItemsInCart = ({darkMode} : {darkMode: boolean}) => {
  const list = useSelector((state: State) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <>
    <Grid container className={darkMode ? "item-cart-dark" : "item-cart"}>
        <Typography variant="h6" style={{margin: '10px', marginLeft: '40px',
        color: darkMode ? darker_green : blue}}>My Cart ({list.length})</Typography>
        <ColoredLine color={gray}/>
        <table className={darkMode ? "cart-table-dark" : "cart-table"}>
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
                      <Grid item xs={12} sm={6} style={{display: 'flex', justifyContent: 'center'}}>
                        <img src={x.image} width="50px" height="50px" className="phone-image-cart"/>
                      </Grid>
                      <Grid item xs={12} sm={6} style={{display: 'flex'}}>
                        <span className={darkMode ? "phone-name-cart-dark" : "phone-name-cart"}>{x.name}</span>
                      </Grid>
                    </Grid>
                  </Link>
                  </td>
                <td style={{color: darkMode ? darker_green : blue, marginLeft: 15}}>{(list.filter((y: Phone) => y == x).length * parseInt(x.price as string)) + "$"}</td>
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
      <div className={darkMode ? "shopping-button-dark" : "shopping-button"}>
        <ArrowBackIosIcon style={{fontSize: '15px',marginBottom: '5px'}}/>
        BACK TO SHOPPING
      </div>
    </Link>
    </>
  )
}

export default ItemsInCart;
