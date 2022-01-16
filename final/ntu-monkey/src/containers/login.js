import { Box, TextField, Button } from "@mui/material"
import { useState, useEffect } from "react"
import { useDialog } from "../hooks/Dialog"
import { Alert } from "@mui/material"
import "./login.css"
import axios from "../api"
import { SnackbarProvider, useSnackbar } from 'notistack';
const Login = () => {
    const {color, getAuthToken, username, changeUserName, changeState} =  useDialog()
    const [password, setpassword] = useState("")
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [complete, setComplete] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();



  
    const login = async () => {
      
      if(!username || !password){
        enqueueSnackbar("請填寫全部欄位", {variant:"error"})
        return 
      }else{
        const {
          data: { success, message , authToken},
        } = await axios.post('/account/login', {
          username,
          password
        });
        if(success){
          getAuthToken(authToken)
          enqueueSnackbar("登入成功", {variant:"success"})
          changeState("main")
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
    top: "50%",
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
  const styles = theme => ({
    notchedOutline: {
      borderWidth: "1px",
      borderColor: "yellow !important"
    }
  });
  
  
  return(
    <>
        {complete ? <Alert severity='success'>Login in</Alert> : <></> }
        {alert ? <Alert severity='error'>{alertContent}</Alert> : <></> }
        <Box style={mystyle}>
           <Box style={myBox}>
            <Box style={myTitle}> NTU MONKEY</Box>
            <Box style={myContent}> 
    
            <TextField color= "secondary" label="Username" inputProps={{ style: { color: 'white'}}} focused value={username} onChange={(e) => changeUserName(e.target.value)} style={{width:"50%", margin:"10px"}}  />
            <TextField color= "secondary" label="Password" inputProps={{ style: { color: 'white'}}} focused value={password} onChange={(e) => setpassword(e.target.value)} style={{width:"50%", margin:"10px"}}  id="outlined-size-normal" defaultValue="" />
            <div style={{width:"50%", marginTop:"10px", margin:"auto"}}>
                <Button style={{marginRight: "30px" , color: color[1] }} onClick={() => changeState("sign_up")}>sign up</Button>
                <Button style={{marginLeft: "30px" , color: color[1] }} onClick={() => login()}>sign in</Button>
            </div>
           
            </Box>
           </Box>
        </Box>
    </>
  )
}
export default Login
