import React from 'react';
import {CircularProgress} from '@material-ui/core';
import { blue } from '../constants/CustomColors';


const Loading = ({size, fontSize} : {size: number, fontSize?: number}) => {

    return (
        <div>
            <CircularProgress style={{color: blue}} size={size}/>
            <div className="loading" style={{color: blue, marginTop: 10, fontSize}}>Loading</div>
        </div>
    )
}

export default Loading;