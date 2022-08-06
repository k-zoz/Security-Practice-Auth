require("dotenv").config();
require("express-async-errors");

//express
const express = require("express");
const app = express();

//security pacakages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

//cache
const apicache = require("apicache");
const cache = apicache.middleware;

//routes
const authRouter = require("./v1/routes/auth");
const jobsRoute = require("./v1/routes/jobs");

//database
const connectDB = require("./db/connect");

//middlewares
const notFound = require("./middlewares/not-found");
const errorHandler = require("./middlewares/error-handler");
const authMiddleWare = require("./middlewares/authMiddleware");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100, //limit each IP to 100 requests per windowMS
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
// app.use(cache("2 minutes"))

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authMiddleWare, jobsRoute);

//middlewareUsage;
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(
        "Server is connected to the database and listening on port 3000...."
      )
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
