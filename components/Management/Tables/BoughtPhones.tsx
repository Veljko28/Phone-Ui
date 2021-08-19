import { Grid, IconButton } from '@material-ui/core';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import SettingsIcon from '@material-ui/icons/Settings';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ClearIcon from '@material-ui/icons/Clear';
import EmailIcon from '@material-ui/icons/Email';
import PopOverSettings from '../PopOverSettings';
import { blue, green, red, white } from '../../../constants/CustomColors';

const BoughtPhones = ({list,changeSnackBar, openPopUp, open, closePopUp, AnchorEl}: {list: any, 
  changeSnackBar: (value: boolean) => any, openPopUp: (e:any) => void, open: boolean, closePopUp: () => void, AnchorEl: any}) => {

   const rowMap = ({name,category,seller,price} :
        {name: string, category: string, seller: string, price: string}) => {
        return (
            <tr>
              <td>
                  <Grid container item style={{display: 'flex', alignContent: 'center'}}>
                      <Grid item xs={12} sm={6}>
                        <Image src={'/phone.jpg'} width="50px" height="50px"/>
                      </Grid>
                      <Grid item xs={12} sm={6} style={{display: 'flex', alignItems: 'center'}}>
                        <div className="phone-name-mngm">{name}</div>
                      </Grid>
                    </Grid>
              </td>
              <td>{category}</td>
              <td>
                <Link href="/user/1">
                  <div style={{color: blue}} className="curs-hvr">
                      {seller}
                  </div>
                </Link>
              </td>
              <td>{price}</td>
              <td>
                  <IconButton
                  onClick={() => {
                      navigator.clipboard.writeText("http://localhost:3000/phone/1")
                      changeSnackBar(true);
                    }} 
                  style={{width: '35px', height: '35px', margin: '5px', backgroundColor: blue}} 
                  className="share-icon-mngm">
                      <FileCopyIcon style={{fontSize: 15, color: white}}/>
                 </IconButton>
                 {status === "Running" ? (
                     <>
                        <IconButton 
                    onClick={e => openPopUp(e)} 
                    style={{width: '35px', height: '35px', margin: '5px', backgroundColor: '#4542f5'}} 
                    className="share-icon-mngm">
                        <SettingsIcon style={{fontSize: 15, color: white}}/>
                    </IconButton>
                    <PopOverSettings open={open} handleClose={() => closePopUp()} anchorEl={AnchorEl}/>
                    </>
                 ) : status === "Deleted" ? (
                    <IconButton 
                    style={{width: '35px', height: '35px', margin: '5px', backgroundColor: red}} 
                    className="share-icon-mngm">
                        <ClearIcon style={{fontSize: 15, color: white}}/>
                    </IconButton>
                 ): (
                     <IconButton 
                    style={{width: '35px', height: '35px', margin: '5px', backgroundColor: green}} 
                    className="share-icon-mngm">
                        <EmailIcon style={{fontSize: 15, color: white}}/>
                    </IconButton>
                 )}
                
              </td>
            </tr>
        )
    }

  return (
        <table className="mngm-table">
          <thead>
            <tr>
              <td>Name</td>
              <td>Category</td>
              <td>Seller</td>
              <td>Price</td>
              <td>&nbsp;</td>
            </tr>
          </thead>
          <tbody>
            {list.map((x: any) => rowMap(x))}
          </tbody>
        </table>
  )
}

export default BoughtPhones;
