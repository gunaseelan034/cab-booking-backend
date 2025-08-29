import type { Request, Response } from "express";
import { BookingRepository } from "../repositories";
import { BookingService } from "../services";

const bookingService = new BookingService(new BookingRepository());

export const getAllBookings = async (req: Request, res: Response) => {
	await bookingService.getAllBookings(req, res);
};
