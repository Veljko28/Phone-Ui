import { Grid, Typography, IconButton } from '@material-ui/core';
import ColoredLine from '../../constants/ColoredLine';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useSelector, useDispatch} from 'react-redux';
import { State } from '../../redux/reduxTypes';
import { removeFromCart } from '../../redux/actions/cartActions';

const ItemsInCart = () => {
  const list = useSelector((state: State) => state.cart.items);
  const dispatch = useDispatch();

  return (
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
            {list.filter((v,i,self) => self.indexOf(v) === i).map(x => (
              <tr>
                <td 
                >
                  <Link href={`/phone/${x.id}}`}>
                    <div style={{display: 'flex', alignContent: 'center'}}>
                    <Image src={x.images[0]} width="50px" height="50px" className="phone-image-cart"/><span className="phone-name-cart">{x.name}</span>
                    </div>
                  </Link>
                  </td>
                <td>{x.price}</td>
                <td style={{textAlign: 'center'}}>{list.filter(y => y == x).length}</td>
                <td>{(parseInt(x.price.slice(0,-1)) * (list.filter(y => y == x).length))+"$"}</td>
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
  )
}

export default ItemsInCart
