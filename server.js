const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const items = require("./routes/api/items");

// initialize express
const app = express();

// Body Parser Middleware
app.use(bodyParser.json());

//  DB config
const db = require("./config/keys").mongoURI;

// Connect to mongo via mongoose
// Promise based
mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

// Use routes
// 'starting' endpoint
app.use("/api/items", items);

// env used to later possible connect with HEROKU
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
