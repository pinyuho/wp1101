// mui
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
//{ title, count }
export default function TaskListTitle({title}) {
  const box = {
    width: "50%",
    position: "relative",
      top: "10%",
      left: "50%",
      transform: "translate(-50%,-50%)"
  }
  return (
    <>
      <Box paddingX={2} paddingY={1} borderBottom="1px solid #ddd"  >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h5" style={{marginLeft:"3%" ,marginTop:"1%", marginBottom:"1%"}}>{title}</Typography>
        
        </Stack>
      </Box>
    </>
  );
}
