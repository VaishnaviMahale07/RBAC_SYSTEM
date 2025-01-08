import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { alignProperty } from "@mui/material/styles/cssUtils";

const formStyle = {
  "& .MuiInputBase-root": { height: "2em" },
  "& .MuiInputLabel-root": {
    top: "50%", // Centers label vertically
    left: "5%",
    transform: "translateY(-50%)",
    // fontSize: "1rem", // Default font size for centered label
    transition: "all 0.2s ease-in-out", // Smooth transition
  },
  "& .MuiInputLabel-shrink": {
    top: 0, // Label moves to the top
    transform: "translateY(-50%)", // Adjust for correct top position
    fontSize: "0.75rem", // Smaller font size on focus
  },
};

function BasicDetailsForm({ radioValue }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const disableFiled = radioValue === "Sign Up";

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = event => {
    event.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Form submitted successfully!");
    // Reset the form (optional)
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    });
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* <Typography variant="h4" align="center" gutterBottom>
          Basic Details Form
        </Typography> */}

        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          autoComplete="off"
          fullWidth
          required
          sx={{ ...formStyle, display: disableFiled ? "block" : "none" }}
        />

        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          autoComplete="off"
          fullWidth
          required
          sx={{ ...formStyle, display: disableFiled ? "block" : "none" }}
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          autoComplete="off"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          sx={formStyle}
        />

        <TextField
          label="Phone Number"
          name="phone"
          type="tel"
          autoComplete="off"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          required
          sx={{ ...formStyle, display: disableFiled ? "block" : "none" }}
        />
        <TextField
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="off"
          fullWidth
          required
          sx={formStyle}
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          value={formData.password}
          autoComplete="off"
          onChange={handleChange}
          fullWidth
          required
          sx={{ ...formStyle, display: disableFiled ? "block" : "none" }}
        />

        <Button
          type="submit"
          variant="contained"
          style={{ background: "#63a9db" }}
          fullWidth
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
}

export default BasicDetailsForm;
