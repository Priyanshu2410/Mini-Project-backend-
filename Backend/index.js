const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Register = require("./models/register.models");
const crypto = require("crypto");
const session = require("express-session");

const app = express();
app.use(express.json());
app.use(cors());
// const sessionSecret = crypto.randomBytes(32).toString('hex');
// app.use(session({
//   secret: sessionSecret,
//   resave: false,
//   saveUninitialized: true,
// }));
// mongoose
//   .connect("mongodb://127.0.0.1:27017/MiniProject")
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const URL =
  "mongodb+srv://patelpriysnshu2410:Patel2410@cluster0.jj6ielk.mongodb.net";
mongoose.connect(URL);
const conn = mongoose.connection;
conn.once("open", () => {
  console.log("Connected to MongoDB");
});
conn.on("error", (error) => {
  console.log(error);
});

app.post("/register", async (req, res) => {
  try {
    // Check if the email already exists in the database
    const existingUser = await Register.findOne({ email: req.body.email });

    if (existingUser) {
      // If the email is already registered, send an error response
      return res.status(400).json({ error: "Email already registered" });
    }

    // If the email is not registered, create a new registration
    const newUser = await Register.create(req.body);
    res.json(newUser);
  } catch (error) {
    // Handle other errors that might occur during registration
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Register.findOne({ email: email });

    if (user) {
      if (user.password === password) {
        // req.session.user = user; // Store user data in session
        // console.log("Login Successful and data stored in session");
        res.json(user).status(200);
      } else {
        res.json("Invalid Credentials");
      }
    } else {
      res.json("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

app.get("http://localhost:5000/get-user", (req, res) => {
  // const user = req.session.user;
  // console.log("Request to /api/get-user received");
  console.log(user);
  if (user) {
    res.json(user).status(200);
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

app.put("/  update-profile/:email",async(req, resp) => {
  const email = req.params.email
  const { first_name, last_name, number, gender, collage, department } =
    req.body;

    const user = await Register.findOneAndUpdate({
      email:email
    },{
      firstName:first_name,
      lastName:last_name,
      phone:number,
      gender:gender,
      college:collage,
      dep:department
    })

    const response = await Register.findOne({
      email:email
    })

    resp.json(response)
});

require("./models/coures.models.js");
const Course = mongoose.model("course");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/src/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });
app.post("/addcourse", upload.single("image"), async (req, res) => {
  const {
    name,
    category,
    description,
    coordinatorEmail,
    coordinatorDept,
    coordinatorClg,
  } = req.body;
  const imageName = req.file.filename;

  try {
    await Course.create({
      name: name,
      category: category,
      description: description,
      image: imageName,
      coordinatorEmail: coordinatorEmail,
      coordinatorDept: coordinatorDept, // Store coordinator's department
      coordinatorClg: coordinatorClg, // Store coordinator's department
    });

    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: error.message || "Error adding course" });
  }
});

const VideoItem = require("./models/videoitem.model");
app.post("/addvideo", upload.single("video"), async (req, res) => {
  const { name, description, courseID, youtubeLink } = req.body;
  // const videoName = req.file.filename;

  try {
    await VideoItem.create({
      title: name,
      description: description,
      youtubeLink: youtubeLink,
      courseID: courseID,
    });

    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: error.message || "Error adding video" });
  }
});

app.get("/getcourse", async (req, res) => {
  const { email } = req.query;
  console.log("Received Email:", email);

  try {
    const courses = await Course.find({ coordinatorEmail: email });
    res.send({ status: "ok", data: courses });
  } catch (error) {
    res.json({ status: error });
    console.log(error);
  }
});

app.get("/getvideo", async (req, res) => {
  const { courseID } = req.query;
  console.log("Received Course ID:", courseID);

  try {
    const videos = await VideoItem.find({ courseID: courseID });
    console.log(videos);
    res.send({ status: "ok", data: videos });
  } catch (error) {
    res.json({ status: error.message });
    console.log(error);
  }
});

app.get("/getusercourse", async (req, res) => {
  const { coordinatorDept, coordinatorClg } = req.query;
  console.log("Received Coordinator Department:", coordinatorDept);
  console.log("Received Coordinator College:", coordinatorClg);

  try {
    const courses = await Course.find({
      coordinatorDept: coordinatorDept,
      coordinatorClg: coordinatorClg,
    });
    res.send({ status: "ok", data: courses });
  } catch (error) {
    res.json({ status: error.message });
    console.log(error);
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
