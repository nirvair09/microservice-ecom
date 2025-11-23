"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("@clerk/express");
const clerkClient = (0, express_1.createClerkClient)({
    secretKey: process.env.CLERK_SECRET_KEY,
});
exports.default = clerkClient;
