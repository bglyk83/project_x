import express from "express";
import postsRouter from "./router/posts.mjs";
import authRouter from "./router/auth.mjs";
import { config } from "./config.mjs";

const app = express();
app.use(express.json());

app.use("/posts", postsRouter);
app.use("/auth", authRouter);
//app.use("/auth/login", authRouter);
app.use((req, res, next) => {
  res.sendStatus(404);
});

/*
app.get("auth/login", (req, res) => {
  app.use("/auth", authRouter);
});
*/

app.listen(config.host.port, () => {
  console.log("SERVER 실행 중!!!!!");
});
