import { Box, Button, Container, Slider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { formatTime } from '../utils/formatter';
import { useDispatch, useSelector } from "react-redux";
import { setToValue, addValue } from "../utils/SliceTimer";
import { parseTime } from '../utils/formatter';

export default function CheckTimer() {
    const [sliderData, setSliderData] = useState([]);
    const timer = useSelector((state) => state.timer);

    const dispatch = useDispatch();

    const fetchSliderData = async () => {
        const res = await fetch('http://localhost:5000/slider');
        const data = await res.json();
        console.log(data);
        return data;
    }

    useEffect(() => {
        const getSliderData = async () => {
            const sliderData = await fetchSliderData();
            setSliderData(sliderData);
        }
          
        getSliderData();
    }, [])


    function labelTooltip(value, labelTooltip) {
        if(sliderData.length > 0){
            switch(value){
                case sliderData[0].value: 
                    return labelTooltip === true ? sliderData[0].label : sliderData[0].tooltip
                case sliderData[1].value:
                    return labelTooltip === true ? sliderData[1].label : sliderData[1].tooltip
                case sliderData[2].value:
                    return labelTooltip === true ? sliderData[2].label : sliderData[2].tooltip
                case sliderData[3].value: 
                    return labelTooltip === true ? sliderData[3].label : sliderData[3].tooltip
                case sliderData[4].value: 
                    return labelTooltip === true ? sliderData[4].label : sliderData[4].tooltip    
                case sliderData[5].value:
                    return labelTooltip === true ? sliderData[5].label : sliderData[5].tooltip 
                default:
                    return "";   
            }
        } else {
            return "";
        }
    }

    const handleSliderChange = (event) => {
        var timer = labelTooltip(event.target.value, true);
        var splittedTimer = timer.split(":");
        var newMinutes = Number(splittedTimer[0]);
        var newSeconds = Number(splittedTimer[1]);
        var millis = parseTime(newMinutes, newSeconds);
        dispatch(setToValue(millis));
    }

    const addMins = (mins) => {
        const millis = parseTime(mins, 0);
        dispatch(addValue(millis));
        
    }

    const addSecs = (secs) => {
        const millis = parseTime(0, secs);
        dispatch(addValue(millis));
    }
   
    const timerStyle = {
        margin: "5rem",
        marginLeft: "10rem",
        marginRight: "10rem"
    }
    const flexCol = {
        display:"flex",
        flexDirection: "column",
        alignItems: "center",
        gap:"1rem"
    }
    const flexRow = {
        display:"flex",
        flexDirection: "row",
        justifyContent: "center",
        gap:"2rem"
    }

    return ( 
        <>
        <Container style={flexCol}>
            <Typography variant="h3" margin={"5rem"}> Per quanto vuoi concentrarti? </Typography>
            <Typography style={timerStyle} fontSize={52}> 
                {formatTime(timer)}
            </Typography>

            <Box sx={{ width: "80%", margin:"3rem" }}>
                <Slider
                    color="success"
                    aria-label="Custom marks"
                    defaultValue={20}
                    step={null}
                    valueLabelDisplay="auto"
                    valueLabelFormat={value => labelTooltip(value, false)}
                    marks={sliderData}
                    onChange={handleSliderChange}
                />
            </Box>
        </Container>
        <Container style={flexRow}>
            <div style={flexCol} >
                <div style={flexRow} >
                    <Button 
                        sx={{width:200}}
                        variant="contained" 
                        color='success'
                        onClick={() => addMins(1)}>
                        +1 min
                    </Button>
                    <Button 
                        sx={{width:200}}
                        variant="contained" 
                        color='success'
                        onClick={() => addMins(2)}>
                        +2 min
                    </Button>
                    <Button 
                        sx={{width:200}}
                        variant="contained" 
                        color='success'
                        onClick={() => addMins(5)}>
                        +5 min
                    </Button>
                </div>
            
                <div style={flexRow} >
                    <Button 
                        sx={{width:300}}
                        variant="contained" 
                        color='success'
                        onClick={() => addSecs(10)}>
                        +10 sec
                    </Button>
                    <Button 
                        sx={{width:300}}
                        variant="contained" 
                        color='success'
                        onClick={() => addSecs(30)}>
                        +30 sec
                    </Button>
                </div>
            </div>
        </Container>
        </>
    );
}