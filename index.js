import { config } from "dotenv";
config();
import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/User-Role-Permission");
import express from "express";
const app = express();
app.use(express.static("public"));
app.use(express.json());
import authRoutes from "../role-permission/routes/authRoutes.js";
import adminRoutes from '../role-permission/routes/adminRoutes.js'
app.use("/", authRoutes);
app.use('/admin',adminRoutes)
const port = process.env.SERVER_PORT | 3000;

app.listen(port, () => {
  console.log(`app is running on Port ${port}`);
});
