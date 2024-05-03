// Create web server
const express = require('express');
const app = express();
// Create server
const server = require('http').createServer(app);
// Create socket.io
const io = require('socket.io')(server);
// Create comments array
const comments = [];
// When user connects
io.on('connection', (socket) => {
  console.log('User connected');
  // Send comments to user
  socket.emit('comments', comments);
  // When user disconnects
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
  // When user posts a comment
  socket.on('postComment', (comment) => {
    comments.push(comment);
    // Send new comments to all users
    io.emit('comments', comments);
  });
});
// Listen on port 3000
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
// Path: index.html
<!DOCTYPE html>
<html>
<head>
  <title>Comments</title>
  <script src="https://cdn.socket.io/socket.io-3.0.1.min.js"></script>
  <script>
    const socket = io('http://localhost:3000');
    socket.on('comments', (comments) => {
      document.getElementById('comments').innerHTML = comments
        .map(comment => `<li>${comment}</li>`)
        .join('');
    });
    function postComment() {
      const comment = document.getElementById('comment').value;
      socket.emit('postComment', comment);
      document.getElementById('comment').value = '';
    }
  </script>
</head>
<body>
  <ul id="comments"></ul>
  <input type="text" id="comment" placeholder="Enter your comment">
  <button onclick="postComment()">Post</button>
</body>
</html>