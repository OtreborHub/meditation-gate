import DoneIcon from '@mui/icons-material/Done';
import { ListItemIcon, ListItemText, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import '../styles/checkEnvironment.css';
import { setToValue } from "../utils/Slices/SliceVideo";

export default function CheckEnvironment() {
    const [selectedIndex, setSelectedIndex] = useState();
    const [tracks, setTracks] = useState([]);
    const selectedTrack = useSelector(state => (state.environment));
    const dispatch = useDispatch();

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        dispatch(setToValue(tracks[index].id));
    };

    useEffect(() => {
        const getDBText = async () => {
            const tracksData = await fetchTracks();
            const defaultTrack = tracksData.filter(track => (track.id === selectedTrack))[0];
            setTracks(tracksData);
            setSelectedIndex(defaultTrack.id);
        }
        
        if(tracks.length < 1){
            getDBText();
        }
    })

    const fetchTracks = async () => {
        const res = await fetch('http://localhost:5000/tracks');
        const data = await res.json();
        console.log(data);
        return data;
      }

    const isSelected = (id) => {
        return id === selectedIndex;
    }

    const backgroundLabel = {
      backgroundColor: '#444937a3',
      border: "solid 0.1rem #000",
      borderRadius:"0.3rem",
    }

    const labelStyle = {
        color: '#fff',
        margin: '0.5rem'
    }

    return (
        <Box marginBottom={"3rem"}>
        <Typography variant="h3" margin={"5rem"} textAlign={"center"}> In che mood sei? </Typography>
        <List component="nav" aria-label="main mailbox folders">
            {tracks.map(({id, label}) => (
                <ListItemButton
                    className={["bg" + id, isSelected(id) ? "selectedItem" : ""]}
                    sx={{height: "7rem"}}
                    key={id}
                    selected={id === selectedIndex}
                    onClick={(event) => handleListItemClick(event, id)}
                >
                    {
                    isSelected(id) && 
                    <ListItemIcon>
                        <DoneIcon color="primary" fontSize='large'/>
                    </ListItemIcon>
                    }

                    <div style={backgroundLabel}>
                    <ListItemText primary={
                      <Typography variant="body2" 
                      style={labelStyle}
                      className={isSelected(id) ? "selectedLabel" : ""}>{label}</Typography>

                    } />
                    </div>
                </ListItemButton>
            ))}
        </List>
      </Box>
    );
}