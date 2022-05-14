import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    const res = await axios
      .post(`https://password-reset-flow-app.herokuapp.com/user/login`, {
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => {
        alert(err.response.data.message);
      });

    const data = await res.data;
    alert(data.message);
    reactLocalStorage.set("id", true);
    reactLocalStorage.get("id", true);
    reactLocalStorage.set("name", true);
    reactLocalStorage.get("name", true);
    reactLocalStorage.setObject("id", { id: data.existingUser._id });
    reactLocalStorage.setObject("name", {
      name: data.existingUser.name,
    });

    return data;
  };
  async function handleSubmit(e) {
    e.preventDefault();
    await sendRequest();
    dispatch(authActions.login());
    navigate(`/home`);
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
            Login
          </Typography>
          <TextField
            onChange={handleChange}
            value={inputs.email}
            name="email"
            type="email"
            variant="outlined"
            margin="normal"
            label="Email"
          />
          <TextField
            onChange={handleChange}
            value={inputs.password}
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            label="Password"
          />
          <p>
            <Link to="/forgot-password">Forgot password?</Link>
          </p>

          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 2 }}
            color="warning"
            variant="contained"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/signup")}
            sx={{ borderRadius: 3, marginTop: 2 }}
          >
            Change to Signup
          </Button>
        </Box>
      </form>
    </div>
  );
}
