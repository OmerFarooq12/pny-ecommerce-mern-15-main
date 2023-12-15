const express = require("express");
const app = express();
const bodyParser = require('body-parser')
require('dotenv').config()
require('./db/db')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

const authRoutes = require('./routes/auth')

//routes
app.use("/", authRoutes);

app.listen(process.env.PORT, () => {
    console.log('Server started on port 8000')
});
