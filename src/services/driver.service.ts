// biome-ignore assist/source/organizeImports: <explanation>
import type { Request, Response } from "express";
import {
	type BookingRequestState,
	DRIVER_BOOKING_STATE_MAP,
} from "../states/booking-states";
import { DRIVER_ERRORS } from "../constants/errors";
import {
	BookingRepository,
	type DriverRepository,
} from "../repositories";
import { getWorkflowById } from "../utils/workflow";
import { BookingWorkflowSignalTypes } from "../workflows/booking.workflows";

const bookingRepository = new BookingRepository();

class DriverService {
	constructor(private driverRepository: DriverRepository) {}

	async getAllDrivers(_req: Request, res: Response) {
		try {
			const data = await this.driverRepository.getAll();
			res.json({ data });
		} catch (error) {
			res.json({
				message: "Error fetching users",
				error,
			});
		}
	}

	async createDriver(req: Request, res: Response) {
		try {
			const data = await this.driverRepository.create(
				req.body ?? {},
			);
			res.json(data);
		} catch (error) {
			res.json({
				message: "Error while creating user",
				error,
			});
		}
	}

	async getDriverBooking(req: Request, res: Response) {
		try {
			const data =
				await this.driverRepository.getDriverBookings({
					driverId: Number(req.params.id),
				});
			res.json({ data });
		} catch (error) {
			res.json({
				message: "Error fetching users",
				error,
			});
		}
	}

	async driverBookingActions(req: Request, res: Response) {
		const requestedState: BookingRequestState =
			req?.body?.requestType;

		if (!DRIVER_BOOKING_STATE_MAP[requestedState]) {
			res.json({
				message: "Error when booking action",
				error: DRIVER_ERRORS.INVALID_ACTION_REQUEST,
			});
		}

		const driverId = Number(req.params.id),
			bookingId = Number(req.params.bookingId);

		try {
			const bookingDetails =
				await bookingRepository.getById(bookingId);

			const workflow = await getWorkflowById(
				bookingDetails?.workflowId as string,
			);

			if (!workflow) {
				res.json({
					message: "Error when booking action",
					error: DRIVER_ERRORS.INVALID_BOOKING,
				});
			};

			workflow.signal(BookingWorkflowSignalTypes.DRIVER_ACCEPTED, driverId);

			const data =
				await this.driverRepository.updateDriverBooking({
					bookingId,
					data: {
						state: DRIVER_BOOKING_STATE_MAP[requestedState],
						driverId,
					},
				});
			res.json({ data });
		} catch (error) {
			res.json({
				message: "Error when booking action",
				error,
			});
		}
	}
}

export default DriverService;
