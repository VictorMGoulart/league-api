import express from "express";
import { router } from "./routes.js";

const app = express();

app.use(express.json());

app.use(router);

app.use((err, request, response, next) => {
    if (err instanceof Error) {
        return response.status(400).json({ error: err.message });
    }

    return response
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
});

app.listen(3000, () => console.log("Server is Running"));
