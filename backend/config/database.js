const mongoose = require("mongoose");

const dbUrl =
  "mongodb+srv://egathered:mansanita15@cluster0.pepomdf.mongodb.net/";

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexión exitosa a la base de datos");
  } catch (error) {
    console.error("Error de conexión a la base de datos:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
