import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:5000/user/${type}`, {
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (isSignup) {
      sendRequest("signup")
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/auth/login"))
        .then((data) => console.log(data));
    } else {
      sendRequest()
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/home"))
        .then((data) => console.log(data));
    }
  }

  return (
    <div>
      <form
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent={"center"}
        onSubmit={handleSubmit}
      >
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow=" 10px 10px 25px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
          border={"1px solid #ccc"}
        >
          <Typography variant="h4" padding={3} textAlign="center">
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <>
              {" "}
              <TextField
                onChange={handleChange}
                value={inputs.firstName}
                name="firstName"
                type="text"
                variant="outlined"
                label="FirstName"
                margin="normal"
              />
              <TextField
                onChange={handleChange}
                value={inputs.lastName}
                name="lastName"
                type="text"
                variant="outlined"
                label="LastName"
                margin="normal"
              />{" "}
            </>
          )}
          <TextField
            onChange={handleChange}
            value={inputs.email}
            name="email"
            type="email"
            variant="outlined"
            margin="normal"
            label="email"
          />
          <TextField
            onChange={handleChange}
            value={inputs.password}
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            label="password"
          />
          {!isSignup && (
            <p>
              <Link to="/forgot-password">Forgot password?</Link>
            </p>
          )}
          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 2 }}
            color="warning"
            variant="contained"
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 2 }}
          >
            Change to {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
}
