const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(`mongodb://localhost:27017/prince?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log(
    `Mongo database connected on ${conn.connection.host}`
  );
};

module.exports = connectDB;
