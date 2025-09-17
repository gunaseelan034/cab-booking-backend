import type { Request } from "express";
import prisma from "../database/connection";

class BookingRepository {
	async getAll(params: Request["query"]) {
		return prisma.booking.findMany({
			where: {
				...params,
				id: params?.id ? Number(params.id) : undefined,
			},
			include: {
				rider: {
					omit: { userId: true },
					include: { user: true },
				},
				driver: {
					omit: { userId: true },
					include: { user: true },
				},
			},
			omit: {
				driverId: true,
				riderId: true,
			},
		});
	}

	async getById(id: number) {
		return prisma.booking.findUnique({
			where: { id },
		});
	}
}

export default BookingRepository;
