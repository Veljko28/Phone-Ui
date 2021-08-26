import { Grid, IconButton } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ClearIcon from '@material-ui/icons/Clear';
import EmailIcon from '@material-ui/icons/Email';
import { blue, green, red, white } from '../../../constants/CustomColors';
import { fetchGet } from '../../../constants/CustomFetching';
import { timeLeft } from '../../../constants/formatDate';

const PlacedBids = ({list,changeSnackBar, openPopUp, open, closePopUp, AnchorEl}: {list: any, 
  changeSnackBar: (value: boolean) => any, openPopUp: (e:any) => void, open: boolean, closePopUp: () => void, AnchorEl: any}) => {

    const [phoneList, changePhoneList] = React.useState<any>([]);

    React.useEffect(() => {
       const func = async () => {
          // mapping the username of the seller to a new phoneList 
          let newList = [];
          for (const phone of list){
            const res = await fetchGet(`http://localhost:10025/api/v1/users/username/${phone.seller}`);
            phone.sellerName = await res.text();
            newList.push(phone);
          }
          changePhoneList(newList);
       }
       func();
    },[list])

   const rowMap = ({id,name,price,seller,status, image, sellerName, date_Ends} :
        {id:string, name: string, price: string, seller: string, status: string, image: string, sellerName: string, date_Ends: Date}) => {
        return (
            <tr>
              <td>
                  <Grid container item style={{display: 'flex', alignContent: 'center'}}>
                      <Grid item xs={12} sm={6}>
                        <img src={image} width="50px" height="50px"/>
                      </Grid>
                      <Grid item xs={12} sm={6} style={{display: 'flex', alignItems: 'center'}}>
                        <Link href={`/bid/${id}`}>
                          <div className="phone-name-mngm">{name}</div>
                        </Link>
                      </Grid>
                    </Grid>
              </td>
              <td style={{color: blue}}>{price}$</td>
              <td>
                <Link href={`/user/${seller}`}>
                  <div style={{color: blue}} className="curs-hvr">
                      {sellerName}
                  </div>
                </Link>
              </td>
              <td style={{color: blue}}>
                {timeLeft(date_Ends) !== "Finished !" ? "Running" : "Finished"}</td>
              <td>
                  <IconButton
                  onClick={() => {
                      navigator.clipboard.writeText(`http://localhost:3000/bid/${id}`)
                      changeSnackBar(true);
                    }} 
                  style={{width: '35px', height: '35px', margin: '5px', backgroundColor: blue}} 
                  className="share-icon-mngm">
                      <FileCopyIcon style={{fontSize: 15, color: white}}/>
                 </IconButton>
                 {status === "Won !" ? (
                      <IconButton 
                    style={{width: '35px', height: '35px', margin: '5px', backgroundColor: green}} 
                    className="share-icon-mngm">
                        <EmailIcon style={{fontSize: 15, color: white}}/>
                    </IconButton>
                 ) : status === "Lost !" ? (
                    <IconButton 
                    style={{width: '35px', height: '35px', margin: '5px', backgroundColor: red}} 
                    className="share-icon-mngm">
                        <ClearIcon style={{fontSize: 15, color: white}}/>
                    </IconButton>
                 ): (
                   <Link href={`/bid/${id}`}>
                       <IconButton
                    style={{width: '35px', height: '35px', margin: '5px', backgroundColor: '#4542f5'}} 
                    className="share-icon-mngm">
                        <ArrowForwardIcon style={{fontSize: 15, color: white}}/>
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
            {phoneList.map((x: any) => rowMap(x))}
          </tbody>
        </table>
  )
}

export default PlacedBids;
