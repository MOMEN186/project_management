
const db = require("../db");

const getAllTasks =  async (req, res) => {
  console.log("in get all tasks");
    try {
      const result = await db.query("select * from tasks");
      res.status(200).json(result.rows);
    }
    catch (e) {
      console.log({ e });
      res.status(500).send("failed to store in database");
  
  
    }
}
  

const createTask= async (req, res) => {
  
  console.log("in create task")
  const body = req.body;
  
  const descrip = body["description"];
  const status = body["status"];
  const title = body["title"];
  const project_id = body["project_id"];
  let start_date = (body["start_date"]);
  let end_date = (body["end_date"]);
  console.log({descrip, status, start_date,end_date})
    // formate date and time
  // start_date = moment(start_date).format("YYYY-MM-DD HH:MM:SS")
  // end_date = moment(end_date).format("YYYY-MM-DD HH:MM:SS");
  
  
    try {
      // insert into table
      const result = await db.query(`
        insert into tasks(descrip,status,start_date,end_date,title,project_id)
        values($1,$2,$3,$4,$5,$6)
      `, [descrip, status, start_date, end_date,title,project_id]);
      res.status(200).json({ "message": "ok"});
  
    }
  
    catch (e) {
      console.log({ e });
      res.status(400);
      res.json({  "message": "bad request"});
    }
  
  }

  const updateTask = async (req, res) => {
    console.log(" in  update task")
    const body = req.body;
    const id = body['id'];
    const descrip = body["description"];
    const status = body["status"];
    const end_date = (body["end_date"]);
    const title = body["title"];
    const project_id=body["project_id"]
    try {
      const result = await db.query(
        `
      update tasks
      set descrip=$2,
       status=$3,
       end_date=$4,
       title=$5,
       project_id=$6
      where id=$1
      `, [id, descrip, status, end_date, title,project_id]);
        console.log({result})
      res.status(200).json(
        {
          "message": "task updated successfully",
          data: {
            id: id,
            description: descrip,
            status: status,
            end_date: end_date,
            title: title,
            project_id: project_id
          }
      });
    }
  
    catch (e) {
      console.log({ e });
      res.status(400).json({ "message": "error"});
    }
  }



const deleteTask = async (req, res) => {
  console.log("in delete task");
  const body = req.body;
  console.log({body})
  const task_id = body["id"];
  console.log({ task_id });
  
  try {
    const result = db.query(`
      delete from tasks

      where id=$1
    
    
    `, [task_id])

      res.status(200).json({"message":"task deleted successfully"})
  }
  catch (e) {

    console.log({e});

    res.status(400).json({"mesage":"failed deleting task "})
  }


  } 


  module.exports = { getAllTasks, createTask, updateTask ,deleteTask};