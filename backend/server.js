import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contact.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));


app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  console.log("Home page");
  res.send("Hi, this is home page");
});

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
