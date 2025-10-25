import express from "express";
import pool from "../config/db.js";
import { authenticateToken, authorizeAdmin } from "../middleware/auth.js";

const router = express.Router();

// POST /api/contact - Save contact information to database (public endpoint)
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        message: "First name, last name, email, and message are required fields",
      });
    }
    // Combine first and last name to fit the 'name' column in the database
    const fullName = `${firstName} ${lastName}`;

    const result = await pool.query(
      "INSERT INTO contacts (name, email, phone, message) VALUES ($1, $2, $3, $4) RETURNING *",
      [fullName, email, phone || null, message]
    );
    res.status(201).json({
      message: "Contact information saved successfully",
      contact: result.rows[0],
    });
  } catch (error) {
    console.error("Error saving contact information:", error);
    res.status(500).json({
      message: "Internal server error while saving contact information",
    });
  }
});

// GET /api/contact - Get all contact information (admin only)
router.get("/", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, phone, message, status, created_at FROM contacts ORDER BY created_at DESC"
    );
    res.status(200).json({
      contacts: result.rows,
    });
  } catch (error) {
    console.error("Error fetching contact information:", error);
    res.status(500).json({
      message: "Internal server error while fetching contact information",
    });
  }
});

// PATCH /api/contact/:id - Update contact status
router.patch("/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }
    const result = await pool.query(
      "UPDATE contacts SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({
      message: "Contact status updated successfully",
      contact: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating contact status:", error);
    res.status(500).json({
      message: "Internal server error while updating contact status",
    });
  }
});

// DELETE /api/contact/:id - Delete a contact
router.delete("/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM contacts WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({
      message: "Internal server error while deleting contact",
    });
  }
});

export default router;
