import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from "react-router-dom";

export default function NameForm() {
    const isMobile = useMediaQuery({ query: '(max-width: 900px)' });
    const isDesktop = useMediaQuery({ query: '(min-width: 900px)' });
    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        const name = event.target.value;
        setName(name);
    }

    const formStyle = {
        display:"flex",
        justifyContent:"flex-start",
    }

    return (
    <div style={formStyle}>
        <TextField
            label="Nome" 
            variant="standard" 
            color="info" 
            sx={{ marginRight: "2rem", width: "40%"}}
            onChange={handleNameChange}
            fontSize={  
                (isMobile && "0.8rem") || 
                (isDesktop && "1.7rem")} />

        <Link to={"/dashboard"} state={{name: name}} style={{pointerEvents: name === '' && 'none'}}>
            <Button 
                sx={{margin:"0.5rem"}}
                variant="contained" 
                disabled={name !== '' ? false : true}
                color="info"
                fontSize={  
                    (isMobile && "0.8rem") || 
                    (isDesktop && "1.7rem")}>
                QUICK START
            </Button>
        </Link>
    </div>
    );
}


