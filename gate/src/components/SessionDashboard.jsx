import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Link, useLocation } from 'react-router-dom';
import mountainBonfire from '../assets/videos/mountainBonfire.mp4';
import rainForest from '../assets/videos/rainForest.mp4';
import beachSunset from '../assets/videos/beachSunset.mp4';
import starryNight from '../assets/videos/starryNight.mp4';
import { decrement } from "../utils/Slices/SliceTimer";
import { formatTime, parseTime } from '../utils/formatter';
import ButtonBottombar from './ButtonBottombar';
import ButtonSidebar from './ButtonSidebar';
import Summary from './Summary';
import '../styles/sessionDashboard.css'

export default function SessionDashboard(props) {
  const isMobile = useMediaQuery({ query: '(max-width: 900px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 900px)' });

  const [text, setText] = useState("");
  const [introText, setIntroText] = useState("")
  const [sessionActive, setSessionActive] = useState(false);
  const [textButtonLeft, setTextButtonLeft] = useState();
  const [textButtonRight, setTextButtonRight] = useState();
  const millisTimer = useSelector((state) => state.timer);
  const environment = useSelector((state) => state.environment);
  const videoRef = useRef(null);
  const dispatch = useDispatch();
  const [playPause, setPlayPause] = useState(false);

  const location = useLocation();
  const name = location.state.name
  const formattedTime = formatTime(millisTimer);

  useEffect(() => {
    const getDBText = async (random) => {
      
      const intros = await fetchIntroDashboard();
      const randomIntro = intros.filter(intro => (intro.id === random))[0];
      setIntroText(randomIntro.content);

      const paragraphs = await fetchDashboard();
      setText(paragraphs.at(0).content);
      setTextButtonLeft(paragraphs.at(1).content);
      setTextButtonRight(paragraphs.at(2).content);
    }
    const random = Math.floor(Math.random() * 6);
    getDBText(random);
  }, [])

  useEffect(() => {
    var decrementInterval = null;
    if(sessionActive === true){
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

  useEffect(() => {
    if (millisTimer === 0) {
      setSessionActive(false); 
    }
  }, [millisTimer]);

  useEffect(() => {
    if (videoRef.current) {
      if (playPause) {
        videoRef.current.play(); 
      } else {
        videoRef.current.pause(); 
      }
    }
  }, [playPause]);


  const fetchDashboard = async () => {
    const res = await fetch('http://localhost:5000/dashboard');
    const data = await res.json();
    console.log(data);
    return data;
  }

  const fetchIntroDashboard = async () => {
    const res = await fetch('http://localhost:5000/dashboard-intro');
    const data = await res.json();
    console.log(data);
    return data;
  }

  const startSession = () => {
    if (!sessionActive && validate(formattedTime)) {
      setSessionActive(!sessionActive);
      setPlayPause(true); 
    } else if (sessionActive) {
      setSessionActive(!sessionActive);
      setPlayPause(false); 
    }
  }

  const textContainer = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "2rem",
  }

  const containerStyle = {
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
  };

  const startButtonStyle = {
    margin: "5rem",
    marginBottom: "0.5rem",
    width: "35%",
    fontSize: "1.5rem"
  }

  const hidden = {
    display: "none"
  }

  const gridStyle = {
    textAlign:"center"
  }

  const videoStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    objectFit: 'cover',
  };

  const dashboard = {
    width: "100%",
    backgroundColor: "#000000cc",
    paddingTop: "2rem",
    paddingBottom: "2rem",
  }

  function validate(formattedTime) {
    const splitted = formattedTime.split(":");
    if(splitted && splitted.length > 1){
        const millis = parseTime(splitted[0], splitted[1]);
        return millis > 0 ? true : false;
    }
  }

  return (
    <>
      <div style={containerStyle}>
        {!sessionActive && <Link to='/' >
          <Button
            style={{ margin: '1rem' }}
            variant="text"
            color='warning'>
            Torna alla Home
          </Button>
        </Link> 
        }
        <video
          ref={videoRef}
          autoPlay={false}
          loop
          style={videoStyle}
          src={
            (environment === 0 && rainForest) || 
            (environment === 1 && mountainBonfire) ||
            (environment === 2 && beachSunset) ||
            (environment === 3 && starryNight)  }
        >
        </video>
        
        <div style={sessionActive ? hidden : dashboard}>
            <div style={textContainer}>
              <Typography variant='h2' textAlign={"center"} sx={{color:"warning.main"}}>
                Ciao {name}!
              </Typography>

              <Typography
                marginTop="2rem"
                fontSize={"1.2rem"}
                paragraph={true}
                width={"50%"}
                sx={{color:"warning.main"}}>
                {introText}
              </Typography>
              <Typography
                marginBottom="3rem"
                fontSize={"1.2rem"}
                paragraph={true}
                width={"50%"}
                sx={{color:"warning.main"}}>
                {text}
              </Typography>
            </div>
          
          
          { isDesktop && 
            <Grid container style={gridStyle} spacing={2}>
              <Grid item xs={12}>
                <ButtonSidebar direction={"left"} textButton={textButtonLeft} timer={formattedTime} />
              </Grid>
              <Grid item xs={12}>
                <ButtonSidebar direction={"right"} textButton={textButtonRight} environment={environment}/>
              </Grid>
            </Grid>
          }
          { isMobile &&
            <Grid container style={gridStyle} spacing={2}>
              <Grid item xs={12}>
                <ButtonBottombar textButton={textButtonLeft} timer={formattedTime} environment={null}/>
              </Grid>
              <Grid item xs={12}>
                <ButtonBottombar textButton={textButtonRight} timer={null} environment={environment}/>
              </Grid>
            </Grid>
          }
      
        </div>
        <div style={gridStyle}>
        <Button
            style={startButtonStyle}
            variant="text"
            color='warning'
            onClick={() => startSession()}>
            {sessionActive === false ? 'Avvia sessione':'Pausa'}
        </Button>
        { sessionActive && <Summary formattedTime={formattedTime} environment={environment} />}
        </div>
      </div>
    </>
  );


}
