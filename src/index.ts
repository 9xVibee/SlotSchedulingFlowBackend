import express from "express";
import dotenv from "dotenv";
import { router as patentRouter } from "./routes/patient";
import { router as adminRouter } from "./routes/admin";
import { router as physioRouter } from "./routes/physio";
import { getAllSlots } from "./controllers";
import cors from "cors";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

const PORT = 3000;

// middleware
dotenv.config();
app.use(express.json());

// routing
app.use("/api/patient", patentRouter);
app.use("/api/admin", adminRouter);
app.use("/api/physio", physioRouter);

app.get("/", (req, res) => {
  res.send("<h1>Hello From Abhay</h1>");
});

app.use("/api/slots", getAllSlots);

app.listen(PORT, () => {
  console.log(`Server Started at port ${PORT}`);
});
