import "dotenv/config";

const port = Number(process.env.PORT ?? 3000);

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required");
}

export const env = {
    PORT: Number.isInteger(port) && port > 0 ? port : 3000,
    DATABASE_URL: process.env.DATABASE_URL,
};