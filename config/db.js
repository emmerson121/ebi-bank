const mongoose = require('mongoose');

const connectToDB = async (res) => {
    try{
       await mongoose.connect(process.env.MONGO_URI)
       console.log('Database connected successfully');
       
    }catch(error){
        res.status(500).json(error.messsage);
        process.exit(1);
    }
}

module.exports = connectToDB;