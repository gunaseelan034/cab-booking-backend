import type express from "express";
import bookingRoutes from "./booking.routes";
import driverRoutes from "./driver.routes";
import riderRoutes from "./rider.routes";
import userRoutes from "./user.routes";

const initRoutes = (app: ReturnType<typeof express>) => {
	app.use("/api/v1", userRoutes);
	app.use("/api/v1", driverRoutes);
	app.use("/api/v1", riderRoutes);
	app.use("/api/v1", bookingRoutes);
};

export default initRoutes;
