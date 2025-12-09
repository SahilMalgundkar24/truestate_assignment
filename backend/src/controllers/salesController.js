import { fetchSales } from "../services/salesService.js";

export const getSales = async (req, res) => {
  try {
    const data = await fetchSales(req.query);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
