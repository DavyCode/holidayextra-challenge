import dotenv from 'dotenv';

const dotenvResult = dotenv.config();
if (dotenvResult.error) {
  throw dotenvResult.error;
}

export const { PORT, JWT_SECRET, JWT_TOKEN_EXPIRE, DBURL } = process.env;
