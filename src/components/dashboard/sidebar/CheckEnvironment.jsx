import DoneIcon from '@mui/icons-material/Done';
import { ListItemIcon, ListItemText, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from 'react-responsive';
import '../../../styles/checkEnvironment.css';
import { setToValue } from "../../../utils/slices/SliceVideo";
import { db } from '../../../utils/firebase';
import { onValue, ref } from "firebase/database";

export default function CheckEnvironment() {
    const isMobile = useMediaQuery({ query: '(max-width: 900px)' });
    const isDesktop = useMediaQuery({ query: '(min-width: 900px)' });

    const [selectedIndex, setSelectedIndex] = useState();
    const [tracks, setTracks] = useState([]);
    const environment = useSelector(state => (state.environment));
    const dispatch = useDispatch();

    const selectEnvironment = (event, index) => {
        setSelectedIndex(index);
        dispatch(setToValue(tracks[index].id));
    };

    useEffect(() => {
        const query = ref(db, "tracks");
        return onValue(query, (snapshot) => {
          const data = snapshot.val();
          console.log(data);
          // const selected = data.filter((track) => (track.id === environment));
          // setSelectedIndex(selected.id);
          // eslint-disable-next-line
          data.map((track) => {
            if(track.id === environment){
                setSelectedIndex(track.id);
              }
          })
          setTracks(data);
        });
      }, [environment]);

    const isSelected = (id) => {
        return id === selectedIndex;
    }

    return (
        <Box marginBottom={"3rem"}>
        <Typography 
          variant={(isMobile && "h5") || (isDesktop && "h4")} 
          margin={(isMobile && "3rem") || (isDesktop && "5rem")}
          textAlign={"center"}
        > In che mood sei? 
        </Typography>
        <List component="nav" aria-label="main mailbox folders">
            {tracks.map(({id, label}) => (
                <ListItemButton
                    className={["bg" + id, isSelected(id) ? "selectedItem" : ""]}
                    sx={{height: "7rem"}}
                    key={id}
                    selected={id === selectedIndex}
                    onClick={(event) => selectEnvironment(event, id)}
                >
                    {
                    isSelected(id) && 
                    <ListItemIcon>
                        <DoneIcon color="primary" fontSize='large'/>
                    </ListItemIcon>
                    }

                    <div className='backgroundLabel'>
                    <ListItemText primary={
                      <Typography 
                      variant="body2" 
                      color="#fff"
                      margin="0.5rem"
                      fontStyle={isSelected(id) ? "italic" : "none"}
                      >{label}
                      </Typography>
                    } />
                    </div>
                </ListItemButton>
            ))}
        </List>
      </Box>
    );
}