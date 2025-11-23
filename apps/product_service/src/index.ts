import express,{NextFunction,Request,Response} from "express";
import cors from "cors";

const app = express();

app.use(
  cors(
    {origin:"*",
    // credential:true,
    }
  )
);

app.use(express());

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(3001, () => {
  console.log("Product service running on port 8001");
});


