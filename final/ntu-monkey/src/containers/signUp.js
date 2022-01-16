import { Box, TextField, Button, Alert } from "@mui/material"
import { useState, useEffect } from "react"
import { useDialog } from "../hooks/Dialog"
import "./login.css"
import axios from "../api"
import { SnackbarProvider, useSnackbar } from 'notistack';

const Login = () => {
    const {color, username, changeUserName, changeState} =  useDialog()
    const [password, setpassword] = useState("")
    const [email, setEmail] = useState("")
    const [student_id, setStudent_id] = useState("")
    const [department, setDepartment] = useState("")
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();


    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
 




    const logup = async() => {
      if(!username || !password || !student_id || !email|| !department ){
        enqueueSnackbar("請填寫全部欄位", {variant:"error"})
        return 
      }else{
        const {
          data: { success, message },
        } = await axios.post('/account', {
          username,
          password,
          email, 
          student_id, 
          department,
        });
        if(success){
          enqueueSnackbar("註冊成功", {variant:"success"})
          changeState("sign_in")
        }else{
          enqueueSnackbar(message, {variant:"error"})
        }
       
      }
    }

  const mystyle = {
    height: "100vh",
    width: "40vw",
    margin: "auto"
  } 
  const myBox = {
    height: "40%",
    width: "40vw",
    margin: "0",
    position: "absolute",
    top: "40%",
    transform: "translateY(-50%)"
  } 

  const myTitle = {
    height: "30%",
    width: "40vw",
    display: "flex",     
    alignItems: "center",
    justifyContent: "center",
    fontSize: "80px",
    fontFamily: 'Moo Lah Lah'
  }

  const myContent = {
    height: "70%",
    width: "40vw",
  }
  return(
    <>
        
        <Box style={mystyle}>
          
           <Box style={myBox}>
            <Box style={myTitle}> NTU MONKEY</Box>
            <Box style={myContent}>
            <TextField color="secondary" inputProps={{ style: { color: 'white'}}}   focused label="Username" value={username} onChange={(e) => changeUserName(e.target.value)} style={{width:"50%", margin:"10px"}} id="outlined-size-normal" defaultValue="" />
            <TextField color="secondary" inputProps={{ style: { color: 'white'}}}   focused  label="Password" value={password} onChange={(e) => setpassword(e.target.value)} style={{width:"50%", margin:"10px"}}  id="outlined-size-normal" defaultValue="" />
            <TextField color="secondary" inputProps={{ style: { color: 'white'}}}   focused label="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{width:"50%", margin:"10px"}} id="outlined-size-normal" defaultValue="" />
            <TextField color="secondary" inputProps={{ style: { color: 'white'}}}   focused label="student_id" value={student_id} onChange={(e) => setStudent_id(e.target.value)} style={{width:"50%", margin:"10px"}} id="outlined-size-normal" defaultValue="" />
            <TextField color="secondary" inputProps={{ style: { color: 'white'}}}   focused label="department" value={department} onChange={(e) => setDepartment(e.target.value)} style={{width:"50%", margin:"10px"}} id="outlined-size-normal" defaultValue="" />

            <div style={{width:"50%", marginTop:"10px", margin:"auto"}}>
                <Button style={{marginRight: "30px", color: color[1]}} onClick={() =>changeState("sign_in")}>back</Button>
                <Button style={{marginLeft: "30px",color: color[1]}} onClick={() => logup()}>sign up</Button>
            </div>
           
            </Box>
           </Box>
        </Box>
    </>
  )
}
export default Login
