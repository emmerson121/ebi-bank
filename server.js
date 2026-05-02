require('dotenv').config();
const express = require('express');
const connectToDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')

const app = express();
const PORT = process.env.PORT

app.use(express.json());

//connect to database
connectToDB();

app.use("/api/auth", authRoutes)
// app.use("/api/transactions", require("./routes/transactionRoutes"));

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
    
})