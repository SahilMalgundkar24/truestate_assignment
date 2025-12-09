import { supabase } from "../utils/supabaseClient.js";

const parseCsv = (value) =>
  typeof value === "string" && value.length
    ? value.split(",").map((v) => v.trim()).filter(Boolean)
    : [];

const buildAgeOrFilter = (ageRanges = []) => {
  const clauses = ageRanges
    .map((range) => {
      if (range.includes("+")) {
        const min = Number(range.replace("+", ""));
        return `age.gte.${min}`;
      }
      const [min, max] = range.split("-").map((n) => Number(n));
      if (Number.isFinite(min) && Number.isFinite(max)) {
        return `and(age.gte.${min},age.lte.${max})`;
      }
      return null;
    })
    .filter(Boolean);

  return clauses.length ? clauses.join(",") : null;
};

const buildDateRange = (startDate, endDate) => {
  const range = {};
  if (startDate) range.gte = startDate;
  if (endDate) range.lte = endDate;
  return range;
};

export const fetchSales = async (query) => {
  const {
    search,
    regions,
    genders,
    ageRanges,
    categories,
    tags,
    paymentMethods,
    startDate,
    endDate,
    sortBy = "date",
    sortDir = "desc",
    page = 1,
    pageSize = 10,
  } = query;

  const pageNumber = Number(page) || 1;
  const limit = Number(pageSize) || 10;
  const from = (pageNumber - 1) * limit;
  const to = from + limit - 1;

  let request = supabase
    .from("mainDataset")
    .select("*", { count: "exact" });

  
  if (search) {
    const q = search.trim();
    const isNumeric = /^[0-9]+$/.test(q);
    const conditions = [`customer_name.ilike.%${q}%`];
    // Only hit phone_number when the query is numeric to avoid cast parse errors
    if (isNumeric) {
      conditions.push(`phone_number.eq.${q}`);
    }
    request = request.or(conditions.join(","));
  }

  
  const regionList = parseCsv(regions);
  if (regionList.length) {
    request = request.in("customer_region", regionList);
  }

  const genderList = parseCsv(genders);
  if (genderList.length) {
    request = request.in("gender", genderList);
  }

  const categoryList = parseCsv(categories);
  if (categoryList.length) {
    request = request.in("product_category", categoryList);
  }

  const paymentList = parseCsv(paymentMethods);
  if (paymentList.length) {
    request = request.in("payment_method", paymentList);
  }

  const tagList = parseCsv(tags);
  if (tagList.length) {
    request = request.overlaps("tags", tagList);
  }

  
  const ageRangeList = parseCsv(ageRanges);
  const ageFilter = buildAgeOrFilter(ageRangeList);
  if (ageFilter) {
    request = request.or(ageFilter);
  }

 
  if (startDate || endDate) {
    const range = buildDateRange(startDate, endDate);
    if (range.gte) request = request.gte("date", range.gte);
    if (range.lte) request = request.lte("date", range.lte);
  }

  
  const normalizedSort = sortBy || "date";
  const normalizedDir = sortDir === "asc" ? "asc" : "desc";
  const sortMap = {
    date: "date",
    quantity: "quantity",
    customer_name: "customer_name",
  };
  const sortColumn = sortMap[normalizedSort] || "date";
  request = request.order(sortColumn, { ascending: normalizedDir === "asc" });

       
  request = request.range(from, to);

  const { data, error, count } = await request;
  if (error) throw new Error(error.message);

  return { data, count: count ?? 0 };
};

export const fetchFilterMeta = async () => {
  const distinct = async (column) => {
    const { data, error } = await supabase
      .from("mainDataset")
      .select(`${column}`, { distinct: true });
    if (error) throw new Error(error.message);
    return Array.from(
      new Set(
        (data || [])
          .map((row) => row[column])
          .filter((v) => v !== null && v !== undefined && `${v}`.trim() !== "")
      )
    );
  };

  const distinctTags = async () => {
    const { data, error } = await supabase
      .from("mainDataset")
      .select("tags", { distinct: true });
    if (error) throw new Error(error.message);

    const flattened = (data || []).flatMap(({ tags }) => {
      if (Array.isArray(tags)) return tags;
      if (typeof tags === "string")
        return tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
      return [];
    });

    return Array.from(new Set(flattened));
  };

  const [regions, genders, categories, paymentMethods, tags] = await Promise.all(
    [
      distinct("customer_region"),
      distinct("gender"),
      distinct("product_category"),
      distinct("payment_method"),
      distinctTags(),
    ]
  );

  return { regions, genders, categories, paymentMethods, tags };
};
