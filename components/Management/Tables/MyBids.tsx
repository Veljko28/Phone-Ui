import { Grid, IconButton } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';

import SettingsIcon from '@material-ui/icons/Settings';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ClearIcon from '@material-ui/icons/Clear';
import EmailIcon from '@material-ui/icons/Email';
import PopOverSettings from '../PopOverSettings';
import { formatDate } from '../../../constants/formatDate';
import { blue, green, red, white } from '../../../constants/CustomColors';
import PopUpDialog from '../../../constants/PopUpDialog';
import { fetchDelete } from '../../../constants/CustomFetching';

const MyBids = ({list,changeSnackBar, openPopUp, open, closePopUp, AnchorEl, t}: {list: any, 
  changeSnackBar: (value: boolean) => any, openPopUp: (e:any) => void, open: boolean, closePopUp: () => void, AnchorEl: any, t: any}) => {


     const [selectedId, changeSelectedId] = React.useState<string | undefined>(undefined);
     const [dialogOpen,changeDialogOpen] = React.useState(false);


     const deletePhone = async () => {

        const res = await fetchDelete(`http://localhost:10025/api/v1/bids/delete/${selectedId}`);
        changeDialogOpen(false);
        if (res.ok){
          setTimeout(() => {
          location.reload();
          },1500)
        }
    }

   const rowMap = ({id,image, name,price,status,date_Ends} :
        {id: string, image: string, name: string, price: string, status: string, date_Ends: Date}) => {

        const date = formatDate(date_Ends);
        
        return (
            <tr key={id}>
              <td>
                  <Grid container item style={{display: 'flex', alignContent: 'center'}}>
                      <Grid item xs={12} sm={6} style={{display: 'flex', justifyContent: 'center'}}>
                        <img src={image} width="50px" height="50px" />
                      </Grid>
                      <Grid item xs={12} sm={6} style={{display: 'flex', alignItems: 'center'}}>
                        <Link href={`http://localhost:3000/bid/${id}`}><div className="phone-name-mngm">{name}</div></Link>
                      </Grid>
                    </Grid>
              </td>
              <td style={{color: green}}>{price + "$"}</td>
              <td>
                  <div style={status === "Won" ? {color: green} : status === t("management.status.running")  ? {color: blue} : {color: red}}>
                      {status === t("management.status.won")  ? "Sold !" : status}
                  </div>
              </td>
              <td>{date}</td>
              <td>
                  <IconButton
                  onClick={() => {
                      navigator.clipboard.writeText(`http://localhost:3000/bid/${id}`)
                      changeSnackBar(true);
                    }} 
                  style={{width: '35px', height: '35px', margin: '5px', backgroundColor: blue }} 
                  className="share-icon-mngm">
                      <FileCopyIcon style={{fontSize: 15, color: white}}/>
                 </IconButton>
                 {status === t("management.status.running")  ? (
                     <>
                        <IconButton 
                      onClick={e => {
                        changeSelectedId(id);
                        openPopUp(e)
                      }} 
                      style={{width: '35px', height: '35px', margin: '5px', backgroundColor: '#4542f5'}} 
                      className="share-icon-mngm">
                        <SettingsIcon style={{fontSize: 15, color: "#fff"}}/>
                    </IconButton>
                    <PopOverSettings open={open} id={selectedId} myBid={true} handleClose={() => closePopUp()} anchorEl={AnchorEl}/>
                    </>
                 ) : status === "Failed" ? (
                    <IconButton 
                    style={{width: '35px', height: '35px', margin: '5px', backgroundColor: red}} 
                    className="share-icon-mngm"
                    onClick={() => {
                        changeSelectedId(id);
                        changeDialogOpen(true);
                      }}>
                        <ClearIcon style={{fontSize: 15, color: "#fff"}}/>
                          <PopUpDialog open={dialogOpen} closeDialog={() => changeDialogOpen(false)} 
                      title={`Are you sure you want to delete this phone?`}
                      message={"By agreeing with this, your phone will be delete from our server forever !"}
                      onConfirm={() => deletePhone()}/>
                    </IconButton>
                 ): (
                     <IconButton 
                    style={{width: '35px', height: '35px', margin: '5px', backgroundColor: green}} 
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
              <td>{t("management.header.name")}</td>
              <td>{t("management.header.price")}</td>
              <td>{t("management.header.status")}</td>
              <td>{t("management.header.ends")}</td>
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
