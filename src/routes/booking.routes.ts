import express from "express";
import { bookingController } from "../controllers";

const router = express.Router();

/**
 * Get all bookings
 */
router.get("/bookings", bookingController.getAllBookings);

export default router;
