import express, { type Application, type Request, type Response } from "express"
import {Pool} from "pg";

const app : Application = express();
const port = 3000;

app.get('/', (req : Request, res : Response) => {
  //res.send('Hello World!!');
  res.status(200).json({
    "message" : "Express Server",
    "author": "Next Level",
  });
});

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_i6oB1GDxZEAa@ep-solitary-flower-ajfyk6l4.c-3.us-east-2.aws.neon.tech/neondb?sslmode=require"
})

const initDB = async () => {
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        age INTEGER,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )`
    );
    console.log("Connected to the database successfully!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};
initDB();

app.post('/api/users',async(req:Request,res:Response)=>{
  //console.log(req.body);
  const {name,email,password,age} = req.body;

  const result = await pool.query(
    `INSERT INTO users (name, email, password, age) VALUES ($1, $2, $3, $4) RETURNING *`,
    [name,email,password,age]
  );
  //console.log(result.rows[0]);
  
  res.status(201).json({
    "message" : "User Created successfully",
    "data": result.rows[0]
  });
})

app.get('/api/users',async(req:Request,res:Response)=>{
  try {
    const result = await pool.query(
      `SELECT * FROM users`
    );
    res.status(200).json({
      success: true,
      message : "Users retrieved successfully",
      data: result.rows
    });
  } catch (error:any) {
    console.error("Error retrieving users:", error);
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
})

app.get('/api/users/:id',async(req:Request,res:Response)=>{
  const {id} = req.params;
  console.log(id);
  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE id = $1`,
      [id]
    );
    if(result.rows.length === 0){
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: result.rows[0]
    });
  } catch (error:any) {
    console.error("Error retrieving user:", error);
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})