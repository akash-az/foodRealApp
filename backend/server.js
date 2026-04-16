// start server here , we import from app.js
require("dotenv").config(); // no need to save in a variable , just directly require it.But this should be at the top of file
//      Because by the time app.js runs, env vars aren’t loaded yet.
const app = require("./src/app"); // here same name is not required as exported name i.e const hero = require ..
const connectDB = require("./src/db/db");

connectDB();

app.listen(3000, () => {
  console.log("server is running on port 3000");
}); // used to start theb server
