import { Grid, IconButton } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';

import SettingsIcon from '@material-ui/icons/Settings';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ClearIcon from '@material-ui/icons/Clear';
import EmailIcon from '@material-ui/icons/Email';
import PopOverSettings from '../PopOverSettings';

const MyBids = ({list,changeSnackBar, openPopUp, open, closePopUp, AnchorEl}: {list: any, 
  changeSnackBar: (value: boolean) => any, openPopUp: (e:any) => void, open: boolean, closePopUp: () => void, AnchorEl: any}) => {

   const rowMap = ({id,image, name,price,status,timeEnds} :
        {id: string, image: string, name: string, price: string, status: string, timeEnds: Date}) => {
          const str = timeEnds?.toString().split('T')[0].replace(/-/g,"/");
          const date = {
            year: str?.slice(0,4),
            month: str?.slice(5,7),
            day: str?.slice(8,10)
          }
        return (
            <tr key={id}>
              <td>
                  <Grid container item style={{display: 'flex', alignContent: 'center'}}>
                      <Grid item xs={12} sm={6}>
                        <img src={image} width="50px" height="50px"/>
                      </Grid>
                      <Grid item xs={12} sm={6} style={{display: 'flex', alignItems: 'center'}}>
                        <Link href={`http://localhost:3000/bids/${id}`}><div className="phone-name-mngm">{name}</div></Link>
                      </Grid>
                    </Grid>
              </td>
              <td style={{color: '#43cf22'}}>{price + "$"}</td>
              <td>
                  <div style={status === "Sold !" ? {color: '#43cf22'} : status === "Running" ? {color: "#0cafe5"} : {color: "red"}}>
                      {status}
                  </div>
              </td>
              <td>{date.day + "/" + date.month + "/" + date.year}</td>
              <td>
                  <IconButton
                  onClick={() => {
                      navigator.clipboard.writeText(`http://localhost:3000/bids/${id}`)
                      changeSnackBar(true);
                    }} 
                  style={{width: '35px', height: '35px', margin: '5px', backgroundColor: '#0cafe5'}} 
                  className="share-icon-mngm">
                      <FileCopyIcon style={{fontSize: 15, color: "#fff"}}/>
                 </IconButton>
                 {status === "Running" ? (
                     <>
                        <IconButton 
                    onClick={e => openPopUp(e)} 
                    style={{width: '35px', height: '35px', margin: '5px', backgroundColor: '#4542f5'}} 
                    className="share-icon-mngm">
                        <SettingsIcon style={{fontSize: 15, color: "#fff"}}/>
                    </IconButton>
                    <PopOverSettings open={open} id={id} myBid={true} handleClose={() => closePopUp()} anchorEl={AnchorEl}/>
                    </>
                 ) : status === "Deleted" ? (
                    <IconButton 
                    style={{width: '35px', height: '35px', margin: '5px', backgroundColor: 'red'}} 
                    className="share-icon-mngm">
                        <ClearIcon style={{fontSize: 15, color: "#fff"}}/>
                    </IconButton>
                 ): (
                     <IconButton 
                    style={{width: '35px', height: '35px', margin: '5px', backgroundColor: '#43cf22'}} 
                    className="share-icon-mngm">
                        <EmailIcon style={{fontSize: 15, color: "#fff"}}/>
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
              <td>Price</td>
              <td>Status</td>
              <td>Ends</td>
              <td>&nbsp;</td>
            </tr>
          </thead>
          <tbody>
            {list.map((x: any) => rowMap(x))}
          </tbody>
        </table>
  )
}

export default MyBids;
