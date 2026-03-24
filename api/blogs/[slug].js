const { buildBlogDetailResponse } = require("../../lib/airtableBlogs.cjs");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed." });
    return;
  }

  const slug = String(req.query?.slug ?? "").trim();

  try {
    const response = await buildBlogDetailResponse(slug, process.env);
    res.status(response.status).json(response.body);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: "Unable to load this blog post from Airtable.",
    });
  }
};
