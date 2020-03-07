const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'smartbraindb'
  }
});

db.select('*').from('users').then(data => {
	console.log(data);
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=> { res.send('It is working!') })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImageEntries(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, ()=> { 
	console.log(`app is running on port ${process.env.PORT}`); 
})

//  // Load hash from your password DB.
//  bcrypt.compare("cats", '$2a$10$rfttTetxbDLlBZdbnkSOKuoUHCZ/M.p1ML0Q6MUJvfpUBN8snZ3EG', function(err, res) {
//      console.log('first guess', res)
//  });
//  bcrypt.compare("veggies", '$2a$10$rfttTetxbDLlBZdbnkSOKuoUHCZ/M.p1ML0Q6MUJvfpUBN8snZ3EG', function(err, res) {
//      console.log('second guess', res)
//  });

/*
/ --> res = this is working
/signin --> POST = succes/fail
/register --> POST = user
/profile/: userId --> GET = user
/image --> PUT --> user

*/
