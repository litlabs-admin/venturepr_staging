const { buildBlogsIndexResponse } = require("../../lib/airtableBlogs.cjs");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed." });
    return;
  }

  try {
    const response = await buildBlogsIndexResponse(process.env);
    res.status(response.status).json(response.body);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: "Unable to load blog posts from Airtable.",
    });
  }
};
