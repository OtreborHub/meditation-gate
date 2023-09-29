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
                color='primary'
                sx={{ width: '25%', fontSize: "1.1rem" }}
                onClick={toggleBottombar}>
                {textButton}
            </Button>
            <Drawer
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