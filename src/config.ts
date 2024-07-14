import dotenv from "dotenv";
dotenv.config();
const defaultPort = 3000;
const config ={
    port:process.env.PORT?process.env.PORT:defaultPort,
    jwt: {
        secret: process.env.JWT_SECRET,
        accessTokenExpiryMS: "100d",
        refreshTokenExpiryMS: 300000,
    }
};
export default config;