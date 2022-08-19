const express = require("express");
// const cron = require('node-cron')
const cleanDbTask = require('./tasks/cleanDbTask')
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use(cors());
app.use(require("./routes/record"));
app.use(express.json());



// get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
    // perform a database connection when server starts
    dbo.connectToServer(function (err) {
        if (err) console.error(err);

    });
    console.log(`Server is running on port: ${port}`);
});

// cron.schedule('*/50 * * * *', cleanDbTask)

