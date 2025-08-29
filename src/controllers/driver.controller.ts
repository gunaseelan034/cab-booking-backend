import type { Request, Response } from "express";
import { DriverRepository } from "../repositories";
import { DriverService } from "../services";

const driverService = new DriverService(new DriverRepository());

export const getAllDrivers = async (req: Request, res: Response) => {
	await driverService.getAllDrivers(req, res);
};

export const createDriver = async (req: Request, res: Response) => {
	await driverService.createDriver(req, res);
};

export const getDriverBookings = async (req: Request, res: Response) => {
	await driverService.getDriverBooking(req, res);
};

export const driverBookingActions = async (req: Request, res: Response) => {
	await driverService.driverBookingActions(req, res);
};
