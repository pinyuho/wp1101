import React from 'react';
import { Paper, Tabs, Tab, Box, Checkbox, Button, Avatar } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SideBar from '../components/Aside';
import { useDialog } from "../hooks/Dialog"
import { SnackbarProvider, useSnackbar } from 'notistack';
import axios from "../api"

export default function List(){
  const {taskDetail,changeTask, applicants, color, username, changeUserName, changeState} =  useDialog()
    const [seleter, setSeleter] = React.useState(0);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const select = async(id) => {
      console.log("id", taskDetail._id,id)
      const {
        data: { success },
      } = await axios.post(`/task/${taskDetail._id}/applicant/${id}`);
      if(success){
        changeTask(0)
        enqueueSnackbar("選擇成功", {variant:"success"})
      }
    }

    function createData(id, name, calories, fat, carbs, protein) {
        return {id, name, calories, fat, carbs, protein };
      }
      
      const rows = [
        createData(1,'Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData(2,'Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData(3,'Eclair', 262, 16.0, 24, 6.0),
        createData(4,'Cupcake', 305, 3.7, 67, 4.3),
        createData(5,'Gingerbread', 356, 16.0, 49, 3.9),
      ];

      function stringToColor(string) {
        let hash = 0;
        let i;
      
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
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
            bgcolor: stringToColor(name),
          },
          children: `${name[0]}`,
        };
      }

    const box = {
        width: "70vw",
        height: "70vh",
        margin: "0",
        position: "relative",
          top: "40%",
          left: "60%",
          transform: "translate(-50%,-50%)",
         
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
    <Paper elevation={10} style={{  background:color[0] , transform: "translate(-50%,-50%)",borderRadius: 2 , position:"fixed", top:"52%" ,left:"12%", width:"15%", height: "70vh", display:"flex", flexDirection:"column"}} >
    <SideBar></SideBar>
    </Paper>
    <div style={{ marginTop: "12vh", height: "100%"}}>
      
      <Box style = {box} >
       <TableContainer component={Paper} style={{ background: color[0]}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell style={{color:"white"}} align="left"></TableCell>
            <TableCell style={{color:"white"}} align="left" >Name</TableCell>
            <TableCell style={{color:"white"}} align="left">Department</TableCell>
            <TableCell style={{color:"white"}} align="left">email</TableCell>
            <TableCell style={{color:"white"}}  align="left">Choose</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applicants.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell style={{color:"white",wordBreak: "break-all"}}  align="center"><Avatar style={{color:"white" }} {...stringAvatar(row.username)} /></TableCell>
                <TableCell style={{color:"white",wordBreak: "break-all"}}  align="left">{row.username}</TableCell>
              <TableCell style={{color:"white",wordBreak: "break-all"}} align="left">{row.department}</TableCell>
              <TableCell style={{color:"white",wordBreak: "break-all"}} align="left">{row.email}</TableCell>
              <TableCell style={{color:"white",wordBreak: "break-all"}} align="left" padding="checkbox">
                <Button
                 style={{color: color[1]}}
                    id={row.id}
                    color="primary"
                    onClick={()=>{select(row._id)}}
                >選擇</Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Box>
   </div>  
    </>
);
}