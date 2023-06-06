const express = require("express");
const app = express();
const port = 5050;

app.use(express.json());
const postRoutes = require("./postRoutes");


app.use("/posts", postRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
