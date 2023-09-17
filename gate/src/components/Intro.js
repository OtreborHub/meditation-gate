import { Typography } from "@mui/material";
import '../styles/intro.css'

const Intro = ({title, text}) => {
    return (
        <div> 
            <h1> {title} </h1>
            <Typography
                paragraph={true}
                fontSize='1.5rem'
                > {text} </Typography>
        </div>
    )
}

export default Intro;