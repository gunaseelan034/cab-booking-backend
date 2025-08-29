import type { Request, Response } from "express";
import { UserRepository } from "../repositories";
import { UserService } from "../services";

const userService = new UserService(new UserRepository());

export const getAllUsers = async (req: Request, res: Response) => {
	await userService.getAllUsers(req, res);
};

export const createUsers = async (req: Request, res: Response) => {
	await userService.createUser(req, res);
};
