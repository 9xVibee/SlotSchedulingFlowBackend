import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router as patentRouter } from "./routes/patient";
import { router as adminRouter } from "./routes/admin";
import { router as physioRouter } from "./routes/physio";
import { getAllSlots } from "./controllers";

const app = express();
const PORT = 3000;

// middleware
dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

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
