import { Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { darker_green, blue, gray, white, dark_cont, green, red } from '../constants/CustomColors'
import { fetchGet, fetchPost } from '../constants/CustomFetching'
import { SnackBarFailed, SnackBarSuccess } from '../constants/CustomSnackBars'
import PopUpDialog from '../constants/PopUpDialog'
import { State } from '../redux/reduxTypes'

const coupons = () => {

  const [dialog, changeDialog] = React.useState({
    open: false,
    amount: 0
  });

  const [snackBar, changeSnackBar] = React.useState({success: false, error: false});

  const darkMode = useSelector((state: State) => state.userInfo.darkMode);
  const { t } = useTranslation();

  const openDialog = (amount: number) => {
    changeDialog({open: true, amount});
  }

  const onCofirm = async () => {
    const removeAmount = dialog.amount === 10 ? 100 : dialog.amount === 20 ? 200 : dialog.amount === 50 ? 350 : 500;

    const res = await fetchGet(`http://localhost:10025/api/v1/users/loyality/get/${localStorage.userId}`)

    const points = await res.text();

    if (removeAmount > points) {
      changeSnackBar({error: true, success: false});
      changeDialog({...dialog, open: false});
      return;
    }
    
    changeDialog({...dialog, open: false});
    const removePoints = await fetchPost('http://localhost:10025/api/v1/users/loyality/remove', {
      userId: localStorage.userId,
      amount: removeAmount
    })

    if (removePoints.ok){
      const sendCoupon = await fetchPost('http://localhost:10025/api/v1/email/coupon', {
        userId: localStorage.userId,
        amount: dialog.amount
      })
      // give back point if coupon not sent
      if (!sendCoupon.ok){
        await fetchPost(`http://localhost:10025/api/v1/users/loyality/add`, {userId: localStorage.userId, amount: removeAmount});
        changeSnackBar({error: true, success: false});
        return;
      }
      changeSnackBar({...snackBar, success: true});
      setTimeout(() => location.reload(), 1500);
    }
  }

  return (
    <Grid container>
      <Grid item lg={2} xs={1}/>

      <Grid container item lg={8} xs={10} style={{display: 'flex',justifyContent: 'center'}}>
          <Typography variant="h4" style={{color: darkMode ? darker_green : blue, marginTop: 20,marginLeft: 10, textAlign: 'center'}}>Buy Coupons</Typography>

          <Grid container item xs={12}>
            <Grid lg={2}/>

              <Grid item xs={6} lg={4} style={{display: 'flex',flexDirection: 'column', alignItems: 'center', textAlign: 'center',
            border: "2px solid #eee", backgroundColor: darkMode ? dark_cont : white, margin: 15}}>
                  <Typography variant="h1" style={{color: darkMode ? darker_green : blue}}>10%</Typography>
                  <Typography variant="h6" style={{color: darkMode ? gray : 'black', margin: 5}}>{t("coupon.get10text")}</Typography>
                  <Typography variant="h6" style={{color: darkMode ? blue : green, margin: 5}}>{t("coupon.cost")}: 100₽</Typography>
                  
                  <Button onClick={() => openDialog(10)}
                   variant="contained" style={{backgroundColor: darkMode ? darker_green : blue, color: white, margin: 10}}>{t("coupon.button10")}</Button>

              </Grid>

              <Grid item xs={6} lg={4} style={{display: 'flex',flexDirection: 'column', alignItems: 'center', textAlign: 'center',
            border: "2px solid #eee", backgroundColor: darkMode ? dark_cont : white, margin: 15}}>
                  <Typography variant="h1" style={{color: darkMode ? darker_green : blue}}>20%</Typography>
                  <Typography variant="h6" style={{color: darkMode ? gray : 'black', margin: 5}}>{t("coupon.get20text")}</Typography>
                  <Typography variant="h6" style={{color: darkMode ? blue : green, margin: 5}}>{t("coupon.cost")}: 200₽</Typography>
                  
                  <Button onClick={() => openDialog(20)}
                  variant="contained" style={{backgroundColor: darkMode ? darker_green : blue, color: white, margin: 10}}>{t("coupon.button20")}</Button>
              </Grid>

            <Grid item lg={2}/>
          </Grid>

          <Grid container item xs={12}>
            <Grid lg={2}/>

                <Grid item xs={6} lg={4} style={{display: 'flex',flexDirection: 'column', alignItems: 'center', textAlign: 'center',
            border: "2px solid #eee", backgroundColor: darkMode ? dark_cont : white, margin: 15}}>
                  <Typography variant="h1" style={{color: darkMode ? darker_green : blue}}>50%</Typography>
                  <Typography variant="h6" style={{color: darkMode ? gray : 'black', margin: 5}}>{t("coupon.get50text")}</Typography>
                  <Typography variant="h6" style={{color: darkMode ? blue : green, margin: 5}}>
                    {t("coupon.cost")}: <span style={{textDecoration: 'line-through', color: red}}>500₽</span> 350₽</Typography>
                  
                  <Button onClick={() => openDialog(50)}
                   variant="contained" style={{backgroundColor: darkMode ? darker_green : blue, color: white, margin: 10}}>{t("coupon.button50")}</Button>
              </Grid>

            <Grid item xs={6} lg={4} style={{display: 'flex',flexDirection: 'column', alignItems: 'center', textAlign: 'center',
            border: "2px solid #eee", backgroundColor: darkMode ? dark_cont : white, margin: 15}}>
                  <Typography variant="h1" style={{color: darkMode ? darker_green : blue}}>75%</Typography>
                  <Typography variant="h6" style={{color: darkMode ? gray : 'black', margin: 5}}>{t("coupon.get75text")}</Typography>
                  <Typography variant="h6" style={{color: darkMode ? blue : green, margin: 5}}>
                    {t("coupon.cost")}: <span style={{textDecoration: 'line-through', color: red}}>750₽</span> 500₽</Typography>
                  
                  <Button onClick={() => openDialog(75)}
                   variant="contained" style={{backgroundColor: darkMode ? darker_green : blue, color: white, margin: 10}}>{t("coupon.button75")}</Button>
              </Grid>
            <Grid lg={2}/>
          </Grid>
      </Grid>


      <Grid item lg={2} xs={1}/>
      <PopUpDialog open={dialog.open} 
      closeDialog={() => changeDialog({...dialog,open: false})} 
      title={t("coupon.popuptitle", {amount: dialog.amount})} message={t("coupon.popupdesc", {amount: dialog.amount})}
      darkMode={darkMode} onConfirm={async () => await onCofirm()}/>

      <SnackBarSuccess snackBarOpen={snackBar.success} changeSnackBarOpen={() => changeSnackBar({...snackBar, success: false})} 
      message={t("coupon.success", {amount: dialog.amount})}/>
      <SnackBarFailed snackBarOpen={snackBar.error} changeSnackBarOpen={() => changeSnackBar({...snackBar, error: false})} 
      message={t("coupon.failed")}/>
    </Grid>
  )
}

export default coupons
