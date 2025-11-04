import express from "express";
import cors from "cors";

// making app

const app = express();


app.get("/", (req, res) => {
  res.send("<h1>Hello welcome new era</h1>")
});
