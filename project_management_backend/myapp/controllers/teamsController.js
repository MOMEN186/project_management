const moment = require('moment');
const db = require('../db');

const getAllTeams = async (req, res) => {
  console.log('in get all teams');
  const user_id = req.headers['user_id'] || req.headers['admin_id'];
  console.log({ user_id });
  try {
    const result = await db.query(
      `
        
        select * from teams        
        where user_id=$1 or adminid=$1
        `,
      [user_id],
    );
    res.status(200).json({ result: result.rows });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: 'failed to fetch' });
  }
};

const createTeam = async (req, res) => {
  console.log('in create team');

  const body = req.body;
  const team_name = body['team_name'];
  let creation_date = body['creation_date'];
  const admin_id = body['admin_id'];
  console.log({ team_name, admin_id, creation_date });

  creation_date = moment(creation_date).format('YYYY-MM-DD HH:MM:SS');
  console.log({ creation_date });
  try {
    await db.query(
      `
            insert into teams(team_name,adminid)
            values($1,$2)
        `,
      [team_name, admin_id],
    );

    res.status(200).json({ message: 'team created successfully' });
  } catch (err) {
    console.log({ err });
    res.status(200).json({ message: 'could not create team' });
  }
};

const updateTeam = async (req, res) => {
  console.log('in update team');
  const body = req.body;
  const id = body['id'];
  const team_name = body['team_name'];
  const user = body['admin_id'] || body['user_id'];
  const participants = body['participants'];
  console.log({ id, team_name, user, participants });
  try {
    const result = await db.query(
      `
                update teams
                set team_name=$1
                where id=$2
            `,
      [team_name, id],
    );

    addMembers(
      id,
      participants.map((participant) => participant.id),
    );

    res.status(200).json({ message: 'team modified successfully', result: result });
  } catch (err) {
    console.log({ err });
    return res.status(304).json({ message: 'not modified' });
  }
};

const getAllUsers = async (req, res) => {
  const team_id = req.headers.team_id;
  try {
    const result = await db.query(
      `
        select * from users
        where users.id not in (
            select teams_users.user_id from teams_users
            where teams_users.team_id=$1
        )
        `,
      [team_id],
    );
    console.log('getALlUSers', team_id, result.rowCount);

    res.status(200).json(result.rows);
  } catch (e) {
    res.status(400).json('cant get users');
    console.log('cant get users', { e });
  }
};

const addMembers = async (team_id, users_id) => {
  users_id.forEach(async (user_id) => {
    console.log('in user_id foreach', user_id);
    const result = await db.query(
      `
        
                insert into teams_users(user_id,team_id)
                values($1,$2)
                on conflict(user_id,team_id)
                do nothing
            `,
      [user_id, team_id],
    );
  });
};

const getTeamMembers = async (req, res) => {
  const team_id = req.params.id;
  console.log('in get team members');
  try {
    const result = await db.query(
      `
        
      select user_id,username,email from teams_users 
      inner join users on users.id = teams_users.user_id
      where team_id=$1
        `,
      [team_id],
    );
    res.status(200).json(result.rows);
  } catch (e) {
    console.log({ e });
    res.status(400);
  }
};

const getTeamByID = async (req, res) => {
  const id = req.params.id;
  console.log('--------get team by id-----------', { id });
  try {
    const result = await db.query(
      `
            select * from teams
            where id=$1    
        `,
      [id],
    );

    if (!result.rowCount) {
      res.status(404).json('team not found');
    }

    res.status(200).json(result.rows[0]);
  } catch (e) {
    console.log({ e });
    res.status(400).json('cant get team by specified team');
  }
};

module.exports = { getAllTeams, createTeam, updateTeam, getAllUsers, getTeamMembers, getTeamByID };
