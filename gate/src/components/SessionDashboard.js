// SessionDashboard.js
import { Typography } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { formatTime, parseTime } from '../utils/formatter';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import ButtonSidebar from './ButtonSidebar';
import { styled } from '@mui/system';
import Summary from './Summary';
import { decrement } from "../utils/SliceTimer";

export default function SessionDashboard(props) {
  const [text, setText] = useState();
  const [sessionActive, setSessionActive] = useState(false);
  const [textButtonLeft, setTextButtonLeft] = useState();
  const [textButtonRight, setTextButtonRight] = useState();
  const millisTimer = useSelector((state) => state.timer);
  const environment = useSelector((state) => state.environment);
  const dispatch = useDispatch();

  const location = useLocation();
  const name = location.state.name
  const formattedTime = formatTime(millisTimer);

  useEffect(() => {
    const getParagraphs = async () => {
      const paragraphs = await fetchParagraphs();
      setText(paragraphs.at(0).content);
      setTextButtonLeft(paragraphs.at(1).content);
      setTextButtonRight(paragraphs.at(2).content);
    }

    getParagraphs();
  }, [])

  useEffect(() => {
    var decrementInterval = null;
    if(sessionActive == true){
      decrementInterval = setInterval(() => {
        dispatch(decrement(parseTime(0, 1)));
      }, 1000);
      return () => {
        clearInterval(decrementInterval); // Pulisci l'intervallo quando il componente viene smontato
      }
    }else{
      if(decrementInterval != null){
        clearInterval(decrementInterval);
      }
    }
  }, [dispatch, sessionActive]);


  const fetchParagraphs = async () => {
    const res = await fetch('http://localhost:5000/dashboard');
    const data = await res.json();
    console.log(data);
    return data;
  }

  const startSession = (event) => {
    setSessionActive(!sessionActive);
  }

  const dashboardContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "2rem",
  }

  const hidden = {
    display: "none"
  }

  const summaryContainerStyle = {
    display: "flex",
    justifyContent: "center",
    gap:"5rem",
    margin: "2rem",
    marginTop: "2rem"
  }
  const CustomButton = styled(Button)`
  &:hover {
    background-color: #405935;
    color: white;
  }`;

  return (
    <>
      <Link to='/' >
        <CustomButton
          style={{ margin: '1rem' }}
          variant="outlined"
          color='success'>
          Torna alla Home
        </CustomButton>
      </Link>

      <div style={sessionActive==false? dashboardContainerStyle:hidden} className='dashboardContainer'>
        <h1>Ciao {name}!</h1>
        <Typography
          fontSize={"1.2rem"}
          paragraph={true}>
          {text}
        </Typography>
      </div>

      <div style={sessionActive==false? summaryContainerStyle: hidden} className='summaryContainer'>
        <ButtonSidebar direction={"left"} textButton={textButtonLeft} timer={formattedTime} />
        <ButtonSidebar direction={"right"} textButton={textButtonRight} environment={environment}/>
      </div>

      <Summary formattedTime={formattedTime} environment={environment} />
      
      <div style={summaryContainerStyle}>
      <Button
          style={{ margin: '1rem', width: 300, fontSize: "1.5rem"}}
          variant="contained"
          color='success'
          onClick={startSession}>
          {sessionActive === false ? 'Avvia sessione':'Pausa'}
        </Button>
      </div>
    </>
  );


}
