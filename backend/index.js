require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const cors = require("cors")

// express app
const app = express();

app.use(
  cors({
    origin: ["https://deploy-mern.vercel.app"],
    methods: "*",
    credentials: true,
  })
);

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect("mongodb+srv://hunnyarora2002:pHjpmNux3dsFhMs6@cluster0.jxbhztg.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("listening on port, ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

  module.exports = app;
