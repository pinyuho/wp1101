// mui
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CreateTaskModel from "../Dialog/CreateTaskModel";
import EditTaskModel from "../Dialog/EditTask";
import TaskDetail from "../Dialog/TaskDetail";
import { useDialog } from "../../hooks/Dialog";
import { Avatar,Chip } from "@mui/material";
import Amenu from "./aMenu"
export default function Bar() {
  const { showCreateTask, changeShowCreateTask, changeState} = useDialog()
  const handleOpenCreateTaskModal = () => {
    changeShowCreateTask()
  }
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
  return (
    <>
      <AppBar
      style={{ height : "7vh"}}
        sx={{
          backgroundColor: "#222",
        }}
      >
        <Toolbar>
        <Amenu ></Amenu>
          <EditTaskModel></EditTaskModel>
            <CreateTaskModel></CreateTaskModel>
            <TaskDetail></TaskDetail>
          
          
            
           
        </Toolbar>
      </AppBar>
    </>
  );
}
