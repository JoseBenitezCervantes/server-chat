const mongoose = require("mongoose");

const DBconection = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB CONECTADA");
  } catch (error) {
    console.log("🚀 ~ file: BD.js ~ line 11 ~ DBconection ~ error", error)
    process.exit(1);
  }
};

module.exports = DBconection;
