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

async function login(req, res) {
  console.log("in login")

  const body = req.body;
  const email = body['email'];
  const password = body['password'];

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

    const isMatch = bcrypt.compare(password,user_password);

    if (!isMatch) res.status(400).json('incorrect password');
    
    const token = jwt.sign({ userID: result.rows[0].id }, '2000', { expiresIn: '1h' });

    res.status(200).json(token);
  } catch (e) {
    console.log({ e });
    res.status(500).json('cannot login');
  }
}

function logout(req, res) {
  req.logout();
  res.status(200);
}


module.exports = { signup, login, logout };
