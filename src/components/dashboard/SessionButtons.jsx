import { Button, Grid } from "@mui/material";
import { useMediaQuery } from 'react-responsive';
import ButtonBottombar from "./sidebar/ButtonBottombar";
import ButtonSidebar from "./sidebar/ButtonSidebar";

export default function SessionButtons({formattedTime, environment, startSession}){

    const isMobile = useMediaQuery({ query: '(max-width: 900px)' });
    const isDesktop = useMediaQuery({ query: '(min-width: 900px)' });

    const startButtonStyle = {
        marginTop: "5%",
        marginBottom: "0.5rem",
        width: "25%",
        fontSize: "1.5rem",
    }

    const center = {
        textAlign:"center"
    }
      
    const TIMER = "TIMER";
    const AMBIENTE = "AMBIENTE";

    return (
    <>
        <Grid container style={center} spacing={2}>
            <Grid item xs={12}>
            { (isDesktop &&
                <ButtonSidebar direction={"left"} textButton={TIMER} timer={formattedTime} />) || 
                (isMobile &&  
                <ButtonBottombar textButton={TIMER} timer={formattedTime} environment={null}/>)
            }
            
            </Grid>
            <Grid item xs={12}>
            { (isDesktop &&
                <ButtonSidebar direction={"right"} textButton={AMBIENTE} environment={environment}/>) ||
                (isMobile &&  
                <ButtonBottombar textButton={AMBIENTE} timer={null} environment={environment}/>)
            }
            </Grid>
        </Grid>

        <div style={center}>
        <Button
        style={startButtonStyle}
        variant="text"
        sx={{color:"#201C1D"}}
        onClick={startSession}>
        Avvia sessione
        </Button>
        </div>
    </>
    );
}