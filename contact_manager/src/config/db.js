const mongoose = require("mongoose");

const initializeDBAndServer = async (app) => {
  try {
    const MONGO_URI =
      process.env.NODE_ENV === "test"
        ? process.env.MONGO_URI_TEST
        : process.env.MONGO_URI;

    if (!MONGO_URI) {
      throw new Error("MongoDB URI is not defined");
    }

    await mongoose.connect(MONGO_URI);

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB Connection Error:", err);
      process.exit(1);
    });

    console.log("Database initialization is successful");

    const PORT = process.env.PORT || 3002;
    app.listen(PORT, () => {
      console.log(`Server started and listens on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Error while initializing the server: ", error.message);
    process.exit(1);
  }
};

module.exports = initializeDBAndServer;
