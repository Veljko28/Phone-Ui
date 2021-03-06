import { Grid, IconButton } from '@material-ui/core';
import React from 'react';
import Link from 'next/link';

import SettingsIcon from '@material-ui/icons/Settings';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ClearIcon from '@material-ui/icons/Clear';
import EmailIcon from '@material-ui/icons/Email';
import PopOverSettings from '../PopOverSettings';
import { formatDate } from '../../../constants/formatDate';
import { blue, green, red, white } from '../../../constants/CustomColors';
import PopUpDialog from '../../../constants/PopUpDialog';
import { fetchDelete } from '../../../constants/CustomFetching';

const MyPhones = ({list,changeSnackBar, openPopUp, open, closePopUp, AnchorEl, t}: {list: any, 
  changeSnackBar: (value: boolean) => any, openPopUp: (e:any) => void, open: boolean, closePopUp: () => void, AnchorEl: any, t: any}) => {

   const [selectedId, changeSelectedId] = React.useState<string | undefined>(undefined);
   const [dialogOpen,changeDialogOpen] = React.useState(false);


     const deletePhone = async () => {

        const res = await fetchDelete(`http://localhost:10025/api/v1/phones/delete/${selectedId}`);
        changeDialogOpen(false);
        if (res.ok){
          setTimeout(() => {
          location.reload();
          },1500)
        }
    }

   const rowMap = ({id, name, image, price, status, dateCreated} :
        {id: string,name: string, image: string, price: string | number, status: string, dateCreated: Date, idx: number}) => {

        const date = formatDate(dateCreated);
          
        return (
            <tr key={id}>
              <td>
                  <Grid container item style={{display: 'flex', alignContent: 'center'}}>
                      <Grid item xs={12} sm={6} style={{display: 'flex', justifyContent: 'center'}}>
                        <img src={image} width="50px" height="50px"/>
                      </Grid>
                      <Link href={`http://localhost:3000/phone/${id}`}>
                        <Grid item xs={12} sm={6} style={{display: 'flex', alignItems: 'center'}}>
                          <div className="phone-name-mngm">{name}</div>
                        </Grid>
                      </Link>
                    </Grid>
              </td>
              <td style={{color: green}}>{price + "$"}</td>
              <td>
                  <div style={status === "Sold" ? {color: green} : status === t("management.status.running")  ? {color: blue} : {color: red}}>
                      {status}
                  </div>
              </td>
              <td>{date}</td>
              <td>
                  <IconButton
                  onClick={() => {
                      navigator.clipboard.writeText(`http://localhost:3000/phone/${id}`)
                      changeSnackBar(true);
                    }} 
                  style={{width: '35px', height: '35px', margin: '5px', backgroundColor: blue}} 
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
                        <SettingsIcon style={{fontSize: 15, color: white}}/>
                    </IconButton>
                    <PopOverSettings id={selectedId} open={open} handleClose={() => closePopUp()} anchorEl={AnchorEl}/>
                    </>
                 ) : (<>
                    <IconButton 
                    style={{width: '35px', height: '35px', margin: '5px', backgroundColor: red}} 
                    className="share-icon-mngm"
                   onClick={() => {
                        changeSelectedId(id);
                        changeDialogOpen(true);
                      }}>
                    <ClearIcon style={{fontSize: 20, color: white}}/>
                   </IconButton>
                   <PopUpDialog open={dialogOpen} closeDialog={() => changeDialogOpen(false)} 
                    title={`Are you sure you want to delete this phone?`}
                    message={"By agreeing with this, your phone will be delete from our server forever !"}
                    onConfirm={() => deletePhone()}/>
                 </>)}
                
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
              <td>{t("management.header.created")}</td>
              <td>&nbsp;</td>
            </tr>
          </thead>
          <tbody>
            {list.map((x: any) => rowMap(x))}
          </tbody>
        </table>
  )
}

export default MyPhones
