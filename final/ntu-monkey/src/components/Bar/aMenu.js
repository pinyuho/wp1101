import * as React from 'react';
import Box from '@mui/material/Box';
import { Avatar,Chip } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useDialog } from "../../hooks/Dialog";
import AddBoxIcon from '@mui/icons-material/AddBox';
export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { username, showCreateTask, changeShowCreateTask, changeState} = useDialog()
  const open = Boolean(anchorEl);

  const handleOpenCreateTaskModal = () => {
    changeShowCreateTask()
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
    <React.Fragment>
      <Box style={{position:"absolute",right:"5vw"}} sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
               <Chip  style={{color:"white"}}
                avatar={<Avatar style={{color:"white"}} {...stringAvatar(username)} />}
                label={username}
                variant="outlined"
            />
            
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem style={{fontSize:"12px",textAlign:"left",width:"95%",color:"#616161",marginBottom:"1%",marginLeft:"2%",marginRight:"2%",borderRadius: "10px"}}>
        <Avatar style={{color:"white"}} {...stringAvatar(username)} /> {username}
        </MenuItem>
        <Divider />
        <MenuItem  style={{fontSize:"12px",textAlign:"left",width:"95%",color:"#616161",marginBottom:"1%",marginLeft:"2%",marginRight:"2%",borderRadius: "10px"}} onClick={handleOpenCreateTaskModal}>
        <Avatar sx={{width: 25, height:25, backgroundColor:"gray"}}>
            <AddBoxIcon fontSize="medium" color="disabled"  />
            </Avatar>
          Create new Task
        </MenuItem>
        <MenuItem style={{fontSize:"12px",textAlign:"left",width:"95%",color:"#616161",marginBottom:"1%",marginLeft:"2%",marginRight:"2%",borderRadius: "10px"}} onClick={ () => {changeState("sign_in")}}>
      
          <Avatar sx={{width: 35, height:35, backgroundColor:"gray"}}>
            <Logout fontSize="medium" style={{color:"black"}} />
          </Avatar>
           
         
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
