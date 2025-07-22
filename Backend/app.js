const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
const authRouter = require('./routes/auth');
const skillRouter = require('./routes/skills');
const friendsRouter = require('./routes/friends');
const http = require("http");
const { Server } = require("socket.io");
// const messageRouter = require('./routes/messages');
const videoRoutes = require('./routes/videos');

dotenv.config();
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error(" MongoDB error:", err));

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 24 * 60 * 60, // 1 day
  }),
  cookie: {
    httpOnly: true,
    secure: false, // ❗ true only in HTTPS (production)
    maxAge: 24 * 60 * 60 * 1000,
  }
}));
const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     credentials: true,
//   },
// });

// let onlineUsers = {};

// io.on("connection", (socket) => {
//   //console.log("Socket connected", socket.id);

//   socket.on("add-user", (userId) => {
//     onlineUsers[userId] = socket.id;
//   });

//   socket.on("send-msg", ({ to, from, message }) => {
//     const receiverSocket = onlineUsers[to];
//     const senderSocket = onlineUsers[from];

//     // Send to receiver
//     if (receiverSocket) {
//       io.to(receiverSocket).emit("msg-receive", { from, message });
//     }

//     // Echo back to sender (this is critical!)
//     if (senderSocket) {
//       io.to(senderSocket).emit("msg-receive", { from, message });
//     }
//   });
// });

// Routes

app.use("/api/auth", authRouter);
app.use("/api/skills", skillRouter);
app.use("/api/friends", friendsRouter);
// app.use("/api/messages", messageRouter);
app.use('/api/videos', videoRoutes);

app.get("/", (req, res) => {
  res.send("SkillBridge API Running");
});

// Server listen
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));

