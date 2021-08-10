import { Grid, Typography, Badge} from '@material-ui/core';
import React from 'react';
import Link from 'next/link';
import AddIcon from '@material-ui/icons/Add';

const test = () => {
    
    const [form, changeForm] = React.useState({
        image: "/user.png",
        userName: "",
        description: "",
    });

    const uploadFile = (e: any) => {
        if (e.target.files[0] === null || e.target.files[0] === undefined) return;

        
        const file = e.target.files[0];
        const blob = URL.createObjectURL(file);
        changeForm({...form,image: blob});
    }

    const inputRef = React.useRef(null); 
    
    return (
        <Grid container>
            <Badge anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                badgeContent="+"
                color="primary"
                >
                <img src={form.image}  width="225px" height="225px" style={{borderRadius: 150}}
                onClick={() => (inputRef as any).current.click()}/>
            </Badge>
            <input type="file" accept="image/*" onChange={(e: any) => uploadFile(e)} ref={inputRef} style={{display: 'none'}}/>
        </Grid>

    )
};

export default test;