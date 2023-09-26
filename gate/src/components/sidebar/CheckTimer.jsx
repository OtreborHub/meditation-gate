import { Box, Button, Container, Slider, Typography } from "@mui/material";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from 'react-responsive';
import { db } from '../../utils/firebase';
import { formatTime, parseTime } from '../../utils/formatter';
import { addValue, setToValue } from "../../utils/slices/SliceTimer";

export default function CheckTimer() {
    const isMobile = useMediaQuery({ query: '(max-width: 900px)' });
    const isDesktop = useMediaQuery({ query: '(min-width: 900px)' });

    const [sliderData, setSliderData] = useState([]);
    const timer = useSelector((state) => state.timer);

    const dispatch = useDispatch();

    useEffect(() => {
        const query = ref(db, "slider");
        return onValue(query, (snapshot) => {
          const data = snapshot.val();
          console.log("retrieving data:" + data);
          setSliderData(data);
        });
      },[]);

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

    const sliderDefaultValue = () => {
        return Number(timer) * 18 / 300000;
    }

    const initialSliderValue = sliderDefaultValue();
    
    const timerSliderBox = {
        display:"flex",
        flexDirection: "column",
        alignItems: "center",
        gap:"1rem"
    }

    const flexCol = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "1rem"
    }

    const flexRow = {
        display:"flex",
        flexDirection: "row",
        justifyContent: "center",
        gap:"1rem"
    }

    return ( 
        <>
        <Box style={timerSliderBox}>
            <Typography variant={(isMobile && "h5") || (isDesktop && "h4")} margin={(isMobile && "3rem") || (isDesktop && "5rem")} textAlign={"center"}> Per quanto vuoi <br/> rimanere concentrato? </Typography>
            <Typography fontSize={(isMobile && "2rem") || (isDesktop && "3rem")}> {formatTime(timer)} </Typography>

            <Box sx={{ width: "70%", margin:"3rem" }}>
                <Slider
                    color="info"
                    aria-label="Custom marks"
                    value={initialSliderValue}
                    step={null}
                    valueLabelDisplay="auto"
                    valueLabelFormat={value => labelTooltip(value, false)}
                    marks={sliderData}
                    onChange={handleSliderChange}
                />
            </Box>
        </Box>
        <Container style={flexRow}>
            <Box sx={{ width: "80%", marginBottom:"3rem"}}>
                <div style={flexCol} >
                    <div style={flexRow} >
                        <Button 
                            sx={{width:"100%"}}
                            variant="contained" 
                            color='info'
                            onClick={() => addMins(1)}>
                            +1 min
                        </Button>
                        <Button 
                            sx={{width:"100%"}}
                            variant="contained" 
                            color='info'
                            onClick={() => addMins(2)}>
                            +2 min
                        </Button>
                        <Button 
                            sx={{width:"100%"}}
                            variant="contained" 
                            color='info'
                            onClick={() => addMins(5)}>
                            +5 min
                        </Button>
                    </div>
                
                    <div style={flexRow} >
                        <Button 
                            sx={{width:"100%"}}
                            variant="outlined" 
                            color='info'
                            onClick={() => addSecs(10)}>
                            +10 sec
                        </Button>
                        <Button 
                            sx={{width:"100%"}}
                            variant="outlined" 
                            color='info'
                            onClick={() => addSecs(30)}>
                            +30 sec
                        </Button>
                    </div>
                </div>
            </Box>
        </Container>
        </>
    );
}