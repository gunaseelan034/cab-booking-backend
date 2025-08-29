import type { Request } from "express";
import prisma from "../database/connection";
import { BookingState } from "../states/booking-states";

class RiderRepository {
	async getAll() {
		return prisma.riderAccount.findMany({
			include: {
				user: true,
			},
		});
	}

	async create(data: Request["body"]) {
		return prisma.riderAccount.create({
			data,
		});
	}

	async getRiderBookings({ riderId }: { riderId: string }) {
		return prisma.booking.findMany({
			include: { rider: true },
			where: { riderId: Number(riderId) },
		});
	}

	async createRiderBooking(data: Request["body"]) {
		return prisma.booking.create({
			data: {
				riderId: Number(data.riderId),
				state: BookingState.PENDING_APPROVAL,
			},
		});
	}
}

export default RiderRepository;
