const router = require('express').Router();
const { User } = require('../../models');

router.post('/', (req, res) => {
	User.create({
	  username: req.body.username,
	  password: req.body.password
	})
	  .then(dbUserData => {
		req.session.save(() => {
		  req.session.userId = dbUserData.id;
		  req.session.username = dbUserData.username;
		  req.session.loggedIn = true;
	
		  res.json(dbUserData);
		});
	  })
	  .catch(err => {
		console.log(err);
		res.status(500).json(err);
	  });
  });
  
  router.post('/login', (req, res) => {
	// expects {email: 'lernantino@gmail.com', password: 'password1234'}
	
	User.findOne({
	  where: {
		username: req.body.username
	  }
	}).then(dbUserData => {
		console.log(dbUserData.password)
	  if (!dbUserData) {
		res.status(400).json({ message: 'No user with that username!' });
		return;
	  }
  
	  const validPassword = dbUserData.checkPassword(req.body.password);
  
	  if (!validPassword) {
		res.status(400).json({ message: 'Incorrect password!' });
		return;
	  }
  
	  req.session.save(() => {
		req.session.userId = dbUserData.id;
		req.session.username = dbUserData.username;
		req.session.loggedIn = true;
	
		res.json({ user: dbUserData, message: 'You are now logged in!' });
	  });
	});
  });
  
  router.post('/logout', (req, res) => {
	if (req.session.loggedIn) {
	  req.session.destroy(() => {
		res.status(204).end();
	  });
	}
	else {
	  res.status(404).end();
	}
  });















module.exports = router;