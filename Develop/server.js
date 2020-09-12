const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

// sets up the port to listen to
const PORT = process.env.PORT || 8080;

// initializes express
const app = express();
// bring in the morgan logger
app.use(logger("dev"));

// bring in middleware to parse the request body
app.use(express.urlencoded({ extended: true }));
// middleware to parse thr request json
app.use(express.json());

// middleware to serve static files like images, CSS and JavaScript files
app.use(express.static("public"));

// use mongoose to connect to database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
}).then(() => {
    console.log("MongoDB connected!");
}).catch(err => console.log(err));

// import in routes folder
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
