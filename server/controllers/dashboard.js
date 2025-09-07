// server/controllers/dashboard.js
const pool = require("../db/db.js");

const VisitorsController = async (req, res) => {
  try {
    const { startDate, endDate, bucket = "day" } = req.query;

    let groupBy;
    if (bucket === "week") groupBy = "WEEK(visited_at)";
    else if (bucket === "month") groupBy = "MONTH(visited_at)";
    else groupBy = "DATE(visited_at)";

    const [rows] = await pool.query(
      `SELECT ${groupBy} as bucket, COUNT(DISTINCT ip_address) as visitors
       FROM visitor_logs
       WHERE visited_at BETWEEN ? AND ?
       GROUP BY ${groupBy}
       ORDER BY bucket`,
      [startDate, endDate]
    );

    res.json({ bucket, startDate, endDate, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const ProductController = async (req, res) => {
  try {
    const { startDate, endDate, bucket = "day" } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: "startDate and endDate are required" });
    }

    let groupBy;
    let formatBucket = (row) => row.bucket; // default: no formatting

    if (bucket === "week") {
      groupBy = "WEEK(date)";
    } else if (bucket === "month") {
      groupBy = "MONTH(date)";
    } else {
      groupBy = "DATE(date)";
      // Format day as YYYY-MM-DD
      formatBucket = (row) => row.bucket.toISOString().split("T")[0];
    }

    const [rows] = await pool.query(
      `SELECT ${groupBy} as bucket, SUM(total_count) as count
       FROM product_trends
       WHERE date BETWEEN ? AND ?
       GROUP BY ${groupBy}
       ORDER BY bucket`,
      [startDate, endDate]
    );

    // Map rows to formatted bucket
    const data = rows.map((row) => ({
      bucket: formatBucket(row),
      count: Number(row.count) // optional: convert to number
    }));

    res.json({ bucket, startDate, endDate, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { VisitorsController, ProductController };
