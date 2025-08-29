import type { Request } from "express";
import prisma from "../database/connection";

class UserRepository {
	async getAll() {
		return prisma.user.findMany({
			include: {
				driverAccount: true,
				riderAccount: true,
			},
		});
	}
	async create(data: Request["body"]) {
		return prisma.user.create({
			data,
		});
	}
}

export default UserRepository;
