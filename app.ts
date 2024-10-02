require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();

import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";

import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import notificationRouter from "./routes/notification.route";
import analyticsRouter from "./routes/analytics.route";
import layoutRouter from "./routes/layout.route";

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());

// CORS configuration
app.use(
  cors({
    origin: ["https://fe-lms-vert.vercel.app"], // Thêm giao thức https
    credentials: true, // Đảm bảo gửi cookie cùng với yêu cầu
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Cho phép các phương thức HTTP
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"] // Headers được cho phép
  })
);

// Đảm bảo rằng các yêu cầu OPTIONS được xử lý
app.options("*", cors());

// routes
app.use(
  "/api/v1",
  userRouter,
  courseRouter,
  orderRouter,
  notificationRouter,
  analyticsRouter,
  layoutRouter
);

// testing API
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working"
  });
});

// Handle unknown routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Middleware for handling errors
app.use(ErrorMiddleware);
