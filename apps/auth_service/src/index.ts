import express from "express";
import cors from "cors";
import {clerkMiddleware} from "@clerk/express";

const app = express();

app.use(
  cors(
    {origin:"*",
    // credential:true,
    }
  )
);

app.use(express());
app.use(clerkMiddleware());

app.get("/health",(req,res)=>{
  return res.status(200).json({
    status:"ok",
    uptime:process.uptime(),
    timestamp:new Date().toISOString(),
  });
});

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(8001, () => {
  console.log("Product service running on port 8001");
});


