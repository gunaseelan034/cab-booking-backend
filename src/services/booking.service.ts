import type { Request, Response } from "express";
import type { BookingRepository } from "../repositories";

class BookingService {
	constructor(private bookingRepository: BookingRepository) {}

	async getAllBookings(_req: Request, res: Response) {
		try {
			const data = await this.bookingRepository.getAll();
			res.json({ data });
		} catch (error) {
			res.json({
				message: "Error fetching bookings",
				error,
			});
		}
	}
}

export default BookingService;
