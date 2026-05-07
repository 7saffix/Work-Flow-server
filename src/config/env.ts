import dotenv from "dotenv";
dotenv.config();

const requiredEnv: string[] = [
  "MONGO_URI",
  "PORT",
  "JWT_ACCESS_SECRET",
  "JWT_REFRESH_SECRET",
  "JWT_ACCESS_EXPIRES",
  "JWT_REFRESH_EXPIRES",
  "FRONTEND_URL",
];

let envVars: Record<string, string> = {};

requiredEnv.forEach((key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing env variable: ${key}`);
  }
  envVars[key] = value;
});

export default envVars;
