"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_2 = require("@clerk/express");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*",
    // credential:true,
}));
app.use((0, express_1.default)());
app.use((0, express_2.clerkMiddleware)());
app.get("/health", (req, res) => {
    return res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});
app.get("/", (req, res) => {
    res.json({ status: "ok" });
});
app.listen(8001, () => {
    console.log("Product service running on port 8001");
});
