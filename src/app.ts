import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { pool } from "./db";
import { userRoute } from "./modules/user/user.route";


const app: Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// Root Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Express Server",
    author: "Next Level",
  });
});

app.use('/api/users',userRoute);



// Get All Users
app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    console.error("Error retrieving users:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
    });
  }
});

// Get Single User
app.get("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    console.error("Error retrieving user:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve user",
    });
  }
});

// Update User
app.put("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, password, age, is_active } = req.body;

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const result = await pool.query(
      `UPDATE users 
      SET 
      name = COALESCE($1, name), 
      password = COALESCE($2, password), 
      age = COALESCE($3, age), 
      is_active = COALESCE($4, is_active) 
      WHERE id = $5 RETURNING *`,
      [name, password, age, is_active, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    console.error("Error updating user:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to update user",
    });
  }
});

//
app.delete("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const result = await pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    console.error("Error deleting user:", error.message); 

    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
});

export default app;