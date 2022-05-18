import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import { useNavigate } from "react-router-dom";

export function ForgotPassword() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
  });
  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //Send request to the back-end
  const sendRequest = async () => {
    const res = await axios
      .post(
        `https://password-reset-flow-app.herokuapp.com/user/forgot-password`,
        {
          email: input.email,
        }
      )
      .catch((err) => console.log(err));

    const data = await res.data;

    reactLocalStorage.set("id", true);
    reactLocalStorage.set("id", true);
    reactLocalStorage.get("userId", true);
    reactLocalStorage.set("userId", true);
    reactLocalStorage.setObject("id", { _id: data.otp._id });
    reactLocalStorage.setObject("userId", { _id: data._id });
    navigate(`/verify-otp`);
    return data;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    await sendRequest();
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
          <Typography variant="h4" padding={0} marginTop={3} textAlign="center">
            Forgot Password
          </Typography>

          <TextField
            onChange={handleChange}
            value={input.email}
            name="email"
            type="email"
            variant="outlined"
            margin="normal"
            label="Enter email"
            helperText=" We'll send a link to reset your password."
          />

          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 2 }}
            color="warning"
            variant="contained"
          >
            Enter
          </Button>
        </Box>
      </form>
    </div>
  );
}

//Verify OTP
export function VerifyOtp() {
  const navigate = useNavigate();
  const [inputs, setinputs] = useState({
    OTP: "",
  });
  const handleChange = (e) => {
    setinputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //Send request to the back-end
  const sendRequest = async () => {
    reactLocalStorage.get("id", true);
    reactLocalStorage.get("userId", true);
    const res = await axios
      .post(
        `https://password-reset-flow-app.herokuapp.com/user/verify-email/${
          reactLocalStorage.getObject("id")._id
        }`,
        {
          OTP: inputs.OTP,
        }
      )
      .catch((err) => alert(err.response.data.message));

    const data = await res.data;
    alert(data.message);
    return data;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    await sendRequest();
    navigate(`/reset-password/${reactLocalStorage.getObject("userId")._id}`);
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
          <Typography variant="h4" padding={0} marginTop={3} textAlign="center">
            Email Verification
          </Typography>
          <TextField
            onChange={handleChange}
            value={inputs.OTP}
            name="OTP"
            type="text"
            variant="outlined"
            margin="normal"
            label="OTP"
            helperText="Enter the 6 digit OTP sent to your email address"
          />

          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 2 }}
            color="warning"
            variant="contained"
          >
            Enter
          </Button>
        </Box>
      </form>
    </div>
  );
}
