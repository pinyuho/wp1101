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

  const {changeTask, authToken,cheangeEditPro, editPro, color, getProfile, account, profile} = useDialog()

  const [localaccount, setAccount] = useState({});
  const [localprofile, setProfile] = useState({});

  const [department, setDepartment] = useState('');
  const [socialLink, setSocialLink] = useState('');
  const [description, setDescription] = useState('');

  useEffect(async() => {
    setDepartment(account.department)
    setDescription( profile.description)
    setSocialLink(profile.social_account)
  }, [editPro])

  const handleClose = () => {
    cheangeEditPro()
  };


  const EditTask = async() => {
    getProfile(profile,account)
    console.log("Edit: ",department,socialLink, description)
    const {
        data: { success, message },
      } = await axios.post(`/account/profile`, {
        authToken,
        department,
        "social_account":socialLink,
        description
      });
      console.log("editttt", message)
     enqueueSnackbar("編輯成功", {variant:"success"})
     changeTask(2)
     handleClose()
   }

  return (
    
     <div>
     
      <Dialog open={editPro} onClose={handleClose}>
    
        <DialogTitle style={{ background:color[0]}}>編輯簡介</DialogTitle>
        <DialogContent style={{ background:color[0]}}>
          <DialogContentText style={{color:"white"}} >
            請填寫下列欄位以編輯
          </DialogContentText>
          <TextField
            inputProps={{ style: { color: 'white',fontSize:14}}}
          color= "secondary"
            autoFocus
            margin="dense"
            id="department"
            label="系級"
            type="email"
            fullWidth
            required
            variant="standard"
             value={department}
            onChange={(e) => {setDepartment(e.target.value)}}
          />
           
           <TextField
             inputProps={{ style: { color: 'white',fontSize:14}}}
           color= "secondary"
            autoFocus
            margin="dense"
            id="socialLink"
            label="FB連結"
            type="email"
            fullWidth
            required
            variant="standard"
            value={socialLink}
            onChange={(e) => {setSocialLink(e.target.value)}}
          />


           <TextField
             inputProps={{ style: { color: 'white',fontSize:14}}}
           color= "secondary"
            autoFocus
            margin="dense"
            id="description"
            label="自我介紹"
            type="email"
            fullWidth
            required
            variant="standard"
            value={description}
            onChange={(e) => {setDescription(e.target.value)}}
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