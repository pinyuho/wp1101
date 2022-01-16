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
import "./c.css"
export default function CreateTaskModel() {
  const [value, setValue] = useState(new Date());
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { color,showCreateTask, changeShowCreateTask, username} = useDialog()
  const [title, setTitle] = useState("")
  const [reward, setReward] = useState("")
  const [location, setLocation] = useState("")
  const [time, setTime] = useState(new Date(Date.now()))
  const [social_account, setSocialAccount] = useState("")
  const [description, setDescription] = useState("")
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [complete, setComplete] = useState(false);
  const handleClose = () => {
    changeShowCreateTask()
  };
  useEffect(() => {
    if(complete === true){
      setTimeout(() => {
        setComplete(false);
      }, 2000);
    }
  }, [complete])

  const createTask = async() => {
    if(!title || !reward || !location || !time || !social_account || !description){
      enqueueSnackbar("請填寫全部欄位", {variant:"error"})
      return 
    }else{
      const {
        data: { success, message },
      } = await axios.post('/task', {
        title,
        reward,
        location,
        time,
        social_account,
        description,
        "publisher": username,
      });
      if(success){
        enqueueSnackbar("新增任務成功", {variant:"success"})
      }else{
        enqueueSnackbar(message, {variant:"error"})
      }
    }
    
    handleClose()
  }
  return (
    
    <div >
   
      <Dialog className="amos" open={showCreateTask} onClose={handleClose}>
      {alert ? <Alert severity='error'>{alertContent}</Alert> : <></> }
        <DialogTitle  style={{ background:color[0]}}>新任務</DialogTitle>
        <DialogContent style={{ background:color[0]}}>
          <DialogContentText style={{color:"white"}} >
            請填寫下列欄位以發佈任務
          </DialogContentText>
          <TextField
          inputProps={{ style: { color: 'white', fontSize:14}}}
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
                inputProps={{ style: { color: 'white'}}}
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
          <Button style={{color: color[1]}} onClick={handleClose}>取消</Button>
          <Button style={{color: color[1]}}  onClick={() => {createTask()}}>送出</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
