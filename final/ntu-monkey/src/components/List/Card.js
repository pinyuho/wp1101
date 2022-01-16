import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider, Paper } from '@mui/material';
import styled from 'styled-components';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { useDialog } from '../../hooks/Dialog';
import axios from "../../api"

var moment = require('moment');
export default function TaskCard(prop) {
  const {color,changeShowTaskDetail, getTaskDetail} = useDialog()
  const openDetail = async() =>　{
    changeShowTaskDetail(true)
    let data
    = await axios.get(`/task/${prop.Task._id}`);
    getTaskDetail(data.data.task)
  }
  return (
    <Paper elevation={12}  style ={{ important:true, backgroundColor:color[0],margin: "1%", width: "15vw" ,height: "10%"}}>
        <Typography variant="h6" component="div" style={{ marginTop:"3%"}}>
          {prop.Task.title}
        </Typography>
        <Divider variant="middle" style={{ marginTop:"2%",background: 'white' }} />
        <List
        style={{important:true, backgroundColor:color[0]}}
        sx={{
            width: '100%',
            maxWidth: 360,
        }}
    >
      <ListItem >
        <ListItemAvatar>
          <Avatar sx={{width: 35, height:35, backgroundColor:"black"}}>
            <AccessTimeIcon  color="secondary" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primaryTypographyProps={{
                  fontSize: 10,
                  fontWeight: 'medium',
                  color:color[1],
                  letterSpacing: 0,
                }} secondaryTypographyProps={{
                  fontSize: 12,
                  color:"white",
                  fontWeight: 'medium',
                  letterSpacing: 0,
                }} style={{margin:"0", color:"white"}}  primary="時間" secondary= {moment(prop.Task.time).format('YYYY-MM-DD')} />
      </ListItem>
 
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{width: 35, height:35, backgroundColor:"black"}}>
            <AttachMoneyIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primaryTypographyProps={{
                  fontSize: 10,
                  fontWeight: 'medium',
                  color:color[1],
                  letterSpacing: 0,
                }} secondaryTypographyProps={{
                  fontSize: 12,
                  color:"white",
                  fontWeight: 'medium',
                  letterSpacing: 0,
                }}style={{margin:"0"}} primary="報酬" secondary={"$ "+prop.Task.reward }/>
      </ListItem>

    
                  <Button onClick = {openDetail} size="small" style={{fontSize: 10,color:"#B39DDB"}}>Learn More</Button>
                 
       </List>

  
   
    </Paper>
  );
}
