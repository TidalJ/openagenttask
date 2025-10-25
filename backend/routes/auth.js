import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const router = express.Router();

const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 24 * 60 * 60 * 1000,
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

router.post("/login", async (req, res) => {
    const { name, password } = req.body;

    const user = await pool.query(
        "SELECT * FROM admins WHERE name = $1",
        [name]
    );

    if (user.rows.length === 0) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    // const newPassword = await bcrypt.hash(password, 10);

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
        // console.log(password, user.rows[0].password,newPassword);
        return res.status(401).json({ message: "Invalid password or username" });
    }

    const token = generateToken(user.rows[0].id);
    res.cookie("token", token, cookieOptions);
    res.status(200).json({ user: {id: user.rows[0].id, name: user.rows[0].name, admin: user.rows[0].admin} });
})

router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
    });
    res.status(200).json({ message: "Logged out successfully" });
});

export default router;