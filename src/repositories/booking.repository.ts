import prisma from "../database/connection";

class BookingRepository {
	async getAll() {
		return prisma.booking.findMany({
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
}

export default BookingRepository;
