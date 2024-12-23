const express = require("express");
require("dotenv").config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-config.json');
const app = express();
const port = 8080;
const passport = require("passport");
require("./config/passport")(passport);

const usersRouter = require("./router/users");
const productsRouter = require("./router/products");

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("This is the root route");
});

app.use("/api/v1/users", 
  // #swagger.tags = ['Users']
  usersRouter);
app.use("/api/v1/products",
  // #swagger.tags = ['Products']
  passport.authenticate("jwt", { session: false}),
  productsRouter);

app.listen(port, () => {
  console.log(`Backend Server is running at http://localhost:${port}`);
});
