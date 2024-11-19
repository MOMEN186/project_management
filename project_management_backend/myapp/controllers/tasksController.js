const { user } = require('pg/lib/defaults');
const db = require('../db');

const getAllTasks = async (req, res) => {
  const user_id = req.headers.user_id;

  try {
    const result = await db.query(
      `
      select * from tasks
      where assigneeid=$1
      `,
      [user_id],
    );
    res.status(200).json(result.rows);
  } catch (e) {
    console.log({ e });
    res.status(500).send('failed to store in database');
  }
};

const createTask = async (req, res) => {
  const body = req.body;

  const descrip = body['description'];
  const status = body['status'];
  const title = body['title'];
  const project_id = body['project_id'];
  const assignee_id = body['assignee_id'];
  let start_date = body['start_date'];
  let end_date = body['end_date'];
  try {
    // insert into table
    const result = await db.query(
      `
        insert into tasks(descrip,status,start_date,end_date,title,project_id,assigneeid)
        values($1,$2,$3,$4,$5,$6,$7)
      `,
      [descrip, status, start_date, end_date, title, project_id, assignee_id],
    );
    res.status(200).json({ message: 'ok' });
  } catch (e) {
    console.log({ e });
    res.status(400);
    res.json({ message: 'bad request' });
  }
};

const updateTask = async (req, res) => {
  const body = req.body;
  const id = body['id'];
  const descrip = body['description'];
  const status = body['status'];
  const end_date = body['end_date'];
  const title = body['title'];
  const project_id = body['project_id'];
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
      `,
      [id, descrip, status, end_date, title, project_id],
    );
    res.status(200).json({
      message: 'task updated successfully',
      data: {
        id: id,
        description: descrip,
        status: status,
        end_date: end_date,
        title: title,
        project_id: project_id,
      },
    });
  } catch (e) {
    console.log({ e });
    res.status(400).json({ message: 'error' });
  }
};

const deleteTask = async (req, res) => {
  const body = req.body;
  const task_id = body['id'];

  try {
    const result = db.query(
      `
      delete from tasks

      where id=$1
    

    `,
      [task_id],
    );

    res.status(200).json({ message: 'task deleted successfully' });
  } catch (e) {
    console.log({ e });

    res.status(400).json({ mesage: 'failed deleting task ' });
  }
};

const getTaskByID = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query(
      `
      select * from tasks 
      where id=$1
    `,
      [id],
    );
    res.status(200).json(result.rows);
  } catch (e) {
    console.log(e);
    res.status(400).json('cant get project by the specified id');
  }
};

const addComment = async (req, res) => {
  console.log('in add comment');
  const body = req.body;
  const task_id = req.params.id;
  const user_id = body['userID'];
  const content = body['content'];

  try {
    const result = await db.query(
      `
      insert into comments (task_id,user_id,content)
      values($1,$2,$3)
    `,
      [task_id, user_id, content],
    );

    res.status(200).json('comment added successfully');
  } catch (e) {}
};

const getComments = async (req, res) => {
  const taskId = req.params.id;

  try {
    const result = await db.query(
      `
      select 
      content,user_id, comments.id ,creation_date,profile_photo,username,task_id
      from comments 
          join users on  user_id = users.id
        
         where task_id=$1
    
    `,
      [taskId],
    );
    res.status(200).json(result.rows);
  } catch (e) {
    console.log(e);
    res.status(500).json('cant get comments for this task');
  }
};

const editComment = async (req, res) => {
  const taskId = req.params.id;
  const body = req.body;
  const commentId = body['commentID'];
  const comment = body['comment'];
  const userId = body['userId'];
  console.log('in edit comment', taskId, commentId, comment, userId);
  try {
    const result = await db.query(
      `
      update comments
      set 
      content=$1 
      where task_id=$2 and id=$3 and user_id = $4 
    `,
      [comment, taskId, commentId, userId],
    );
    res.status(200).json('comment updated successfully');
  } catch (e) {
    console.log(e);

    res.status(500).json('cant update comment');
  }
};

const deleteComment = async (req, res) => {
  const taskID = req.params.id;
  const body = req.body;
  const commentID = body['commentId'];
  const userID = body['userId'];

  console.log('in delete comment', taskID, commentID, userID);

  try {
    const result = await db.query(
      `
    
    delete from comments

    where id=$1 and task_id =$2 and user_id=$3

    `,
      [commentID, taskID, userID],
    );

    res.status(200).json('comment deleted successfully');
  } catch (e) {
    console.log(e);

    res.status(500).json('cant delete comment');
  }
};

const addFile = async (req, res) => {
  const id = req.params.id;
  const data = req.file;
  const userID = req.body['userId'];
  console.log(data)
  try {
    const result = await db.query(
      `
    
        insert into attachements(
          attachement,user_id,task_id,type,name )
        values($1,$2,$3,$4,$5)
    `,
      [data.buffer, userID, id, data.mimetype,data.originalname],
    );
    res.status(200).json('file uploaded successfully');
  } catch (e) {
    console.log({ e });

    res.status(500).json('cant upload file');
  }
};

const getFiles = async (req, res) => {
  const id = req.params.id;
    console.log("in get files")
  try {
    const result = await db.query(
      `
      select * from attachements
      where task_id=$1
    
    `,
      [id],
    );
    res.status(200).json(result.rows);
  } catch (e) {
    console.log(e);
    res.status(500).json('cant get files');
  }
};

const deleteFile = async (req, res) => {
  const att_id = req.body['attId'];
  const task_id = req.params.id;
  console.log("in delete files", req.body);
  try {
    const result = await db.query(
      `
      delete from attachements 
      where id=$1 and task_id=$2
    `,
      [att_id, task_id]
    );
    res.status(200).json('file deleted successfully');
  } catch (e) {
    console.log(e);
    res.status(500).json('cant delete file');
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskByID,
  addComment,
  getComments,
  editComment,
  deleteComment,
  addFile,
  getFiles,
  deleteFile,
};
