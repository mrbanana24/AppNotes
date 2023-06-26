import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import RButton from "../Button";

const style = {
  backgroundColor: "transparent",
  color: "inherit",
  boxShadow: "none",
  padding: "20px",
};

export default function Header() {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={style}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          onClick={() => navigate("/")}
        >
          Ensolvers
        </Typography>
        <RButton text="Login" action={() => navigate("/")} />
        <Box sx={{ width: "60px" }} />
        <RButton text="Register" action={() => navigate("/register")} />
      </Toolbar>
    </AppBar>
  );
}
