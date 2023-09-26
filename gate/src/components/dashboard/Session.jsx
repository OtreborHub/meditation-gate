import { Button, Typography } from "@mui/material";

export default function Session({formattedTime, onClick, playPause}) {

  const pauseButtonStyle = {
    width: "15%",
    fontSize: "1.2rem",
    color: "#4598ea85"
  }

    return (
        <>
        <Typography variant="h3" sx={{color:"white"}} paddingTop="5rem">
            {formattedTime}
        </Typography>
        <Button
              style={pauseButtonStyle}
              variant="text"
              color='primary'
              onClick={onClick}>
              {(playPause && "Pausa") ||
               (!playPause && "Riprendi")}
        </Button> 
        </>
    );
}