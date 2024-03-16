const mongoose = require('mongoose');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require('./models/UsersModel');

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with the origin of your React app
    credentials: true,
  })
);

const port = 8800;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

async function initializeDatabase() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/UpRankDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database initialization successful.");
  } catch (err) {
    console.error("Error initializing the database:", err);
  }
}

app.post('/createUser', async (req, res) => {
  try {
    // Extract only the fields that are present in your schema
    const {
      schoolname,
      address,
      schoolphone,
      schoolemail,
      classFrom,
      classTo,
      board,
      adminname,
      adminphone,
      planDuration,
      password,
      username,
    } = req.body;
    console.log(username);

    // Create a new user object with the extracted fields
    const newUser = new User({
      school: {
        name: schoolname,
        address: address,
        phone: schoolphone,
        email: schoolemail,
        class: { from: classFrom, to: classTo },
        board: board,
      },
      admin: { name: adminname, phone: adminphone },
      plan: { duration: planDuration },
      username: username,
      password: password,
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



(async () => {
    await initializeDatabase();
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })();