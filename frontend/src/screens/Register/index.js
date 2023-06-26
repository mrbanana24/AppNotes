import { React, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Formik, Form } from "formik";
import Header from "../../components/Header";
import RButton from "../../components/Button";
import SnackbarAl from "../../components/Snackbar";
import { useNavigate } from "react-router-dom";

// Styles
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
  width: "60%",
  height: "60%",
};

const Register = () => {
  const [open, setOpen] = useState(false);
  const [sev, setSeverity] = useState("");

  const navigate = useNavigate();

  const onSubmitHandler = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/register",
        values
      );
      if (response.status === 200) {
        setOpen(true);
        navigate("/login");
      }
    } catch (err) {
      setOpen(true);
      setSeverity("error");
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
        <img src="/assets/imgRegister.png" alt="img" style={imgStyle} />
      </Grid>
      {/* Right part in the screen (Form) */}
      <Grid item xs={12} sm={6} style={RightStyle}>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={onSubmitHandler}
        >
          {(props) => (
            <Form>
              <Grid
                container
                direction="column"
                justifyContent="space-evenly"
                alignItems="center"
                height="100vh"
                style={RegisterGrid}
              >
                <Grid item>
                  <input
                    name="username"
                    type="text"
                    placeholder="Select a username"
                    style={inputStyle}
                    onChange={props.handleChange}
                  />
                </Grid>
                <Grid item>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    style={inputStyle}
                    onChange={props.handleChange}
                  />
                </Grid>
                <Grid item>
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    style={inputStyle}
                    onChange={props.handleChange}
                  />
                </Grid>
                <Grid item>
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    style={inputStyle}
                    onChange={props.handleChange}
                  />
                </Grid>
                <Grid item>
                  <RButton text="Register" />
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

export default Register;
