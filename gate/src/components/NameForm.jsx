import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import '../styles/nameForm.css';

export default function NameForm(props) {
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
            className=''
            label={props.text.label} 
            variant="standard" 
            color='info' 
            sx={{ marginRight: '2rem', width: '40%'}}
            onChange={handleNameChange}
            fontSize={  
                (isMobile && "0.8rem") || 
                (isDesktop && "1.7rem")} />

        <Link to={props.to} state={{name: name}} style={{pointerEvents: name !== '' ? '' : 'none'}}>
            <Button 
                sx={{margin:"0.5rem"}}
                variant="contained" 
                disabled={name !== '' ? false : true}
                color="info"
                fontSize={  
                    (isMobile && "0.8rem") || 
                    (isDesktop && "1.7rem")}>
                {props.text.content}

            </Button>
        </Link>
    </div>
    );
}


