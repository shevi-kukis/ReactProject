
import { useContext } from "react";
import { UserContext } from "../reducer/userReducer";
import { Avatar, Typography, Paper } from "@mui/material";
import { red } from "@mui/material/colors";

const ShowUser = () => {
  const userDetail = useContext(UserContext);
  const firstName = userDetail?.user?.firstName || "אורח";

  return (
    <Paper 
      elevation={3}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: 2,
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Avatar sx={{ bgcolor: red[500] }}>{firstName.charAt(0)}</Avatar>
      <Typography variant="h6">{firstName}</Typography>
    </Paper>
  );
};

export default ShowUser;
