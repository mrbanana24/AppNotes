import React from "react";
import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Formik, Form } from "formik";
import Header from "../../components/Header";
import RButton from "../../components/Button";
import { useNavigate } from "react-router-dom";
import SnackbarAl from "../../components/Snackbar";

const RightStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const RegisterGrid = {
  width: "500px",
  height: "700px",
  borderRadius: "25px",
};

const inputStyle = {
  width: "350px",
  height: "50px",
  paddingLeft: "10px",
  backgroundColor: "#F2F2F2",
};

const imgStyle = {
  width: "90%",
  height: "80%",
};

const Login = () => {
  const [open, setOpen] = useState(false);
  const [sev, setSeverity] = useState("");

  const navigate = useNavigate();

  const onSubmitHandler = async (values, { handleChange }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/login",
        values
      );
      console.log("Aca esta el response del login: ", response);
      localStorage.setItem("token", response.data.token);
      if (response.status === 200) {
        setOpen(true);
        setSeverity("success");
      }
      response && navigate("/mainpage");
    } catch (err) {
      setOpen(true);
      setSeverity("error");
      console.log(err);
    }
  };
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Header />
      {/* Left part in the screen */}
      <Grid
        item
        xs={12}
        sm={6}
        sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}
      >
        <img src="/assets/imgLogin.png" alt="img" style={imgStyle} />
      </Grid>
      {/* Right part in the screen (Form) */}
      <Grid item xs={12} sm={6} style={RightStyle}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={onSubmitHandler}
        >
          {(props) => (
            <Form>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={RegisterGrid}
              >
                <Grid item>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    style={inputStyle}
                    onChange={props.handleChange}
                  />
                </Grid>
                <br />
                <br />
                <Grid item>
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    style={inputStyle}
                    onChange={props.handleChange}
                  />
                </Grid>
                <br />
                <br />
                <Grid item>
                  <RButton
                    text="Login"
                    action={() => console.log("se mando el form de login")}
                  />
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
      <SnackbarAl
        open={open}
        Hiden={6000}
        close={() => setOpen(false)}
        severity={sev}
      />
    </Grid>
  );
};

export default Login;
