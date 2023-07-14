const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { routeNotFound, errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/database");
const productRoutes = require("./routes/productRoutes");
const app = express();

//db config
dotenv.config({ path: "backend/config/.env" });
connectDB();

//middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.use("/api/product", productRoutes);

//a route for checking if api is running
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

//error handling
app.use(errorHandler);
app.use("/*", routeNotFound);

const PORT = process.env.PORT;
const server = app.listen(PORT, console.log(`Server Started on port ${PORT}`));
