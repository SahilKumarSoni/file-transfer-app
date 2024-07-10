const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const fileHandler = require('./fileHandler');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Serve a simple message for the root URL
app.get('/', (req, res) => {
  res.send('File Transfer Server is running.');
});

// Endpoint to get list of uploaded files
app.get('/files', (req, res) => {
  const uploadsDir = path.join(__dirname, 'uploads');
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to scan files' });
    }
    res.json(files);
  });
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('file-upload', (data) => {
    fileHandler.handleFileUpload(data, socket);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
