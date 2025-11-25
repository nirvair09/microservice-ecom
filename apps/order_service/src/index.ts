import { clerkPlugin } from "@clerk/fastify";
import Fastify from "fastify";
import { shouldBeUser } from "./middlewares/authMiddleware";
import { orderRoute } from "./routes/order.routes";
import { consumer, producer } from "./utils/kafka";
import { connectOrderDB } from "@repo/order-db";
import { runKafkaSubscriptions } from "./utils/subscriptions";


const fastify=Fastify();

fastify.register(clerkPlugin);

fastify.get("/health",(request,reply)=>{
  return reply.status(200).send({
    status:"ok",
    uptime:process.uptime(),
    timestamp:Date.now(),
  });
});

fastify.get("/test",{preHandler:shouldBeUser},(request,reply)=>{
  return reply.send({
    message:"Order service is authenticated!",
    userId:request.userId
  });
});


fastify.register(orderRoute);

const startOrderService=async()=>{
  try {
    Promise.all([
      await connectOrderDB(),
      await producer.connect(),
      await consumer.connect(),
    ]);
    
    await runKafkaSubscriptions();
    await fastify.listen({port:3003});
    console.log("Order service is running on port 3003");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

