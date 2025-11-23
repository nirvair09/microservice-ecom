import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import {clerkMiddleware} from "@clerk/express";
import { shouldBeUser } from "./middleware/authMiddleware";
import userRoute  from "./routes/user.route";

const app = express();

app.use(
  cors(
    {origin:"*",
    // credential:true,
    }
  )
);

app.use(express.json());
app.use(clerkMiddleware());

app.get("/health",(req,res)=>{
  return res.status(200).json({
    status:"ok",
    uptime:process.uptime(),
    timestamp:new Date().toISOString(),
  });
});

// app.get("/", (req, res) => {
//   res.json({ status: "ok" });
// });

app.use("/user",shouldBeUser,userRoute);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  return res
    .status(err.status || 500)
    .json({ message: err.message || "Inter Server Error!" });
});

// app.listen(3001, () => {
//   console.log("Product service running on port 8001");
// });


const startServer = async()=>{
  try {
    await 

    app.listen(3001,()=>{
      console.log("Auth service running on port 3001");
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();