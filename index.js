const express = require("express");
const routes = require("./routes/routes");
const mongodb = require("mongodb");
const DB_URI =
 "mongodb+srv://apptodo:databaseoftodo@cluster0-r1zra.mongodb.net/test?retryWrites=true&w=majority";
const app = express();
 const HOSTNAME = "127.0.0.1";
 const PORT = 80;

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

console.log("checking connection with the DB...");
mongodb.MongoClient.connect(DB_URI, (error, dbClient) => {
  if (error) {
    console.log("error connecting to dbClient ", error);
    return;
  }
  // on successful connection
  // console.log('successfully connected to the database instance :-->', dbClient)
  console.log("Successfully connnected to the database instance :-)");
  const database = dbClient.db("todo-app");
  routes(app, database);
  // app.listen(PORT, HOSTNAME, () => {
  //  local host
  app.listen(port, () => {
    // heroku
    // console.log(`Server started at http://${HOSTNAME}:${PORT}/`);
    console.log(`Listening on ${port}`);
  });
});
