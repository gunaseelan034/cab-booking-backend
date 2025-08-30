import express from "express";
import { driverController } from "../controllers";

const router = express.Router();

/**
 * Get all drivers
 */
router.get("/drivers", driverController.getAllDrivers);

/**
 * Create drivers
 */
router.post("/drivers", driverController.createDriver);

/**
 * Get all driver booking
 */
router.get("/drivers/:id/bookings", driverController.getDriverBookings);

/**
 * accept booking by driver
 */
router.post("/drivers/:id/bookings/:bookingId/actions", driverController.driverBookingActions);

export default router;
