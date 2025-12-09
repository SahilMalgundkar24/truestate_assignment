import { fetchSales, fetchFilterMeta } from "../services/salesService.js";

export const getSales = async (req, res) => {
  try {
    const result = await fetchSales(req.query);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getSalesFilters = async (_req, res) => {
  try {
    const meta = await fetchFilterMeta();
    res.json({ success: true, data: meta });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};