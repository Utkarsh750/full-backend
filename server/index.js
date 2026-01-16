import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import userRouter from "./routes/user.js";
import todoRouter from "./routes/todo.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Redis } from "ioredis";
import axios from "axios";

dotenv.config();

const app = express();

const redisClient = new Redis();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/post", async (req, res) => {
  try {
    const cachedData = await redisClient.get("posts");
    if (cachedData !== null) {
      return res.json(JSON.parse(cachedData));
    } else {
      const { data } = await axios(
        "https://jsonplaceholder.typicode.com/posts"
      );
      await redisClient.set("posts", JSON.stringify(data));
      return res.json(data);
    }
  } catch (error) {
    console.log(error);
  }
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
