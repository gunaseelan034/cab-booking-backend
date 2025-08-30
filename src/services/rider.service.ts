import type { Request, Response } from "express";
import type { RiderRepository } from "../repositories";
import { bookingWorkflow } from "../workflows/booking.workflows";

class RiderService {
	constructor(private riderRepository: RiderRepository) {}

	async getAllRiders(_: Request, res: Response) {
		try {
			const data = await this.riderRepository.getAll();
			res.json({ data });
		} catch (error) {
			res.json({
				message: "Error fetching users",
				error,
			});
		}
	}

	async createRider(req: Request, res: Response) {
		try {
			const data = await this.riderRepository.create(req.body ?? {});
			res.json(data);
		} catch (error) {
			res.json({
				message: "Error while creating user",
				error,
			});
		}
	}

	async getRiderBookings(req: Request, res: Response) {
		try {
			const data = await this.riderRepository.getRiderBookings({
				riderId: req.params.id,
			});
			res.json({ data });
		} catch (error) {
			res.json({
				message: "Error while fetching bookings",
				error,
			});
		}
	}

	async createRiderBooking(req: Request, res: Response) {
		const riderId = Number(req.params.id);
		try {
			const workflowId = `booking-${riderId}-${Date.now()}`;

			const handle = await req.app.locals.workflowClient.start(
				bookingWorkflow,
				{
					args: [],
					taskQueue: "booking",
					workflowId,
				},
			);

			const data = await this.riderRepository.createRiderBooking({
				riderId,
				workflowId: handle.workflowId,
			});

			res.status(201).json({ data });
		} catch (error) {
			res.json({
				message: "Error while creating booking",
				error,
			});
		}
	}
}

export default RiderService;
