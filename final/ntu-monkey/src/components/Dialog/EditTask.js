import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Alert } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { SnackbarProvider, useSnackbar } from 'notistack';

import { useDialog } from '../../hooks/Dialog';
import { createContext, useContext, useState, useEffect } from 'react';
import axios from "../../api"
export default function CreateTaskModel(prop) {
  const [value, setValue] = useState(new Date());

  const { color,showEditTask, changeShowEditTask, username, taskDetail, changeTask, taskState} = useDialog()
  const [title, setTitle] = useState("")
  const [reward, setReward] = useState("")
  const [location, setLocation] = useState("")
  const [time, setTime] = useState(new Date(Date.now()))
  const [social_account, setSocialAccount] = useState("")
  const [description, setDescription] = useState("")
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [complete, setComplete] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

 
  const handleClose = () => {
    changeShowEditTask()
  };

  useEffect(() => {
    if(complete === true){
      setTimeout(() => {
        setComplete(false);
      }, 2000);
    }
  }, [complete])

  useEffect(() => {
    if(showEditTask === true){
     setTitle(taskDetail.title);
     setReward(taskDetail.reward);
     setLocation(taskDetail.location);
     setTime(taskDetail.time);
     setSocialAccount(taskDetail.social_account);
     setDescription(taskDetail.description);
  }}, [showEditTask])

const EditTask = () => {
   console.log("Edit: ",title,reward, location)

    axios.patch(`/task/${taskDetail._id}`, {
    title,
    reward,
    location,
    time,
    social_account,
    description,
  });
    changeTask(2)
    enqueueSnackbar("編輯任務成功", {variant:"success"})
    handleClose()
  }
  return (
    
    <div>
      {complete ? <Alert severity='success'>complete to create Task</Alert> : <></> }
      <Dialog open={showEditTask} onClose={handleClose}>
    
      {alert ? <Alert severity='error'>{alertContent}</Alert> : <></> }
        <DialogTitle style={{ background:color[0]}}>編輯任務</DialogTitle>
        <DialogContent style={{ background:color[0]}}>
          <DialogContentText style={{color:"white"}} >
            請填寫下列欄位以編輯任務
          </DialogContentText>
          <TextField
            inputProps={{ style: { color: 'white',fontSize:14}}}
          color= "secondary"
            autoFocus
            margin="dense"
            id="name"
            label="任務名稱"
            type="email"
            fullWidth
            required
            variant="standard"
             value={title}
            onChange={(e) => {setTitle(e.target.value)}}
          />
           
           <TextField
             inputProps={{ style: { color: 'white',fontSize:14}}}
           color= "secondary"
            autoFocus
            margin="dense"
            id="reward"
            label="報酬"
            type="email"
            fullWidth
            required
            variant="standard"
            value={reward}
            onChange={(e) => {setReward(e.target.value)}}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="時間"
              value={time}
              onChange={(newValue) => {
                setTime(newValue);
              }}
              inputProps={{ style: { color: 'white',fontSize:14}}}
              renderInput={(params) => <TextField
              
                color= "secondary"
                autoFocus
                margin="dense"
                fullWidth
                required
                variant="standard"
                {...params} />}
            />
          </LocalizationProvider>

           <TextField
             inputProps={{ style: { color: 'white',fontSize:14}}}
           color= "secondary"
            autoFocus
            margin="dense"
            id="location"
            label="地點"
            type="email"
            fullWidth
            required
            variant="standard"
            value={location}
            onChange={(e) => {setLocation(e.target.value)}}
          />
             <TextField
               inputProps={{ style: { color: 'white',fontSize:14}}}
             color= "secondary"
            autoFocus
            margin="dense"
            id="name"
            label="FB 連結"
            type="email"
            fullWidth
            required
            variant="standard"
            value={social_account}
            onChange={(e) => {setSocialAccount(e.target.value)}}
          />
           <TextField
             inputProps={{ style: { color: 'white',fontSize:14}}}
           color= "secondary"
            autoFocus
            margin="dense"
            id="name"
            label="任務內容"
            type="email"
            fullWidth
            multiline
            required
            rows={4}
            variant="standard"
            value={ description}
            onChange={(e) => { setDescription(e.target.value)}}
          />
        </DialogContent>
        <DialogActions style={{ background:color[0]}}>
          <Button style={{color: color[1]}} onClick={handleClose}>返回</Button>
          <Button style={{color: color[1]}} onClick={() => {EditTask()}}>變更</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
