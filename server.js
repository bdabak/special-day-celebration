const express = require("express");
const app = express();

const getImage = require("./routes/get-image");

//Middleware
app.use(express.json());

app.use("/api/getImage", getImage);

const port = process.env.PORT || 3050;

if (!port) {
  console.error("FATAL ERROR: Port number is not configured");
  process.exit(1);
}

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);

  //Get application environment
  console.log(`App is running in ${app.get("env")} environment`);
});
