import type { Request, Response } from "express";
import { RiderRepository } from "../repositories";
import { RiderService } from "../services";

const riderService = new RiderService(new RiderRepository());

export const getAllRiders = async (req: Request, res: Response) => {
	await riderService.getAllRiders(req, res);
};

export const createRider = async (req: Request, res: Response) => {
	await riderService.createRider(req, res);
};

export const getRiderBookings = async (req: Request, res: Response) => {
	await riderService.getRiderBookings(req, res);
};

export const createRiderBooking = async (req: Request, res: Response) => {
	await riderService.createRiderBooking(req, res);
};
