import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Link } from "react-router-dom";
import '../styles/nameForm.css';

function NameForm(props) {
    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        const name = event.target.value;
        setName(name);
    }

    return <div className='formContainer'>
        <TextField
            className=''
            label={props.text.label} 
            variant="standard" 
            color='success' 
            sx={{ marginRight: '2rem', width: '40%'}} 
            onChange={handleNameChange} />

        <Link to={props.to} state={{name: name}} style={{pointerEvents: name !== '' ? '' : 'none'}}>
            <Button 
                variant="contained" 
                disabled={name !== '' ? false : true}
                color='success'>
                {props.text.content}
            </Button>
        </Link>
        
    </div>
}



export default NameForm;