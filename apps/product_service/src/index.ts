import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(8001, () => {
  console.log("Product service running on port 8001");
});
