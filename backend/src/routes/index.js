import express from "express";
import { getSales, getSalesFilters } from "../controllers/salesController.js";

const router = express.Router();

router.get("/sales", getSales);
router.get("/sales/filters", getSalesFilters);

export default router;