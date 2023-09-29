import { Typography } from "@mui/material";
import { useMediaQuery } from 'react-responsive';

export default function Intro() {

    const isMobile = useMediaQuery({ query: '(max-width: 900px)' });
    const isDesktop = useMediaQuery({ query: '(min-width: 900px)' });

    return (
        <div> 
            <Typography 
                variant="h1" 
                width="100%"
                fontWeight="bold"
                color='#201C1D'
                fontSize={  
                    (isMobile && "2.5rem") || 
                    (isDesktop && "4.5rem")}
                > Meditation Gate
            </Typography>
            <Typography
                width='65%'
                paragraph={true}
                color='#655951'
                fontSize={  
                        (isMobile && "1.2rem") || 
                        (isDesktop && "1.7rem")}
                > La meditazione è un viaggio tra i pensieri e le sensazioni. 
                  Noi vogliamo fornirti uno strumento rapido per le tue sessioni. <br/>
                  Scrivi come ti chiami e partiamo!
            </Typography>
        </div>
    )
}
