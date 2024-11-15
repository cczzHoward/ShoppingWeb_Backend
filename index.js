const express = require("express");
const app = express();
const port = 8080;

const usersRouter = require("./router/users");
const productsRouter = require("./router/products");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("This is the root route");
});

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/products", productsRouter);

app.listen(port, () => {
  console.log(`Backend Server is running at http://localhost:${port}`);
});
