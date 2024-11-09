const db = require("../db");


const getAllProjects = async (req, res) => {
    const headers = req.headers;
    const user = headers["manager_id"] || headers["user_id"];
    console.log({ user });
    try {
        const result = await db.query(`
            select * from projects
            where managerid=$1 or user_id=$1
        `, [user]);
        res.status(200).json(result.rows.map((row)=>({"id":row.id,"title":row.title})));
    }
    catch (err) {

        console.log({ err });
        res.status(400).json({ "result": err });
    }
    
}



const createProject = async (req, res) => {
    

    const body = req.body;
    const title = body["title"];
    const creation_date = body["creation_date"];
    const end_date = body["end_date"];
    const description = body["description"];
    const manager_id = body["manager_id"];

    // creation_date = moment(creation_date).format("YYYY-MM-DD HH:MM:SS");
   


    try {
        const result = await db.query(`
            insert into projects(title,creation_date,end_date,descrip,managerid)
            values($1,$2,$3,$4,$5)
        
        `, [title, creation_date,end_date,description,manager_id])
        
        res.status(200).json({result:result.rows})
    }
    catch (err) {
        console.log({ err });
        res.status(400).json({"err":err})
    }

}

const updateProject = async (req, res) => {
    const body = req.body;
    const id = body["id"];
    const manager_id = body["manager_id"];
    const description = body["description"];
    const title=body["title"];
    const end_date = body["end_date"];
    try {
       const result=  await db.query(`
            update projects
            set descrip=$1,
            title=$2,
            end_date=$3
            where id=$4 and managerid=$5
           
        `, [description, title, end_date, id,manager_id]);
        res.status(200).json({"message":"project updated successfully"})
    }
    catch (err) {
    console.log({err})
        res.status(400).json({"error":err})

    }


}


const deleteProject = async (req, res) => {
    const body = req.body;
    const id = body["id"];

    try {
        const result = await db.query(`
            delete from projects
            where id=$1
        `, [id]);
        res.status(200).json("projects deleted successfully")
    }
    catch (e) {
        console.log({ e });
        res.status(400).json("cant delete project")
    }


} 

const getProjectByID = async (req, res) => {
    
    const id = req.params.id;
    try {
        const result = await db.query(`
        select * from projects
        where id=$1
        `, [id]);
        res.status(200).json(result.rows[0]);
    }
    catch (e) {
        console.log({ e });
        res.status(400).json("cant get project by the specified id");
    }
}

module.exports = { getAllProjects, createProject, updateProject, deleteProject, getProjectByID };


