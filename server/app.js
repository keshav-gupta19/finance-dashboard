const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const mongoose = require("mongoose");
const kpiRoutes = require("./routes/kpis");
const app = express();
const ProductsRoutes = require("./routes/productRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("common"));
app.use(cors());
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Failed to connect to Database", error);
  }
};

connectDB();
app.use("/kpi", kpiRoutes);
app.use("/product", ProductsRoutes);
app.use("/transaction", transactionRoutes);
app.listen(process.env.PORT, async () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
