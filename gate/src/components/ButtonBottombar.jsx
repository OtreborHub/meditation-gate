import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import * as React from 'react';
import { useState } from 'react';
import CheckEnvironment from './CheckEnvironment';
import CheckTimer from './CheckTimer';

export default function ButtonBottombar({ textButton, timer, environment }) {

    const [isBottombarOper, setIsBottombarOper] = useState(false);

    const BOTTOM = "bottom";

    const toggleBottombar = () => {
        setIsBottombarOper(!isBottombarOper);
    };



    return (
        <React.Fragment key={BOTTOM}>
            <Button
                variant="contained"
                color='warning'
                sx={{ width: '50%', fontSize: "1.1rem" }}
                onClick={toggleBottombar}>
                {textButton}
            </Button>
            <Drawer
                // sx={{ width: "60%" }}
                anchor={BOTTOM}
                open={isBottombarOper}
                onClose={toggleBottombar}
            >   
                { 
                    environment === null ? 
                    <CheckTimer timer={timer} /> : 
                    <CheckEnvironment environment={environment} />
                }
            </Drawer>
        </React.Fragment>
        
    )
}