import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";


const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Root Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Express Server",
    author: "Next Level",
  });
});

// Database Initialization
const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        age INTEGER,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    console.log("Database initialized successfully!");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

initDB();

// Create User
app.post("/api/users", async (req: Request, res: Response) => {
  try {
    const { name, email, password, age } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO users (name, email, password, age)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, email, password, age]
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    console.error("Error creating user:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create user",
    });
  }
});

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});