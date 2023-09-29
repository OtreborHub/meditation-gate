import Button from '@mui/material/Button';
import { onValue, ref } from "firebase/database";
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import beachSunset from '../assets/videos/beachSunset.mp4';
import mountainBonfire from '../assets/videos/mountainBonfire.mp4';
import rainForest from '../assets/videos/rainForest.mp4';
import starryNight from '../assets/videos/starryNight.mp4';
import { db } from '../utils/firebase';
import { formatTime, parseTime } from '../utils/formatter';
import { decrement } from "../utils/slices/SliceTimer";
import SessionButtons from '../components/dashboard/SessionButtons';
import Session from '../components/dashboard/Session';
import SessionIntro from '../components/dashboard/SessionIntro';

export default function SessionDashboard(props) {

  const [randomText, setRandomText] = useState("")
  const [sessionActive, setSessionActive] = useState(false);
  const millisTimer = useSelector((state) => state.timer);
  const environment = useSelector((state) => state.environment);
  const videoRef = useRef(null);
  const dispatch = useDispatch();
  const [playPause, setPlayPause] = useState(false);

  const location = useLocation();
  const name = location.state.name
  const formattedTime = formatTime(millisTimer);

  useEffect(() => {
    const random = Math.floor(Math.random() * 6);
    const query = ref(db, "dashboard-intro");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setRandomText(data[random].content)
    });
  }, []);

  useEffect(() => {
    var decrementInterval = null;
    if(playPause === true){
      decrementInterval = setInterval(() => {
        dispatch(decrement(parseTime(0, 1)));
      }, 1000);
      return () => {
        clearInterval(decrementInterval);
      }
    }else{
      if(decrementInterval != null){
        clearInterval(decrementInterval);
      }
    }
  }, [dispatch, playPause]);

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

// ---------------------------- FUNCTIONS -----------------------------
  function validate(formattedTime) {
    const splitted = formattedTime.split(":");
    if(splitted && splitted.length > 1){
        const millis = parseTime(splitted[0], splitted[1]);
        return millis > 0 ? true : false;
    }
  }

// ---------------------------- LISTENERS -----------------------------
  const startSession = () => {
    if (!sessionActive && validate(formattedTime)) {
      setSessionActive(!sessionActive);
      setPlayPause(true); 
    } 
  }

  const toggleSession = () => {
    if(!playPause){
      setPlayPause(true);
    } else {
      setPlayPause(false);
    }
  }

// ---------------------------- STYLES -----------------------------
  const containerStyle = {
    position: 'relative',
    height: '100vh',
  };

  const hidden = {
    display: "none"
  }

  const center = {
    textAlign:"center"
  }

  const videoStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    zIndex: -1,
    objectFit: 'cover',
  };

  const dashboard = {
    width: "100%",
    backgroundColor: "#96959582",
    paddingTop: "2rem",
    paddingBottom: "1%",
  }

// ---------------------------- RENDER -----------------------------
  return (
    <>
      <div style={containerStyle}>
        <Link to='/' >
          <Button
            style={{ margin: '1rem', color:"white" }}
            variant="text">
            Torna alla Home
          </Button>
        </Link> 
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
          <SessionIntro name={name} randomText={randomText} />
          <SessionButtons formattedTime={formattedTime} environment={environment} startSession={() => startSession()}/>
        </div>

        {sessionActive &&              
        <div style={center}>
          <Session formattedTime={formattedTime} onClick={() => toggleSession()} playPause={playPause}/>
        </div> 
        }
      </div>
    </>
  );
}
