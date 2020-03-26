const ObjectID = require("mongodb").ObjectID;
const COLLECTION = "todo-collection";
module.exports = function(app, db) {

  app.post("/api/todos", (req, res) => {
    const body = req.body;
    if (body && body.caption) {
      const collection = db.collection(COLLECTION);
      collection
        .insert({
          
          caption: body.caption,
          isCompleted: "false"
        }) 
        .then(result => {
          res.send({
            status: "success",
            message: "1 record created",
            record: result.ops[0]
          });
        })
        .catch(err => {
          res.status(400).send({
            status: "error",
            message: err
          });
        });
    } else {

      res.status(400).send({
        status: "error",
        message: "caption cannot be empty"
      });
    }
  });

  

  app.get("/api/todos/:todoId?/:todoStatus?", (req, res) => {
    
    const collection = db.collection("todo-collection");
 
    const todoId = req.query.todoId;
    const todoStatus = req.query.todoStatus;

    if (todoStatus) {
      const findObj = { isCompleted: todoStatus };
      collection
        .find(findObj)
        .toArray()
        .then(data => {
          //console.log(data)
          res.send({
            message: "success",
            data: data
          });
        })
        .catch(err => {
          res.status(400).send({
            status: "error",
            message: err
          });
        });
    } else if (todoId) {
     
      const findObj = { _id: new ObjectID(todoId) };
      // console.log(findObj);
      collection
        .find(findObj)
        .toArray()
        .then(data => {
          //console.log(data)
          res.send({
            message: "success",
            data: data
          });
        })
        .catch(err => {
          res.status(400).send({
            status: "error",
            message: err
          });
        });
    } else {
     
      collection
        .find({})
        .toArray()
        .then(data => {
          res.send({
            message: "success",
            data: data
          });
        })
        .catch(err => {
        
          res.status(400).send({
            status: "error",
            message: err
          });
        });
    }
  });

 

  app.delete("/api/todos/:todoId?", (req, res) => {
   
    const collection = db.collection("todo-collection");
    const todoId = req.params.todoId;
    if (todoId) {
      const delObj = { _id: new ObjectID(todoId) };
      collection
        .deleteOne(delObj)
        .then(
          res.send({
            message: "success",
            deletedCount: "1"
          })
        )
        .catch(err => {
          res.status(400).send({
            status: "error",
            message: err
          });
        });
    } else {
      collection.remove({}).then(
        res.send({
          status: "success",
          message: "all todo cleared"
        })
      );
    }
  });

  app.put("/api/todos/:todoId", (req, res) => {
   
    const collection = db.collection("todo-collection");
    const todoId = req.params.todoId;

    if (todoId) {
      // const delObj = {'_id':new ObjectID(todoId)};
      collection
        .updateOne(
          { _id: new ObjectID(todoId) },
          { $set: { isCompleted: req.body.isCompleted } }
        )
        .then(
          res.send({
            message: "success",
            updatedCount: "1"
          })
        )
        .catch(err => {
          res.status(400).send({
            status: "error",
            message: err
          });
        });
    } else {
      collection.remove({}).then(
        res.send({
          status: "success",
          message: "all todo cleared"
        })
      );
    }
  });
};
