const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db");

function auth(passport) {
    passport.serializeUser((user, done) => {
        done(null, user.id); // It's better to store just the user ID
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
            done(null, user.rows[0]);
        } catch (error) {
            done(error);
        }
    });

    passport.use(new LocalStrategy(
        {
            usernameField: 'email', // Ensure this matches your form field name
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                console.clear();
                console.log("in local strategy");
                
                const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
                
                if (result.rows.length === 0) {
                    return done(null, false, { message: 'Incorrect email.' });
                }

                const user = result.rows[0];
                console.log({user})
                const isMatch = await bcrypt.compare(password, user.password_digest);
                    console.log({isMatch})
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Incorrect password.' });
                }
            } catch (error) {
                console.log({error})
                return done(error);
            }
        }
    ));
}

module.exports = { auth };