import express from "express";
import bodyParser from "body-parser";

import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { logger } from "./logging.mjs";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

export const runServer = (port = 3000) => {
    app.listen(port, () => {
        logger.info(`Server is listening on port ${port}`);
    });
};

const buildErrorResponse = (statusCode, message) => ({
    error: {
        statusCode,
        message,
    },
});

const wrapResponse = (data) => ({
    data,
});
