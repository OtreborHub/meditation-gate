import React from 'react';
import Intro from './Intro';
import NameForm from './NameForm';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import '../styles/home.css';

export default function Home() {

  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const [button, setButton] = useState({});

  useEffect(() => {
    const getParagraphs = async () => {
      const paragraphs = await fetchParagraphs();
      setTitle(paragraphs.at(0).content);
      setText(paragraphs.at(1).content);
      setButton({content: paragraphs.at(2).content, label: paragraphs.at(2).inputLabel});
    }
    
    getParagraphs();
  }, [])

  const fetchParagraphs = async () => {
    const res = await fetch('http://localhost:5000/home');
    const data = await res.json();
    console.log(data);
    return data;
  }

  return <div className="container-fluid">
          <Container>
            <Intro title={title} text={text}/>
            <NameForm text={button} to='/dashboard' />
          </Container>
      </div>
}

