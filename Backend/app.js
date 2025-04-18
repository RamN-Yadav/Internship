const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const dotenv = require("dotenv");
const connectDB = require("./src/Db/config");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const opportunityRoutes = require("./src/routes/opportunityRoutes");
const submissionRoutes = require("./src/routes/submissionRoutes");
const notificationRoutes = require("./src/routes/notificationRoutes");
const Notification = require("./src/models/Notification");
const cors = require("cors");
const nodemailer = require("nodemailer");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

connectDB();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465,
  auth: {
    user:"aryany489@gmail.com",  // Set in .env
    pass:"ram1234567890",  // Set in .env
  },
});

// Function to send emails
const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from:"ramcsitjob89@gmail.com",
      to:"dbsinghyadav95@gmail.com",
      subject:"Hello ",
      text:"Hello this is a text mail",
    });
    console.log("Email sent:", info.response);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// WebSocket connection
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Listen for submission deadline updates from admin
  socket.on("updateDeadline", async (data) => {
    console.log("New deadline update received:", data);

    // Save notification to the database
    const notification = new Notification({
      userId: data.userId,
      message: `Deadline updated: ${data.deadline}`,
      deadline: data.deadline,
    });
    await notification.save();

    // Send email notification
    await sendEmail(
      "recipient@example.com", 
      "Deadline Updated", 
      `New deadline: ${data.deadline}`
    );

    io.emit("deadlineUpdated", data); // Broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/notifications", notificationRoutes);

app.use("/uploads", express.static("public/uploads"));
app.get("/", (req, res) => {
  res.send("Server is running...");
});
// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || "Server Error" });
});

const PORT = process.env.PORT || 7000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));