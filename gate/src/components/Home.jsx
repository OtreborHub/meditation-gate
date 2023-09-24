import React from 'react';
import Intro from './Intro';
import NameForm from './NameForm';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import '../styles/home.css';

export default function Home() {

  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const [button, setButton] = useState({});

  useEffect(() => {
    const getDBText = async () => {
      const paragraphs = await fetchHome();
      setTitle(paragraphs.at(0).content);
      setText(paragraphs.at(1).content);
      setButton({content: paragraphs.at(2).content, label: paragraphs.at(2).inputLabel});
    }
    
    getDBText();
  }, [])

  const fetchHome = async () => {
    const res = await fetch('http://localhost:5000/home');
    const data = await res.json();
    console.log(data);
    return data;
  }

  return (  
    <div className="container-fluid">
          <Box margin='3%'>
            <Intro title={title} text={text} />
            <NameForm text={button} to='/dashboard' />
          </Box>
    </div>
    );
}

