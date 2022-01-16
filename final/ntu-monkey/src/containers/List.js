import React from 'react';

import { Paper, Tabs, Tab, Box } from '@mui/material';
import TabPanel from '../components/List/TabPanel';
import TaskListTitle from '../components/List/TaskListTitle';
import Title from 'antd/lib/skeleton/Title';
import Card from '../components/List/Card';
import DoneCard from "../components/List/doneCard"
import Bar from '../components/Bar';
import { useDialog } from '../hooks/Dialog';
import { async } from 'regenerator-runtime';
import SideBar from '../components/Aside';
import BmyCard from "../components/List/B_myCard"
import axios from "../api"
import Pagination from '@mui/material/Pagination';
export default function List(){
    const Title = ["我刊登的任務", "我刊登過的任務", "全部待接任務", "應徵中的任務", "我接到的任務","我完成的任務"]
    const {color ,authToken, tasks, getTasks, taskState} = useDialog()
    const [page, setPage] = React.useState(1);
    const [value, setValue] = React.useState(0);
    const [taskList, setTaskList] = React.useState([]);
    const[totalCnt, setTotalCnt] = React.useState(10);
    React.useEffect(async() => {
      let data
      if(taskState === 0){
        data = await axios.get('/task', {params:{
          "authToken":authToken,
          "type":"my",
          "role":"publisher",
          "limit":8,
          "offset":(page-1)*8
        }});
      }else if(taskState === 1){
          data
         = await axios.get('/task', {params:{
          authToken,
          "type":"done",
          "role":"publisher",
          "limit":8,
          "offset":(page-1)*8
        }});

      }else if(taskState === 2){
          data
        = await axios.get('/task', {params:{
          authToken,
          "type":"all",
          "role":"applicant",
          "limit":8,
          "offset":(page-1)*8
        }});

      }else if(taskState === 3){
          data
         = await axios.get('/task', {params:{
          "authToken": authToken,
          "type":"my",
          "role":"applicant",
          "status": "PENDING",
          "limit":8,
          "offset":(page-1)*8
         }});
         console.log("my applicant data: ", data)

      }else if(taskState === 4){
        data
       = await axios.get('/task', {params:{
        authToken,
        "type":"my",
        "role":"applicant",
        "status": "ACCEPTED",
        "limit":8,
        "offset":(page-1)*8
       }});
      }else if(taskState === 5){
          data
         = await axios.get('/task', {params:{
          authToken,
          "type":"done",
          "role":"applicant",
          "limit":8,
          "offset":(page-1)*8
        }});
      }
      console.log("datatotalCnt", data.data.totalCnt)
      setTotalCnt((Math.floor(data.data.totalCnt/8 )+ 1))
      console.log("totalCnt", Math.floor(data.data.totalCnt/8) + 1)
      data = data.data
      console.log("data", data)
      setTaskList(data.task)
      console.log("data", data)
    }, [taskState,page])

    React.useEffect(async() => {
      setPage(1)
    }, [taskState])

    const getCard = () => {
      
      if(taskState === 0){
        return(
          <>
          {taskList.map((e) => {
             return(<BmyCard Task={e}></BmyCard>)
          })}
          </>         
        )
 
      }else if(taskState === 3){
        return(
          <>
          {taskList.map((e) => {
             return(<Card Task={e}></Card>)
          })}
          </>         
        )
      }else if(taskState === 4){
        return(
          <>
          {taskList.map((e) => {
             return(<DoneCard Task={e}></DoneCard>)
          })}
          </>         
        )
      }else{
        return(
          <>
          {taskList.map((e) => {
             return(<Card Task={e}></Card>)
          })}
          </>         
        )
      }
   
    }
    const box = {
        width: "70%",
        height: "70%",
        margin: "0",
        position: "relative",
          top: "45%",
          left: "60%",
          transform: "translate(-50%,-50%)",
          backgroundColor:color[0],
          important:"true"
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

    <div style={{ marginTop: "7vh", height: "100%"}}>
    <Paper elevation={10} style={{background:color[0] , transform: "translate(-50%,-50%)",borderRadius: 2 , position:"fixed", top:"52%" ,left:"12%", width:"15%", height: "70vh", display:"flex", flexDirection:"column"}} >
    <SideBar></SideBar>
    </Paper>
      <Box sx={{ boxShadow: 1 , bgcolor: "#6a6a6a",borderRadius: 2 }} style = {box} >
          <TaskListTitle style={{height:"10%", margin:"0"}} title={Title[taskState]}></TaskListTitle>
          <Box style={{height:"82%", margin:"0"}}>
            <TabPanel value={value} index={0}  >
              <div style={mytaskTable}>
              {getCard()}
              </div>    
            </TabPanel>
          </Box>
          
          <Box style={{height:"5%", display: "flex",justifyContent:"center"}}>
            <Pagination count={totalCnt} variant="outlined" color="secondary" 
              style={{color:color[1]}}
              page={page}
              onChange={(_, page) => {
                console.log(page); 
                if(page!== null){
                  setPage(page)
                }}}
            />
          </Box>
      </Box>
      
   </div>  
    </>
);
}