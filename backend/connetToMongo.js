const mongoose = require("mongoose");

const connection = async () => {
    try {
        await mongoose.connect("mongodb+srv://Santhosh:Santhosh%40123@cluster0.antok5k.mongodb.net/Travel_App?retryWrites=true&w=majority");
        console.log("Connection Successfull");
    } catch (error) {
        console.log("MongoDB Connection Error: ", error.message);
    }
};

module.exports = connection;
