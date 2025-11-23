"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clerk_1 = __importDefault(require("../utils/clerk"));
const kafka_1 = require("../utils/kafka");
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    const users = await clerk_1.default.users.getUserLise();
    res.status(200).json(users);
});
router.get("/:id", async (req, res) => {
    const user = await clerk_1.default.users.getUserById(req.params.id);
    res.status(200).json(user);
});
router.post("/", async (req, res) => {
    const newUser = req.body;
    const user = await clerk_1.default.users.createUser(newUser);
    kafka_1.producer.send("user-created", {
        value: {
            username: user.username,
            email: user.emailAddresses[0].emailAddress,
        },
    });
    res.status(201).json(user);
});
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const user = await clerk_1.default.users.deleteUser(id);
    kafka_1.producer.send("user-deleted", {
        value: {
            username: user.username,
            email: user.emailAddresses[0].emailAddress,
        },
    });
    res.status(200).json(user);
});
exports.default = router;
