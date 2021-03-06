import React from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

import Phone from '../../models/Phone';
import { blue, darker_green, white } from '../../../constants/CustomColors';
import { addToCart, removeFromCart } from '../../../redux/actions/cartActions';

const PhoneButtonTypes = ({id, inCart, currentUserId, userId, phone, darkMode, t} : any) => {

  const router = useRouter();
  const dispatch = useDispatch()

  return (
    <div>
      {userId === currentUserId ? (
              <>
       <Button variant="contained" onClick={() => router.push(`/phone/edit/${id}`)}
                style={{backgroundColor: darkMode ? darker_green : blue, color: white, padding: '15px', marginTop: '10px'}}>
                <EditIcon style={{fontSize: '20px', marginRight: '5px'}}/>{t("display.phoneButtons.edit")}</Button>
              </>
          ) : inCart ? (
            <Button variant="contained" 
            style={{backgroundColor: darkMode ? darker_green : blue, color: white, padding: '15px', marginTop: '10px'}} onClick={() => dispatch(removeFromCart(id as string))}>
              <RemoveShoppingCartIcon style={{fontSize: '20px', marginRight: '5px'}}/>{t("display.phoneButtons.remove")}</Button>
            )
            :
            (
          <Button variant="contained" 
          onClick={currentUserId !== null ? () => dispatch(addToCart(phone as Phone)) : () => router.push('/login')}
          style={{backgroundColor: darkMode ? darker_green : blue, color: white, padding: '15px', marginTop: '10px'}}>
              <ShoppingCartIcon style={{fontSize: '20px', marginRight: '5px'}}/>{t("display.phoneButtons.add")}
          </Button>)
        }
    </div>
  )
}

export default PhoneButtonTypes
