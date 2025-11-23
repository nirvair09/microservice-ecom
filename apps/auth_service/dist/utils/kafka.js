"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.producer = void 0;
const kafka_1 = require("@repo/kafka");
const kafka = (0, kafka_1.createKafkaClient)("email-service");
exports.producer = (0, kafka_1.createProducer)(kafka);
