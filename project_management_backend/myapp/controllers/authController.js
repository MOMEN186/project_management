const db = require('../db');
const bcrypt = require('bcrypt');
const env = require('dotenv');
env.config();
const jwt = require('jsonwebtoken');

async function signup(req, res) {
  console.log('in signup controller');

  const body = req.body;
  const email = body['email'];
  const password = await bcrypt.hash(body['password'], 5);
  const first_name = body['first_name'];
  const last_name = body['last_name'];

  try {
    const result = await db.query(
      `
        insert into users(email,password_digest,first_name,last_name)
        values($1,$2,$3,$4)
    `,
      [email, password, first_name, last_name],
    );
    res.status(200).json({ message: 'email registerd ' });
  } catch (e) {
    console.log({ e });
    res.status(400).json({ message: 'cant register user' });
  }
}

async function isBlackListed(token) {
  
  
  try {
    const result = await db.query(`
      select * from blacklist
      where token=$1
    `, [token])
    console.log("result",result);
    if (result.rowCount === 0) return 0;
    else return 1;
  }
  catch (e) {
    console.log("in catch",{ e });
  }
}

async function login(req, res) {
  console.log("in login");

  const body = req.body;
  const email = body['email'];
  const password = body['password'];
  console.log({email,password})
  try {
    const result = await db.query(
      `
            select * from users 
            where email = $1
          `,
      [email],
    );

    if (result.rowCount === 0) res.status(404).json('an account with this email is  not found');
    const user_password = result.rows[0].password_digest;
    const userId = result.rows[0].id;
    const username = result.rows[0].username;
    const isMatch = await  bcrypt.compare(password,user_password);
    if (!isMatch) res.status(400).json('incorrect password');

    console.log(result.rows[0].cover_photo)
    
    const genToken = () => jwt.sign({ userID: result.rows[0].id }, '2000');
    let token = genToken();
    while (!isBlackListed(token)) {
      token = genToken();
    }
    
     res.status(200).json({...result.rows[0], token: token});

  } catch (e) {
    console.log({ e });
    res.status(500).json('cannot login');
  }
}

async function logout(req, res) {
  console.log("in logout")
  const headers = req.headers;
  const token = headers["token"];
  const userID = req.body["userID"];
  console.log({token,userID})
  try {
    const result = await db.query(`
      insert into blacklist(token,user_id)
      values($1,$2)
    `, [token,userID]);
   return res.status(200).json("logged out successfully");
  }
  catch (e) {
    console.log({ e });
    return res.status(400).json("failed logout");
  }


}


module.exports = { signup, login, logout };
