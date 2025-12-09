import { supabase } from "../utils/supabaseClient.js";

export const fetchSales = async (query) => {
  let request = supabase.from("mainDataset").select("*");

  // Later we will add search, filter, sorting & pagination here

  const { data, error } = await request;
  if (error) throw new Error(error.message);

  return data;
};
