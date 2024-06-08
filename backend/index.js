const connection = require('./connetToMongo');

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require('./models/FormData');
const path = require('path');
const UploadRoute = require("./routes/UploadRoute");

const app = express();
const dirname = path.resolve();
app.use(express.json());
app.use(cors());
app.use(UploadRoute);

app.use(express.static(path.join(dirname, "../frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(dirname, "../frontend/dist/index.html"));
});

// Define a basic GET route for the server root
app.get('/', (req, res) => {
    res.send("Server is running");
});


app.post('/register', (req, res) => {
    const { email, password } = req.body;
    FormDataModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json("Already registered")
            }
            else {
                FormDataModel.create(req.body)
                    .then(log_reg_form => res.json(log_reg_form))
                    .catch(err => res.json(err))
            }
        })
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    FormDataModel.findOne({ email: email })
        .then(user => {
            if (user) {
                // If user found then these 2 cases
                if (user.password === password) {
                    res.json("Success");
                }
                else {
                    res.json("Wrong password");
                }
            }
            // If user not found then 
            else {
                res.json("No records found! ");
            }
        })
});

app.listen(3000, () => {
    connection();
    console.log("Server listining on http://127.0.0.1:3000");
});
