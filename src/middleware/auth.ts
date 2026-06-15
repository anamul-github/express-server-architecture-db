import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";

const auth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
               //console.log("This is protected route");
    //console.log(req.headers.authorization);

    //1. Check if token is present in the header
    //2. Verify the token
    //3. If token is valid, get the user data from the database
    //4. Check if user is active

    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({
            success: false,
            message: "This is protected route",
        });
    }
    const decoded = jwt.verify(
        token as string, 
        config.secret as string
    ) as JwtPayload;
    //console.log(decoded);

    const userData = await pool.query(`
        SELECT * FROM users WHERE email = $1
        `,[decoded.email]);

    const user = userData.rows[0];

    //console.log(user);

    if(userData.rows.length === 0) {
        res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    if(!user.is_active) {
        res.status(403).json({
            success: false,
            message: "User is not active",
        });
    }

    req.user = decoded; // req : {user : {} }

    next();
        } catch (error) {
            next(error);
        }
}
}

export default auth;