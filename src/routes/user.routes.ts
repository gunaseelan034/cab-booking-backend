import express from "express";
import { userController } from "../controllers";

const router = express.Router();

/**
 * Get all users
 */
router.get("/users", userController.getAllUsers);

/**
 * Create users
 */
router.post("/users", userController.createUsers);

export default router;
