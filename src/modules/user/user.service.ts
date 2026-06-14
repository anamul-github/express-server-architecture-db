import { pool } from "../../db";
import type { IUSER } from "./user.interface";

const createUserIntoDB = async (payload:IUSER) => {
    const { name, email, password, age } = payload;

    if (!name || !email || !password) {
      return {
        success: false,
        message: "Name, email, and password are required",
      };
    }

    const result = await pool.query(
      `INSERT INTO users (name, email, password, age)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, email, password, age]
    );
    return result.rows[0];
};
export const userService = {
    createUserIntoDB,
};