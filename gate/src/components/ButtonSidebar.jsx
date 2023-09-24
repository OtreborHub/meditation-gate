import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import * as React from 'react';
import { useState } from 'react';
import CheckEnvironment from './CheckEnvironment';
import CheckTimer from './CheckTimer';


export default function ButtonSidebar({ direction, textButton, timer, environment }) {

    const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

    const RIGHT = "right";
    const LEFT = "left";

    const toggleLeftSidebar = () => {
        setIsLeftSidebarOpen(!isLeftSidebarOpen);
    };

    const toggleRightSidebar = () => {
        setIsRightSidebarOpen(!isRightSidebarOpen);
    };


    return (
        <React.Fragment key={direction === LEFT ? LEFT : RIGHT}>
            <Button
                variant="contained"
                color='warning'
                sx={{ width: '50%', fontSize: "1.1rem" }}
                onClick={direction === LEFT ? toggleLeftSidebar : toggleRightSidebar}>
                {textButton}
            </Button>
            <Drawer
                // sx={{ width: "60%" }}
                anchor={direction === LEFT ? LEFT : RIGHT}
                open={direction === LEFT ? isLeftSidebarOpen : isRightSidebarOpen}
                onClose={direction === LEFT ? toggleLeftSidebar : toggleRightSidebar}
            >
                { 
                    direction === LEFT ? 
                    <CheckTimer timer={timer} /> : 
                    <CheckEnvironment environment={environment} />
                }
            </Drawer>
        </React.Fragment>
        
    )
}