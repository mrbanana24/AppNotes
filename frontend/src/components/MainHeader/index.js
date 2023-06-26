import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const style = {
  backgroundColor: "transparent",
  color: "inherit",
  boxShadow: "1x 1px 1px 1px #000000",
  padding: "20px",
};

export default function Header({ icon, url }) {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={style}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Ensolvers
        </Typography>
        {icon && (
          <Typography
            variant="h6"
            component="div"
            onClick={() => navigate(url)}
          >
            {icon}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}
