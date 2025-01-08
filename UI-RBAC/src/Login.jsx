import React, { useState } from "react";
import { auth } from "./firebase"; // Import initialized auth instance
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Modular import
import { useNavigate } from "react-router-dom";
import "./App.css";
import {
  Card,
  CardContent,
  colors,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import BasicDetailsForm from "./Pages/BasicForm";

const FormControlLabelStyle = {
  margin: "0px", // Space between options
  backgroundColor: "#fff",
  background: "#e9ebee",
  borderRadius: "1px",
  padding: "8px 18px",
  width: "50%",
  transition: "all 0.3s",
  "& .MuiRadio-root": {
    display: "none", // Hide the circular default radio button
  },
  "&:has(.Mui-checked)": {
    backgroundColor: "#fff", //#a1d2e3
    borderTop: "3px solid #7dafd4",
    color: "black",
    width: "50%",
  },
};

const Login = () => {
  const navigate = useNavigate();
  const [radioValue, setRadioValue] = useState("Sign In");
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider(); // Initialize GoogleAuthProvider
    try {
      const result = await signInWithPopup(auth, provider); // Perform login with popup
      console.log("User:", result.user); // Log user information
      navigate("/chat");
    } catch (error) {
      console.error("Error during Google Login:", error.message);
    }
  };
  const handleRadioValue = e => {
    setRadioValue(e.target.value);
    console.log(e.target.value);
  };
  console.log(radioValue);
  return (
    <>
      <div className="video-container">
        <video id="background-video" autoPlay muted loop>
          <source src="./BackGroundVideo.mp4" type="video/mp4" />
        </video>

        <h2 style={{ textAlign: "center", marginTop: "1rem" }}>
          Welcome to App
        </h2>
        <Card
          className="content"
          style={{
            background: "#fff",
            maxWidth: 400,
            margin: "20px auto",
            padding: "10px",
            width: "36em",
            height: "28em",
            overflow: "auto",
          }}
        >
          <Typography>Please Login To Continue</Typography>
          <CardContent
            style={{
              border: "2px solid #e9ebee ",
              paddingTop: "0px",
              paddingLeft: "0em",
              paddingRight: "0em",
              width: "100%",
            }}
          >
            <RadioGroup
              row
              value={radioValue}
              onChange={handleRadioValue}
              // style={{ border: "2px solid red" }}
              sx={{
                display: "flex",
                justifyContent: "center", // Centers the radio group horizontally
                maxWidth: "100%",
                // background: "yellow",
              }}
            >
              <FormControlLabel
                value={"Sign In"}
                control={<Radio sx={{ display: "none", padding: "0" }} />}
                label={"Sign In"}
                sx={{ ...FormControlLabelStyle, marginRight: 0, marginLeft: 0 }}
                // style={{ border: "2px solid blue" }}
              />
              <FormControlLabel
                value={"Sign Up"}
                control={<Radio sx={{ display: "none", padding: "0" }} />}
                label={"Sign Up"}
                sx={{ ...FormControlLabelStyle, marginRight: 0, marginLeft: 0 }}
                // style={{ border: "2px solid blue" }}
              />
            </RadioGroup>
            <BasicDetailsForm radioValue={radioValue} />
            <div
              className="socialDivider"
              sx={{ marginTop: "1em", marginBottom: "1em" }}
            >
              <span>or</span>
            </div>
            <button onClick={handleGoogleLogin} style={{ margin: "0px" }}>
              {/* Login with Google */}
              <img src="src/assets/googleIcon.png" alt="icon" />
            </button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;
