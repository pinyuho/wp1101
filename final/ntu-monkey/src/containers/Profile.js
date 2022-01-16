import { Box, TextField, Button, Paper,Typography} from "@mui/material"
import { useState, useEffect } from "react"
import { useDialog } from "../hooks/Dialog"
import { Alert, Avatar, Divider } from "@mui/material"
import SideBar from '../components/Aside';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import axios from "../api"
import Detail from "../components/Dialog/editProfile"
const Profile = () => {
    const {color, username, changeUserName, changeState, state, authToken, cheangeEditPro,getProfile} =  useDialog()
    const [password, setpassword] = useState("")
    const [account, setAccount] = useState({});
    const [profile, setProfile] = useState({});

    const [isEditing, setEditing] = useState(false);
    const [department, setDepartment] = useState('');
    const [socialLink, setSocialLink] = useState('');
    const [description, setDescription] = useState('');

    const Item = styled(Paper)(({ theme }) => ({
      ...theme.typography.body2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      width: "43%",
      height:"80%",
      lineHeight: '60px',
    }));
    
    const darkTheme = createTheme({ palette: { mode: 'dark' } });
    const lightTheme = createTheme({ palette: { mode: 'light' } });

    useEffect(async() => {
      let data;
      if(state === "profile"){
        data = await axios.get('/account/profile', {params:{
          authToken
        }});
      }
      console.log("data", data.data.profile)
      setProfile(data.data.profile)
      setAccount(data.data.account)
    }, [state])


    function stringToColor(string) {
      let hash = 0;
      let i;
    
      /* eslint-disable no-bitwise */
      for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
      };
    
      let color = '#';
    
      for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
      }
      /* eslint-enable no-bitwise */
    
      return color;
    }
    
    function stringAvatar(name) {
      return {
        sx: {
          width: "10vh",
          height:"10vh",
          bgcolor: stringToColor(name),

        },
        children: `${name[0]}`,
      };
    }

    const handleEdit = async () => {

    getProfile(profile,account)
      cheangeEditPro()
      setEditing(true);
    };

    const handleDone = async () => {
      setEditing(false);
    };

    const box = {
      width: "70%",
      height: "70%",
      margin: "0",
      position: "relative",
        top: "45%",
        left: "60%",
        transform: "translate(-50%,-50%)",
        background:color[0]   
    }
      const mytaskTable = {
        display: "flex",
        flexDirection: "row",
        width: "70vw",
        height:"100%",
        marginTop: "2%",
        overflow: "auto",
        flexWrap: "wrap",
        minHeight: "0",
        flex: "1"
      }
  return(
    <>
    <Detail></Detail>
    <Paper elevation={10} style={{  background:color[0] , transform: "translate(-50%,-50%)",borderRadius: 2 , position:"fixed", top:"52%" ,left:"12%", width:"15%", height: "70vh", display:"flex", flexDirection:"column"}} >
    <SideBar></SideBar>
    </Paper>
        <div style={{ marginTop: "7vh", height: "100%" }}>
          <Box sx={{ borderRadius: 2 }} style = {box} >
        <div style={{  height: "30%"}}>
        <Box style={{  margin:"4%",height: "100%", display: "flex",alignItems:"center", background:color[0] }}>
          <Box sx={{ borderRadius: 2 }} style={{  height: "80%", width:"10%",background:color[0] }}>
            <div><Avatar  style={{color:"white",fontSize:"40px", transform: "translate(12%,15%)" }} {...stringAvatar(username)} />
            < Typography  style={{ marginTop:"16%", fontSize:"24px"}}>{username}</Typography> 
          </div>

          </Box>
          <Box sx={{ borderRadius: 2 }} style={{  background:color[0] ,display: "flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start", marginLeft:"5%",height: "80%", width:"50%"}}>
          < Typography  style={{ fontSize:"20px", marginTop:"10px"}}>
            系級: {  account.department }
          </Typography> 

          < Typography  style={{  fontSize:"20px", marginTop:"10px"}}>
            FB: { profile.social_account}
          </Typography> 

          < Typography  style={{ transform: "translate(-20%,10%)" , marginLeft:"0%", fontSize:"20px", marginTop:"10px" }}>
          <Button variant="text" color="secondary" style={{fontSize:"16px",color:"white"}} onClick={handleEdit}>Edit</Button>
          </Typography> 
       

          </Box>

          </Box>
         
        </div>
        <Divider variant="middle" />
        <div  style={{ background:color[0] , width:"100%" ,height: "70%",display: "flex",alignItems:"center",justifyContent : 'space-around'}}>
          <Item elevation={16} style={{  color:"white",background:color[0],fontSize:"20px"}} >
                  {`關於我`}
                  <Divider variant="middle" />
                  <Box style={{fontSize:"16px", margin:"25px", height: "70%", width:"90%", textAlign:"left",wordBreak: "break-all"}}>
                    { profile.description }
                  </Box>
                </Item>
                <Item elevation={16} style={{ background:color[0],fontSize:"20px", color:"white"}}>
                  {`近期任務`}
                  <Divider variant="middle" />

                </Item>          

        </div>
     

        </Box>
   </div>  
    </>
  )
}
export default Profile