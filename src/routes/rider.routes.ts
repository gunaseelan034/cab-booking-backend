import express from "express";
import { riderController } from "../controllers";

const router = express.Router();

/**
 * Get all riders
 */
router.get("/riders", riderController.getAllRiders);

/**
 * Create riders
 */
router.post("/riders", riderController.createRider);

/**
 * Get riders bookings
 */
router.get("/riders/:id/bookings", riderController.getRiderBookings);

/**
 * Create riders booking
 */
router.post("/riders/:id/bookings", riderController.createRiderBooking);

export default router;
