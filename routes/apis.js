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


module.exports = router;
