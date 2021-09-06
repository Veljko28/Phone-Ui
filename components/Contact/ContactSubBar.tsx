import { Grid, Typography} from '@material-ui/core';
import Image from 'next/image';
import ColoredLine  from '../../constants/ColoredLine';
import { gray } from '../../constants/CustomColors';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';
import { useTranslation } from 'react-i18next';


const ContactSubBar = () => {
    
   const darkMode = useSelector((state: State) => state.userInfo.darkMode);
   const { t } = useTranslation();

    return (    
        <Grid container className={darkMode ? "sub-bar-container-dark" : "sub-bar-container"}>

            <Grid item xs={12} md={12}>
                <Typography variant="h6">{t("contactSub.title")}</Typography>
                <ColoredLine color={gray}/>
            </Grid>
            <Grid item xs={12} md={6}>
                <div style={{float: 'left', marginTop: '10px'}}>
                <Image src="/contact/contact1.png" width="50" height="50" />
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Typography variant="subtitle1" style={{margin: '10px'}}>{t("contactSub.subtitle1")}</Typography>
                    <Typography variant="subtitle2" style={{margin: '10px'}}>{t("contactSub.desc1")}</Typography>
                </div>
            </Grid>
            <Grid item xs={12} md={6}>
               <div style={{float: 'left', marginTop: '10px'}}>
                 <Image src="/contact/contact2.png" width="50" height="50"/>
              </div>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Typography variant="subtitle1" style={{margin: '10px'}}>{t("contactSub.subtitle2")}</Typography>
                    <Typography variant="subtitle2" style={{margin: '10px'}}>{t("contactSub.desc2")}</Typography>
                </div>
            </Grid>

        </Grid>
    );
}

export default ContactSubBar;