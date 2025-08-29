import type { Request, Response } from "express";
import type { UserRepository } from "../repositories";

class UserService {
	constructor(private userRepository: UserRepository) {}

	async getAllUsers(_req: Request, res: Response) {
		try {
			const data = await this.userRepository.getAll();
			res.json({ data });
		} catch (error) {
			res.json({ message: "Error fetching users", error });
		}
	}

	async createUser(req: Request, res: Response) {
		try {
			const data = await this.userRepository.create(req.body ?? {});
			res.json(data);
		} catch (error) {
			res.json({
				message: "Error while creating user",
				error,
			});
		}
	}
}

export default UserService;
