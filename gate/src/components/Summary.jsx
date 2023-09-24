import { Typography } from "@mui/material";

export default function Summary({formattedTime, environment}) {

    // const summaryContainerStyle = {
    //     marginTop: "2rem",
    //     marginBottom: "3rem",
    //     display:"flex",
    //     justifyContent:"center",
    //     textAlign: "center",
    //     fontSize:"1.5rem"
    // }
    
    return (
        <>
        <Typography
        variant="h3" sx={{color:"warning.main"}}>
            {formattedTime}
        </Typography>
        {/* <div style={summaryContainerStyle}>
            Timer: {formattedTime}<br/> */}
            {/* Mood: {environment} */}
        {/* </div> */}
        {/* <div style={summaryContainerStyle}></div> */}
        </>
    );
}