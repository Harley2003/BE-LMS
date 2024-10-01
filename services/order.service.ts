import { NextFunction, Response } from "express";
import { CatchAsyncError } from "./../middleware/catchAsyncErrors";
import OrderModel from "../models/order.model";

// create order
export const newOrder = CatchAsyncError(
  async (data: any, res: Response, next: NextFunction) => {
    const order = await OrderModel.create(data);
    res.status(201).json({
      success: true,
      order
    });
  }
);

// get all order
export const getAllOrderServices = async (res: Response) => {
  const orders = await OrderModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    orders
  });
};
