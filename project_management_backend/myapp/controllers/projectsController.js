const moment = require("moment");
const db = require("../db");


const getAllProjects = async (req, res) => {
    console.log("in get projects")
    try {
        const result = await db.query(`
            select * from projects
        `, []);
        res.status(200).json({ "result": result.rows });

        
    }
    catch (err) {

        console.log({ err });
        res.status(400).json({ "result": err });
    }
    
}

const getProjectByID = async (req, res) => {
    
    const id = req.params.id;
    console.log("in get project by id",{id})
    try {
        const result = await db.query(`
        select * from projects
        where id=$1
        `, [id,]);

        res.status(200).json({ "result": result.rows });
    }
    
    catch (err) {

    }

}


const createProject = async (req, res) => {
    
    console.clear();
    console.log("in create project");

    const body = req.body;
    const title = body["title"];
    const creation_date = body["creation_date"];
    const end_date = body["end_date"];
    const description = body["description"];
    const project_id= body["project_id"];
    // creation_date = moment(creation_date).format("YYYY-MM-DD HH:MM:SS");
   


    try {
        const result = await db.query(`
            insert into projects(title,creation_date,end_date,descrip)
            values($1,$2,$3,$4)
        
        `, [title, creation_date,end_date,description])
        
        res.status(200).json({result:result.rows})
    }
    catch (err) {
        console.log({ err });
        res.status(400).json({"err":err})
    }

}

const updateProject = async (req, res) => {
    console.log("in update project")
    const body = req.body;
    const id=body["id"];
    const description = body["description"];
    const title=body["title"];
    const end_date = body["end_date"];
    console.log({id, description, title, end_date,})
    try {
       const result=  await db.query(`
            update projects
            set descrip=$1,
            title=$2,
            end_date=$3
            where id=$4
        `, [description, title, end_date, id]);
            console.log({result})
        res.status(200).json({"message":"project updated successfully"})
    }
    catch (err) {
        
        res.status(400).json({"error":err})

    }


}

module.exports={getAllProjects, createProject, updateProject,getProjectByID}


