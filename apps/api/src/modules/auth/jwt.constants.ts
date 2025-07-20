import { configDotenv } from 'dotenv';

configDotenv();

const secret = process.env.JWT_SECRET;

export const jwtConstants = {
  secret,
};
