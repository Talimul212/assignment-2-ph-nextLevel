import { Request, Response } from 'express';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    const result = await OrderServices.createOrderIntoDB(orderData);

    res.status(201).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      message: err.message || 'Failed to create order',
      status: false,
      error: err,
    });
  }
};

const getRevenue = async (_req: Request, res: Response) => {
  try {
    const totalRevenue = await OrderServices.calculateRevenue();

    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: { totalRevenue },
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || 'Failed to calculate revenue',
      status: false,
      error: err,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getRevenue,
};