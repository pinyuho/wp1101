import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Paper ,Typography} from '@mui/material';
import { Divider } from '@mui/material';
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
import { SnackbarProvider, useSnackbar } from 'notistack';

export default function TaskDetail(prop) {
  const { getApplicants,color, taskDetail, authToken, showTaskDetail, changeShowTaskDetail, taskState, changeState, taskID} =  useDialog()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClose = () => {
    changeShowTaskDetail()
  };

  const applies = async() => {
    const {
      data: { success, message },
    } = await axios.post(`/task/${taskDetail._id}/applicant`, {
      authToken
    });
    if(success){
      enqueueSnackbar("應徵要求已發出", {variant:"success"})
    }else{
      enqueueSnackbar(message, {variant:"error"})
    }
    handleClose()
  }

  const checkApplicant = async() => {
    const {
      data: { applicants, message },
    } = await axios.get(`/task/${taskDetail._id}/applicant`, {
      authToken
    });
    getApplicants(applicants)
    if(applicants.length === 0){
      enqueueSnackbar(message, {variant:"info"})
    }else{
      console.log("app", applicants)
      changeState("table") ;
      handleClose();
    }
    
  }

  return (
    <div>
   
      <Dialog open={showTaskDetail} onClose={handleClose}  style={{color:"black"}}>
        <DialogTitle style={{background:color[2],textAlign:"center" ,color:"black"}}>{taskDetail.title}</DialogTitle>
        <Divider variant="middle"></Divider>
        <DialogContent  style={{background:color[2],width:"400px", height:"400px"}}>
        <List
        sx={{
            width: '100%',
            maxWidth: 360,
           
        }}
    >
      {taskState === 0 ? <ListItem >
        <ListItemAvatar>
          <Avatar style={{background:"black"}}>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        {taskDetail.participant?
         <ListItemText primary={<Typography type="h6" style={{ color: "gray"}}>執行者</Typography>} secondary={<Typography type="h5" style={{ color: "black"}}>{taskDetail.participant}</Typography>}  />  
        :<><ListItemText primary={<Typography type="h6" style={{ color: "gray"}}>執行者</Typography>} secondary="未選擇" />  <Button style={{color: color[1]}} onClick={()=> {checkApplicant()}}>查看人才</Button></>}
        
      
      </ListItem>
      :taskState === 1 ? <ListItem >
      <ListItemAvatar>
        <Avatar style={{background:"black"}}>
          <PersonIcon />
        </Avatar>
      </ListItemAvatar>
      {taskDetail.participant?
       <ListItemText primary={<Typography type="h6" style={{ color: "gray"}}>執行者</Typography>} secondary={<Typography type="h5" style={{ color: "black"}}>{taskDetail.participant}</Typography>}  />  
      :<><ListItemText primary={<Typography type="h6" style={{ color: "gray"}}>執行者</Typography>} secondary="未選擇" />  <Button style={{color: color[1]}} onClick={()=> {checkApplicant()}}>查看人才</Button></>}
      
    
    </ListItem>
      :
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{background:"black"}}>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={<Typography type="body2" style={{ color: "gray"}}>刊登者</Typography>}secondary={<Typography type="h5" style={{ color: "black"}}>{taskDetail.publisher} </Typography>}/>
      </ListItem>
      }
      
      
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{background:"black"}}>
            <LocationOnIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={<Typography type="body2" style={{ color: "gray"}}>地點</Typography>} secondary={<Typography type="h5" style={{ color: "black"}}>{taskDetail.location}</Typography>} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{background:"black"}}>
            <AccessTimeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={<Typography type="body2" style={{ color: "gray"}}>時間</Typography>} secondary={<Typography type="h5" style={{ color: "black"}}>{taskDetail.time}</Typography>} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{background:"black"}}>
            <AttachMoneyIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={<Typography type="body2" style={{ color: "gray"}}>報酬</Typography>} secondary={<Typography type="h5" style={{ color: "black"}}>{taskDetail.reward} </Typography>}/>
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{background:"black"}}>
            FB
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={<Typography type="body2" style={{ color: "gray"}}>FB連結</Typography>} secondary={<Typography type="h5" style={{ color: "black"}}>{taskDetail.social_account} </Typography>}/>
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{background:"black"}}>
            <ContentPasteIcon  />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={<Typography type="body2" style={{ color: "gray"}}>任務內容</Typography>} secondary={<Typography type="h5" style={{ wordBreak: "break-all",color: "black"}}>{taskDetail.description} </Typography>}/>
      </ListItem>
    </List>
            
     
        </DialogContent >
        {taskState===2? (  <DialogActions style={{background:color[2]}}>
          <Button style={{color: color[1]}} onClick={handleClose}>返回</Button>
          <Button style={{color: color[1]}} onClick={applies}>應徵</Button>
        </DialogActions>):<></>}
      
      </Dialog>
    </div>
  );
}