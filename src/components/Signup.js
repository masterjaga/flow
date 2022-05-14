import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Signup() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    try {
      return setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const sendRequest = async () => {
    try {
      const res = await axios
        .post(`https://password-reset-flow-app.herokuapp.com/user/signup`, {
          name: inputs.name,
          email: inputs.email,
          password: inputs.password,
        })
        .catch((err) => alert(err.response.data.message));

      const data = await res.data;
      alert(data.message);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      await sendRequest();
      navigate(`/login`);
    } catch (error) {
      console.log(error);
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
            Signup
          </Typography>
          <TextField
            onChange={handleChange}
            value={inputs.name}
            name="name"
            type="text"
            variant="outlined"
            label="Name"
            margin="normal"
          />
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
          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 2 }}
            color="warning"
            variant="contained"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/login")}
            sx={{ borderRadius: 3, marginTop: 2 }}
          >
            Change to Login
          </Button>
        </Box>
      </form>
    </div>
  );
}
