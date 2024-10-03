const moment = require("moment");
const db = require("../db");


const getAllTeams = async (req, res) => {
    
    try {
       const result= await db.query(`
        
        select * from teams        
        
        `, []);

        res.status(200).json({"result":result})
    }
    catch (err) {
        console.log({ err });
        res.status(500).json({"message":"failed to fetch"})
    }

}



const createTeam = async (req, res) => {

    const headers = req.headers;
    const name = headers["name"];
    let creation_date = headers["creation_date"];
    console.log({creation_date})

    creation_date = moment(creation_date).format("YYYY-MM-DD HH:MM:SS");
    console.log({creation_date})
    try {
        
        await db.query(`
            insert into teams(team_name,creation_date)
            values($1,$2)
        `, [name,creation_date]);

        res.status(200).json({ "message": "team created successfully" });
    }
    catch (err) {

        console.log({ err });
        res.status(200).json({"message":"could not create team"});
    }

}



const updateTeam = async (req, res) => {
    
    const headers=req.headers;
    const id = headers["id"];
    const column =JSON.parse( headers["column"]);
    const key = Object.keys(column)[0];
    const value = column[key];

    if (key === 'team_name') {
        try {
          const result=  await db.query(`
                update teams
                set ${key}=$1
                where id=$2
            `, [value, id]);
            res.status(200).json({ "message": "team modified successfully", "result": result });
            return res.end();
            
        }

        catch (err) {
            console.log({ err });
            res.status(304).json({ "message": "not modified" });
           return res.end();
        }
    }

    res.status(403).json({ "message": "Forbidden" });
  
}










module.exports={getAllTeams,createTeam,updateTeam}
