import React from 'react'
import Image from 'next/image';
import { Popover} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';
import { changeLanguage } from '../../redux/actions/langActions';
import { blue, dark_cont, white } from '../../constants/CustomColors';


const LanguagePopUp = ({open, anchorEl, handleClose, darkMode} : 
  {open: boolean,anchorEl: any, handleClose: () => void, darkMode: boolean}) => {

  const dispatch = useDispatch();

  return (
    <Popover
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div style={{padding: '15px', backgroundColor: darkMode ? dark_cont : white, color: darkMode ? white : 'black'}}>
        <div onClick={() => {
          dispatch(changeLanguage("en"));
          if (typeof window !== 'undefined') localStorage.setItem("lang", "en");
        }} className="curs-hvr">
            <Image src="/lang/en.png" alt="english" width="20" height="15"/>
            <span className="active"> English</span>
        </div>
        <div onClick={() => {
          dispatch(changeLanguage("sr"))
          if (typeof window !== 'undefined') localStorage.setItem("lang", "sr");
          }} className="curs-hvr">
            <Image src="/lang/sr.png" alt="Српски" width="20" height="15" />
            <span> Српски</span>
        </div>
        </div>
      </Popover>
  )
}

export default LanguagePopUp;
