import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive';

export default function Intro({title, text, color}) {

    const isMobile = useMediaQuery({ query: '(max-width: 900px)' });
    const isDesktop = useMediaQuery({ query: '(min-width: 900px)' });

    const [firstText, setFirstText] = useState("");
    const [subText, setSubText] = useState("");
    

    useEffect(() => {
        if(text !== undefined){
            const splitted = text.split('\n');
            setFirstText(splitted[0])
            if(splitted.length > 0){
                setSubText(splitted[1]);
            }
        }
    },[text])

    return (
        <div> 
            <Typography 
                variant="h1" 
                width="100%"
                fontWeight="bold"
                color='#201C1D'
                fontSize={  
                    (isMobile && "2.5rem") || 
                    (isDesktop && "5rem")}
                > {title}
            </Typography>
            <Typography
                width='65%'
                paragraph={true}
                color='#655951'
                fontSize={  
                        (isMobile && "1.2rem") || 
                        (isDesktop && "1.7rem")}
                > {firstText} <br/> {subText}
            </Typography>
        </div>
    )
}
