import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";

const NavBar = () => {
    return (
        <AppBar position="fixed" sx={{ bgcolor: "error.main", top: 0, left: 0, width: "100%", zIndex: 1100 }}>
            <Toolbar sx={{ justifyContent: "flex-end" }}>
                <Link to={"/Home"}>
                    <Button sx={{ color: "white" }}>🏠 Home</Button> 
                </Link>
                <Link to={"/About"}>
                    <Button sx={{ color: "white" }}>ℹ️ About</Button> 
                </Link>
                <Link to={"/recipe"}>
                    <Button sx={{ color: "white" }}> 📖 recipes</Button> 
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
