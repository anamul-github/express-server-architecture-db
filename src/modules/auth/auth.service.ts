import { pool } from "../../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUserIntoDB = async (payload: {email: string, password: string}) => {
    const {email,password} = payload;
    // 1. Check if the user exists in the database
    // 2. If user exists, compare the password with the hashed password in the database
    // 3. Generate Token 
    const userData = await pool.query(`
        SELECT * FROM users WHERE email = $1
        `, 
        [email]);

        if(userData.rows.length === 0) {
            throw new Error("User not found");
        }

        const user = userData.rows[0];

        const matchPassword = await bcrypt.compare(password, user.password);
        console.log(matchPassword);
        if(!matchPassword) {
            throw new Error("Invalid password");
        }

        //Generate Token

        const jwtPayload = {
            id: user.id,
            name: user.name,
            role: user.role,
            email: user.email,
            is_active: user.is_active

        }
        const accessToken = jwt.sign(jwtPayload, config.secret as string, {
            expiresIn: "1d"
        });

        const refreshToken = jwt.sign(jwtPayload, config.refresh_secret as string, {
            expiresIn: "1d"
        });

        return { accessToken,refreshToken };
};

export const authService = {
    loginUserIntoDB,
};