import { createConsumer, createKafkaClient } from "@repo/kafka";

const kafka = createKafkaClient("email-service");
const consumer=createConsumer(kafka,"email-service");

const startEmailService=async()=>{

};

startEmailService();


