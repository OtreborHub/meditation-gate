import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import * as React from 'react';
import { useState } from 'react';
import CheckEnvironment from './CheckEnvironment';
import CheckTimer from './CheckTimer';
import { styled } from '@mui/system';


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

    const CustomButton = styled(Button)`
    &:hover {
      background-color: green;
      color: white;
    }`;

    return (
        <React.Fragment key={direction == LEFT ? LEFT : RIGHT}>
            <CustomButton
                variant="outlined"
                color='success'
                sx={{ width: '25%', fontSize: "1.2rem" }}
                onClick={direction == LEFT ? toggleLeftSidebar : toggleRightSidebar}>
                {textButton}
            </CustomButton>
            <Drawer
                sx={{ width: "50%" }}
                anchor={direction == LEFT ? LEFT : RIGHT}
                open={direction == LEFT ? isLeftSidebarOpen : isRightSidebarOpen}
                onClose={direction == LEFT ? toggleLeftSidebar : toggleRightSidebar}
            >
                { 
                    direction == LEFT ? 
                    <CheckTimer timer={timer} /> : 
                    <CheckEnvironment environment={environment} />
                }
            </Drawer>
        </React.Fragment>
    )
}