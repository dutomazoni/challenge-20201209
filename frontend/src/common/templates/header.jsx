import React from 'react'
import ApartmentIcon from '@material-ui/icons/Apartment';
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
export default props => {
    return (
        <div>
            <AppBar position="static"  style={{marginBottom: '1vh', background:'#21086d'}}>
                <Toolbar>
                    <IconButton edge="start" aria-label="menu" href={'/'} style={{color:'#7ffff9'}}>
                        <ApartmentIcon style={{fontSize: 40}}/>
                    </IconButton>
                    <Typography variant="h5" href={'/'} style={{marginRight: "2vw", color: '#7ffff9'}}>
                        Pharma Inc.
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

