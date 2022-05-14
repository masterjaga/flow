import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import { useNavigate } from "react-router-dom";

export function ResetPassword() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [inputs, setInputs] = useState({
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //Send request to the back-end
  const sendRequest = async () => {
    const res = await axios
      .post(
        `https://password-reset-flow-app.herokuapp.com/user/reset-password/${id}`,
        {
          password: inputs.password,
          confirmPassword: inputs.confirmPassword,
        }
      )
      .catch((err) => alert(err.response.data.message));

    const data = await res.data;
    alert(data.message);
    navigate(`/login`);
    return data;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(inputs);
    await sendRequest();
    reactLocalStorage.remove("id");
    reactLocalStorage.remove("userId");
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
            Reset Password
          </Typography>

          <TextField
            onChange={handleChange}
            value={inputs.password}
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            label="password"
          />
          <TextField
            onChange={handleChange}
            value={inputs.confirmPassword}
            name="confirmPassword"
            type="Password"
            variant="outlined"
            margin="normal"
            label="confirmPassword"
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
