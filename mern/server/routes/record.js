const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
// This will help us connect to the database
const dbo = require("../db/conn");
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.route("/drops").get(function (req, res) {
    let db_connect = dbo.getDb("db");
    db_connect
        .collection("drops")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you get a single record by id
recordRoutes.route("/drops/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("drops")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you create a new record.
recordRoutes.route("/drops/add/:time").post(function (req, response) {
    let db_connect = dbo.getDb();
    const date = Date.now()
    const time = req.params.time
    let myobj = {
        key: req.body.key,
        input: req.body.input,
        inputType: req.body.inputType,
        password: req.body.password,
        email: req.body.email,
        ["createdOn" + time]: new Date(date)
    };
    db_connect.collection("drops").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});


// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            key: req.body.key,
            input: req.body.input,
            inputType: req.body.inputType
        },
    };
    db_connect
        .collection("drops")
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("drops").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});


// This section will help you delete a record
recordRoutes.route("/delete/:key").delete((req, response) => {
    let db_connect = dbo.getDb();
    console.log(req.params)
    let myquery = { key: req.params.key };
    db_connect.collection("drops").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

//routes for signup/login are below

// This section will help you get a single record by id
recordRoutes.route("/users/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: req.params.id };
    db_connect
        .collection("users")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you create a new record.
recordRoutes.route("/users/add/:email").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        _id: req.body.email,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    db_connect.collection("users").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});


// This section will help you update a record by id.
recordRoutes.route("/updateUser/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            password: req.body.password,
        },
    };
    db_connect
        .collection("users")
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});

module.exports = recordRoutes;