import { Grid, IconButton } from '@material-ui/core';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ClearIcon from '@material-ui/icons/Clear';
import EmailIcon from '@material-ui/icons/Email';
import PopOverSettings from '../PopOverSettings';

const PlacedBids = ({list,changeSnackBar, openPopUp, open, closePopUp, AnchorEl}: {list: any, 
  changeSnackBar: (value: boolean) => any, openPopUp: (e:any) => void, open: boolean, closePopUp: () => void, AnchorEl: any}) => {

   const rowMap = ({name,price,seller,status} :
        {name: string, price: string, seller: string, status: string}) => {
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
              <td>{price}</td>
              <td>
                <Link href="/user/1">
                  <div style={{color: "#0cafe5"}} className="curs-hvr">
                      {seller}
                  </div>
                </Link>
              </td>
              <td style={status === "Running" ? {color: '#0cafe5'} : status === "Won !" ? {color: "#43cf22"} : {color: "red"}}>{status}</td>
              <td>
                  <IconButton
                  onClick={() => {
                      navigator.clipboard.writeText("http://localhost:3000/phone/1")
                      changeSnackBar(true);
                    }} 
                  style={{width: '35px', height: '35px', margin: '5px', backgroundColor: '#0cafe5'}} 
                  className="share-icon-mngm">
                      <FileCopyIcon style={{fontSize: 15, color: "#fff"}}/>
                 </IconButton>
                 {status === "Won !" ? (
                      <IconButton 
                    style={{width: '35px', height: '35px', margin: '5px', backgroundColor: '#43cf22'}} 
                    className="share-icon-mngm">
                        <EmailIcon style={{fontSize: 15, color: "#fff"}}/>
                    </IconButton>
                 ) : status === "Lost !" ? (
                    <IconButton 
                    style={{width: '35px', height: '35px', margin: '5px', backgroundColor: 'red'}} 
                    className="share-icon-mngm">
                        <ClearIcon style={{fontSize: 15, color: "#fff"}}/>
                    </IconButton>
                 ): (
                   <Link href="/phone/1">
                       <IconButton
                    style={{width: '35px', height: '35px', margin: '5px', backgroundColor: '#4542f5'}} 
                    className="share-icon-mngm">
                        <ArrowForwardIcon style={{fontSize: 15, color: "#fff"}}/>
                    </IconButton>
                    </Link>
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
              <td>Price</td>
              <td>Seller</td>
              <td>Status</td>
              <td>&nbsp;</td>
            </tr>
          </thead>
          <tbody>
            {list.map((x: any) => rowMap(x))}
          </tbody>
        </table>
  )
}

export default PlacedBids;
