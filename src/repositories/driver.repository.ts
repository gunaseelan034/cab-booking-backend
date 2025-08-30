import type { Request } from "express";
import prisma from "../database/connection";

class DriverRepository {
	async getAll() {
		return prisma.driverAccount.findMany({
			include: {
				user: true,
			},
		});
	}
	async create(data: Request["body"]) {
		return prisma.driverAccount.create({
			data,
		});
	}
	async getDriverBookings({ driverId }: { driverId: number }) {
		return prisma.booking.findMany({ where: { driverId } });
	}
	async updateDriverBooking({ bookingId, data }: { bookingId: number; data: object }) {
		return prisma.booking.update({
			where: { id: bookingId },
			data,
		});
	}
}

export default DriverRepository;
