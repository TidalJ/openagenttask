import jwt from "jsonwebtoken"
import pool from "../config/db.js"

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({ message: "Authentication required" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Fetch user from database to verify they still exist
    const userResult = await pool.query(
      "SELECT id, name, admin FROM admins WHERE id = $1",
      [decoded.id]
    )

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: "User not found" })
    }

    req.user = userResult.rows[0]
    next()
  } catch (error) {
    console.error("Authentication error:", error)
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}

const authorizeAdmin = (req, res, next) => {
  if (!req.user || !req.user.admin) {
    return res.status(403).json({ message: "Admin access required" })
  }
  next()
}

export { authenticateToken, authorizeAdmin }