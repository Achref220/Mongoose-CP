const express = require('express');
const route = require('./routes/P_route')
const app = express();
const port = 3500;
//middleware bodyparser
app.use(express.json());
//connect database
const connectDB = require('./config/connectDB');
connectDB();
app.use(route)

app.listen(port, (err) =>
  err ? console.error(err) : console.log(`this server is running on ${port}`)
);