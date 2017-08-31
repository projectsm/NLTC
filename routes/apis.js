var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('apis', { title: 'NLTC | API' });
});

const { Pool } = require('pg');
const pool = new Pool({
	connectionString: 'postgres://postgres:postgres@localhost:5432/nltc'
});

/*################################# USERS ######################################*/

router.get('/users', function(req, res, next) {  
	pool.query('SELECT * FROM users')
	.then((data) => {
		res.json({
			status: 'success',
			data: data.rows,
			message: 'Retrieved all users'
		});
	})
	.catch((e) => {
		res.json({
			status: 'failed',
			data: [],
			message: 'Unable to retrieve user. '
		});		
	});	
});

router.get('/users/:id', function(req, res, next) {  
	var user_id = parseInt(req.params.id);
	pool.query('SELECT * FROM users WHERE id = $1', [user_id])
	.then((data) => {
		res.json({
			status: 'success',
			data: data.rows,
			message: 'Retrieved user'
		});
	})
	.catch((e) => {
		res.json({
			status: 'failed',
			data: [],
			message: 'Unable to retrieve user. '
		});		
	});	
});

router.post('/users', function(req, res, next) {
	// Note: use x-www-form-urlencoded in postman
	var user = {
		username: req.body.username,
		password: req.body.password,
		type: req.body.type,
		profile_id : '0'
	};	
	
	pool.query('INSERT INTO users (username, password, type, profile_id) VALUES ($1, md5($2), $3, $4)',[user.username, user.password, user.type, user.profile_id])
	.then((data) => {
		res.json({
			status: 'success',
			data: {
				username: user.username,
				type: user.type
			},
			message: 'User has been successfully saved.'
		});
	})
	.catch((e) => {
		console.error(e.stack);
		res.json({
			status: 'failed',
			data: [],
			message: 'Unable to save user.'
		});		
	});
});

router.put('/users', function(req, res, next) {
	// Note: use x-www-form-urlencoded in postman
	var user = {
		id: req.body.id,
		username: req.body.username,
		password: req.body.password,
		type: req.body.type,
		profile_id : req.body.profile_id
	};	
	
	pool.query('UPDATE users SET username=$1, password=md5($2), type=$3, profile_id=$4 WHERE id=$5',[user.username, user.password, user.type, user.profile_id, user.id])
	.then((data) => {
		res.json({
			status: 'success',
			data: {
				username: user.username,
				type: user.type
			},
			message: 'User has been successfully updated.'
		});
	})
	.catch((e) => {
		console.error(e.stack);
		res.json({
			status: 'failed',
			data: [],
			message: 'Unable to update user.'
		});		
	});
});

router.delete('/users', function(req, res, next) {
	// Note: use x-www-form-urlencoded in postman
	var user = {
		id: req.body.id
	};	
	
	pool.query('DELETE FROM users WHERE id=$1',[user.id])
	.then((data) => {
		res.json({
			status: 'success',
			data: user,
			message: 'User has been successfully removed.'
		});
	})
	.catch((e) => {
		console.error(e.stack);
		res.json({
			status: 'failed',
			data: [],
			message: 'Unable to remove user.'
		});		
	});
});

module.exports = router;
