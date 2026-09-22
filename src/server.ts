import { env } from "./config/env.js";
import { connectDatabase, disconnectDatabase } from "./config/prisma.js";
import { app } from "./app.js";

const startServer = async () => {
    await connectDatabase();
    const server = app.listen(env.PORT, () => {
        console.log(`API listening on port ${env.PORT}`);
    });

    const shutdown = async () => {
        server.close(async () => {
            await disconnectDatabase();
            process.exit(0);
        });
    };

    process.once("SIGINT", shutdown);
    process.once("SIGTERM", shutdown);
};

startServer().catch(async (error) => {
    console.error("Failed to start API", error);
    await disconnectDatabase();
    process.exit(1);
});