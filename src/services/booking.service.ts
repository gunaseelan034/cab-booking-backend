import type { Request, Response } from "express";
import type { BookingRepository } from "../repositories";

class BookingService {
	constructor(
		private bookingRepository: BookingRepository,
	) {}

	async getAllBookings(req: Request, res: Response) {
		const { query } = req;
		try {
			const data = await this.bookingRepository.getAll(query);
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
