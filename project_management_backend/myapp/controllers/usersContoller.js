const { query } = require('express');
const db = require('../db');

const getProjectUsers = async (req, res) => {
  const headers = req.headers;
  project_id = headers['project_id'];

  try {
    const result = await db.query(
      `
        select * from users 
        where project_id=$1
        
        `,
      [project_id],
    );
    res.status(200).json({ result: result.rows });
  } catch (e) {
    res.status(400).json({ message: 'user not found' });
  }
};

const getTeamUsers = async (req, res) => {
  const headers = req.headers;
  const team_id = headers['team_id'];

  try {
    const result = db.query(
      `
        select * from  users 
        where team_id = $1
        `,
      [team_id],
    );
    res.status(200).json({ result: result });
  } catch (e) {
    console.log({ e });
    res.status(404).json({ message: 'team not found' });
  }
};

const addUserToTeam = async (req, res) => {
  const headers = req.headers;
  const team_id = headers['team_id'];
  const user_id = headers['user_id'];

  try {
    const result = await db.query(
      `
        insert into teams(id,userid)
        values($1,$2)
        
        
        `,
      [team_id, user_id],
    );
    res.status(200).json({ result: result });
  } catch (e) {
    console.log({ e });
    res.status(400).json({ message: 'failed' });
  }
};

const removeUserFromProject = async (req, res) => {};

const uploadImage = async (req, res) => {
  console.log('in upload image');
  const image = req?.file;
  const userId = req.params.id;
   
  try {
    const result = await db.query(
      `
        update users 
        set
         ${image.fieldname}=$2,
         ${image.fieldname}_mime_type=$3
        where id=$1
        `,
      [userId, image.buffer, image.mimetype],
    );
    res.status(200).json('image uplaoded succesfully');
  } catch (e) {
    console.log(e);
    res.status(404);
  }
};

const deleteImage = async (req, res) => {
  const userId = req.params.id;
    const image = req?.file;
    console.log({image})
  try {
    const result = await db.query(
      `
            update users
            set 
            ${image}=null,
            ${image}_mime_type=null
            where id=$1
        `,
      [userId],
    );
    res.status(200);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};


const getImage = async (req, res) => {
    
    const userId = req.params.id;
    const image = req.headers.type;
    console.log("in get image")
    console.log({image})
    try {
        const result = await db.query(`
        select ${image}
        from users
        where id=$1
        `, [userId]);
        console.log("result.rows[0]",result.rows[0]);
        res.status(200).json(result.rows[0]);
    }
    catch (e) {
        console.log(e);
        res.status(500);
    }
}

const editUserInfo = async (req, res) => {

  const userId = req.params.id;
  const column = req.body.column;
  const value = req.body.value;
  const body = req.body;
  console.log("in edit user info",body);


  try {
    const result = await db.query(`
      update users
      set ${column}=$1
      where id=$2
    `, [value, userId]);

    res.status(200).json("user's info updated successfully");
  }
  catch (e) {
    console.log(e);
    res.status(500).json("cant edit user's info");
  }

}


const getUserInfo = async (req,res) => {
  const userId = req.params.id;
  console.log("in getUserInfo");

  try {

    const result = await db.query(`
        select 
        first_name,
        last_name,
        username,
        email,
        job_title,
        organization,
        department
        from users
        where id=$1 and
    `, [userId]);  
    console.log(result.rows[0])
    if (result.rowCount === 0) res.status(404).json("user not found");
    res.status(200).json(result.rows[0]);


   }
  catch (e) {
    console.log(e);
    res.status(500);
  }
}

module.exports = {
  getProjectUsers,
  getTeamUsers,
  addUserToTeam,
  removeUserFromProject,
  uploadImage,
    deleteImage,
  getImage,
  editUserInfo,
  getUserInfo,
};
