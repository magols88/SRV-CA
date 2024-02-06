// Middleware for authentication
async function auth(req, res, next) {
  try {
    const user = await cyclic.authenticate(req);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = auth;
