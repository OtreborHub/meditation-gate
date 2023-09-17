import DoneIcon from '@mui/icons-material/Done';
import { ListItemIcon, ListItemText, Typography } from '@mui/material';
import Box from '@mui/material/Container';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setToValue } from "../utils/SliceVideo";

export default function CheckEnvironment() {
    const [selectedIndex, setSelectedIndex] = useState();
    const [tracks, setTracks] = useState([]);
    const selectedTrack = useSelector(state => (state.environment));
    const dispatch = useDispatch();

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index === selectedIndex ? null : index);
        dispatch(setToValue(tracks[index].label));
    };

    useEffect(() => {
        const getTracks = async () => {
            const tracksData = await fetchTracks();
            const tracks = tracksData.filter(track => (track.label === selectedTrack));
            setTracks(tracksData);
            setSelectedIndex(tracks[0].id);
        }
        
        getTracks();
    }, [])

    const fetchTracks = async () => {
        const res = await fetch('http://localhost:5000/tracks');
        const data = await res.json();
        console.log(data);
        return data;
      }

    return (
        <Box>
        <Typography variant="h3" margin={"5rem"}> In che mood sei? </Typography>
        <List component="nav" aria-label="main mailbox folders">
            {tracks.map(({id, label}) => (
                <ListItemButton
                    key={id}
                    selected={id === selectedIndex}
                    onClick={(event) => handleListItemClick(event, id)}
                >
                    {id === selectedIndex ? 
                        <ListItemIcon>
                            <DoneIcon/>
                        </ListItemIcon> : ''}
                    <ListItemText primary={label} />
                </ListItemButton>
            ))}
        </List>
      </Box>
    );
}