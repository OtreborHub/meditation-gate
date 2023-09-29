import React from "react";
import {Typography} from "@mui/material";

export default function SessionIntro({name, randomText}) {

    const textContainer = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        fontSize: "2rem",
      }

    return (
        <div style={textContainer}>
              <Typography variant='h3' sx={{color:"#201C1D"}} alignItems={"center"}>
                Ciao <Typography variant='span' sx={{color:"primary.main"}}>{name}</Typography>!
              </Typography>

              <Typography
                marginTop="2rem"
                fontSize={"1.2rem"}
                paragraph={true}
                textAlign={"center"}
                width={"75%"}
                sx={{color:"#201C1D"}}>
                {randomText}
              </Typography>
              <Typography
                marginTop="2rem"
                marginBottom="1rem"
                fontSize={"1.2rem"}
                textAlign={"center"}
                paragraph={true}
                width={"60%"}
                sx={{color:"#201C1D"}}>
                Imposta il timer e l'ambiente che preferisci
              </Typography>
            </div>
    );
}