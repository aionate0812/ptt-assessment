const { app } = require("./app");
const port = process.env.PORT || 8002;
app.get("/", (req, res) => {
  res.json("Welcome back to Stonks");
});

app.listen(port, () => {
  console.log(`Listening. Stock Portfolio on port: ${port}`);
});
