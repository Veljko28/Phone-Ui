import React from 'react'
import Image from 'next/image';
import { Popover} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';
import { changeLanguage } from '../../redux/actions/langActions';


const LanguagePopUp = ({open, anchorEl, handleClose} : 
  {open: boolean,anchorEl: any, handleClose: () => void}) => {

  const lang = useSelector((state: State) => state.language.lang);
  const dispatch = useDispatch();

  const selected = {color: '#0cafe5'};

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
        <div style={{padding: '15px'}}>
        <div onClick={() => dispatch(changeLanguage("en"))} className="curs-hvr">
            <Image src="/lang/en.png" alt="english" width="20" height="15"/>
            <span className="active"> English</span>
        </div>
        <div onClick={() => dispatch(changeLanguage("sr"))} className="curs-hvr">
            <Image src="/lang/sr.png" alt="Српски" width="20" height="15" />
            <span> Српски</span>
        </div>
        </div>
      </Popover>
  )
}

export default LanguagePopUp;
