import Box from '@mui/material/Box';
import React from 'react';
import '../styles/home.css'
import Intro from '../components/home/HomeIntro';
import NameForm from '../components/home/NameForm';

export default function Home() {

  return (  
    <div className='home-container'>
          <Box margin='3%'>
            <Intro />
            <NameForm />
          </Box>
    </div>
    );
}

