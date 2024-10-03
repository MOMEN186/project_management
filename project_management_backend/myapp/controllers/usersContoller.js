
const db = require("../db");


const getProjectUsers = async (req, res) => {
    const headers = req.headers;
    project_id = headers["project_id"];

    try {
        const result= await db.query(`
        select * from users 
        where project_id=$1
        
        `, [project_id]);
        res.status(200).json({"result":result.rows});
    }
    catch (e) {
        res.status(400).json({"message":"user not found"})
    }

}

const getTeamUsers = async (req, res) => {

    const headers = req.headers;
    const team_id = headers["team_id"];
   
    try {
        
        const result = db.query(`
        select * from  users 
        where team_id = $1
        `, [team_id]);
        res.status(200).json({"result":result})

    }
    catch (e) {
        console.log({ e });
        res.status(404).json({"message":"team not found"})

    }

}

const addUserToTeam = async (req, res) => {
    
    const headers = req.headers;
    const team_id = headers["team_id"];
    const user_id= headers["user_id"];
    
    try {
        const result = await db.query(`
        insert into teams(id,userid)
        values($1,$2)
        
        
        `, [team_id,user_id])
        res.status(200).json({"result":result})
    }
    catch (e) {
        console.log({ e });
        res.status(400).json({"message":"failed"})
    }



}


const removeUserFromProject = async (req, res) => {
    

} 


module.exports={getProjectUsers,getTeamUsers,addUserToTeam, removeUserFromProject}


