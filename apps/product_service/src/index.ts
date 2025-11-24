import express,{NextFunction,Request,Response} from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import productRouter from "./routes/product.route";
import categoryRouter from "./routes/category.route";

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
// app.get("/", (req, res) => {
//   res.json({ status: "ok" });
// });

// app.listen(3001, () => {
//   console.log("Product service running on port 8001");
// });

app.get("/health", (req, res) => {
  return res.status(200).json({ status: "ok",uptime:process.uptime(),timestamp:Date.now().toString()  });
});

app.use("/product",productRouter);
app.use("/category",categoryRouter);

app.use((err:any,
  req:Request,
  res:Response,
  next:NextFunction
)=>{
  console.log(err);
  return res.status(500).json({message:"Something went wrong"});
});

const startProductService=async()=>{
  try {
    // Promise.all([await producer.connect(),await consumer.connect()]);

    app.listen(3002,()=>{
      console.log("Product service running on port 3002");
    })
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};


startProductService();