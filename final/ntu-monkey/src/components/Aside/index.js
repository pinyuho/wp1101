// mui
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useDialog } from "../../hooks/Dialog";
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
const drawerWidth = 300;

export default function SideBar() {
  const { color, showCreateTask, changeShowCreateTask, changeState, changeTask} = useDialog()
  const [showBoss, setShowBoss] = React.useState(false)
  const [showApp, setShowApp] = React.useState(false)

  return (
    <>
        <Typography style={{height:"10%", display: "flex",justifyContent: "center",alignItems: "center" ,fontSize:"30px"}}>Menu</Typography>
        <Divider variant="middle" />
        <Typography style={{marginTop:"5%",marginBottom:"2%", marginLeft:"5%",textAlign:"left"}}>Profile</Typography>


        <ListItem button style={{textAlign:"left",width:"90%",color:"#616161",marginBottom:"1%",marginLeft:"5%",marginRight:"5%",borderRadius: "10px"}} onClick = {() => {changeState("profile")}}>
              <AssignmentIndIcon style={{color:"#616161",marginRight:"8%"}}></AssignmentIndIcon>
              <ListItemText primary={"Profile"} />
            </ListItem>

        <Divider variant="middle"/>

        <Typography style={{marginTop:"5%",marginBottom:"2%", marginLeft:"5%",textAlign:"left"}}>Boss</Typography>
   
          {['MyTasks', 'DoneTasks'].map((text, index) => (
            <ListItem button style={{textAlign:"left",width:"90%",color:"#616161",marginBottom:"1%",marginLeft:"5%",marginRight:"5%",borderRadius: "10px"}} key={"B_"+text} onClick={()=>changeTask(index)}>
               <AssignmentIcon style={{color:"#616161",marginRight:"8%"}}> </AssignmentIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          <Divider variant="middle"/>
          <Typography style={{marginTop:"5%",marginBottom:"2%", marginLeft:"5%",textAlign:"left"}}>Applicant</Typography>

             {["AllTasks",'pendingTasks', "myTasks", 'DoneTasks'].map((text, index) => (
                     <ListItem button style={{textAlign:"left",width:"90%",color:"#616161",marginBottom:"1%",marginLeft:"5%",marginRight:"5%",borderRadius: "10px"}} key={"A_"+text} onClick={()=>changeTask(2+index)}>
                     <AssignmentIcon style={{color:"#616161",marginRight:"8%"}}> </AssignmentIcon>
                    <ListItemText primary={text} />
                  </ListItem>
             ))}
        
        
     
    </>
  );
}
