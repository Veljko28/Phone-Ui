import React from 'react';
import {CircularProgress} from '@material-ui/core';


const Loading = ({size, fontSize} : {size: number, fontSize?: number}) => {

    return (
        <div>
            <CircularProgress style={{color: '#0cafe5'}} size={size}/>
            <div className="loading" style={{color: '#0cafe5', marginTop: 10, fontSize}}>Loading</div>
        </div>
    )
}

export default Loading;