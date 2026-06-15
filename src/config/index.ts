import dotenv from "dotenv";
import { connect } from "http2";
import path from "path";

dotenv.config({
    path: path.join(process.cwd(), ".env")
});

const config = {
    connectionString: process.env.CONNECTIONSTRING as string,
    port: process.env.PORT || 3000,
    secret: process.env.JWT_SECRET_KEY as string,
    refresh_secret: process.env.JWT_REFRESH_SECRET_KEY
};

export default config;