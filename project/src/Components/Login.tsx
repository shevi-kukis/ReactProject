import { FormEvent, useContext, useRef, useState } from "react";
import { UserContext } from "../reducer/userReducer";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import axios from "axios";
import ShowUser from "./ShowUser";
import UpdateUser from "./UpdateUser";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const userDetail = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [login, setLogin] = useState(false);

  const handlopenLogin = () => {
    setOpen(true);
    setLogin(true);
  };

  const handlopenRegister = () => {
    setOpen(true);
    setLogin(false);
  };

  const handlclose = () => setOpen(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const path = await axios.post(
        `http://localhost:3000/api/user/${login ? "login" : "register"}`,
        {
          email: emailRef.current?.value || "",
          password: passwordRef.current?.value || "",
        }
      );
      if (login) {
        userDetail.Dispatch({ type: "UPDATE_USER", data: path.data.user });
      } else {
        userDetail.Dispatch({
          type: "ADD_USER",
          data: {
            email: emailRef.current?.value || "",
            password: passwordRef.current?.value || "",
            id: Number(path.data.userId) || 0,
          },
        });
      }
      handlclose();
      setIsShow(true);
    } catch (e: any) {
      console.error("Error in login/register:", e);
      if ([422, 400, 401].includes(e.response?.status)) alert(e.response.data.message);
    }
  };

  const handleLogout = () => {
    userDetail.Dispatch({ type: "LOGOUT" });
    setIsShow(false);
  };

  return (
    <>
      <Box sx={{ position: "fixed", top: 20, left: 20, zIndex: 100000 }}>
        {!isShow ? (
          <>
            <Button onClick={handlopenLogin} variant="contained" color="error">Login</Button>
            <Button onClick={handlopenRegister} variant="contained" color="error">Register</Button>
          </>
        ) : (
          <Button onClick={handleLogout} variant="contained" color="error">Logout</Button>
        )}
      </Box>

      {isShow && (
        <Box sx={{ position: "fixed", top: 70, left: 20, zIndex: 100000 }}>
          <ShowUser />
          <UpdateUser />
        </Box>
      )}

      <Modal open={open} onClose={handlclose}>
        <Box sx={{ p: 4, bgcolor: "#fff", borderRadius: 2, maxWidth: 400, width: "100%", m: "auto", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", boxShadow: 24, zIndex: 1300 }}>
          <Typography variant="h6" gutterBottom align="center" color="error">
            {login ? "Login" : "Register"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Email" variant="outlined" inputRef={emailRef} required margin="normal" />
            <TextField fullWidth label="Password" variant="outlined" inputRef={passwordRef} required margin="normal" type="password" />
            <Button type="submit" fullWidth variant="contained" color="error" sx={{ mt: 2 }}>
              {login ? "Login" : "Register"}
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default Login;
