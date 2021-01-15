const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//setup express

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`The server has started on port : ${PORT}`)); //port

//setup mongoose

console.log(process.env.MONGODB_CONNECTION_STRING);
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}, (err) => {
   if(err) throw err;
   console.log("MongoDB connection established"); 
});

//setup routes

app.use("/users", require("./routes/userRouter"));
app.use("/admin", require("./routes/adminRouter"));