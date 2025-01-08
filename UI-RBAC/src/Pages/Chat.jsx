import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Replace with your server URL

const Chat = () => {
  const [username, setUsername] = useState(""); // User name
  const [message, setMessage] = useState(""); // Message input
  const [chat, setChat] = useState([]); // Chat history
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state

  useEffect(() => {
    // Listen for incoming messages
    socket.on("receiveMessage", data => {
      setChat(prevChat => [...prevChat, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const data = { user: username, text: message }; // Include username in message
      socket.emit("sendMessage", data); // Send message to server
      setMessage(""); // Clear input
    }
  };

  return (
    <div className="chatBackground">
      <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
        {!isLoggedIn ? (
          <Paper sx={{ padding: 3, textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
              Welcome to the Chat Room
            </Typography>
            <TextField
              label="Enter your name"
              value={username}
              onChange={e => setUsername(e.target.value)}
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsLoggedIn(!!username.trim())} // Login only if username is entered
              fullWidth
              disabled={!username.trim()}
            >
              Join Chat
            </Button>
          </Paper>
        ) : (
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
              Chat Room
            </Typography>

            {/* Chat History */}
            <Paper
              sx={{
                height: "400px",
                overflowY: "auto",
                padding: 2,
                backgroundColor: "#f9f9f9",
                marginBottom: 2,
                border: "1px solid #ddd",
              }}
            >
              <List>
                {chat.length > 0 ? (
                  chat.map((msg, index) => (
                    <Box key={index}>
                      <ListItem>
                        <ListItemText
                          primary={msg.text}
                          secondary={`Sent by: ${msg.user}`}
                          sx={{
                            ".MuiListItemText-secondary": { color: "#777" },
                          }}
                        />
                      </ListItem>
                      <Divider />
                    </Box>
                  ))
                ) : (
                  <Typography color="textSecondary" align="center">
                    No messages yet. Be the first to say something!
                  </Typography>
                )}
              </List>
            </Paper>

            {/* Message Input */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Type your message..."
                variant="outlined"
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                onClick={sendMessage}
                disabled={!message.trim()}
              >
                Send
              </Button>
            </Box>
          </Paper>
        )}
      </Box>
    </div>
  );
};

export default Chat;
