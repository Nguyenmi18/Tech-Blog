const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post("/", withAuth, (req, res) => {
	const body = req.body;
	Comment.create({
	  ...body,
	  userId: req.session.userId,
	})
	  .then((dbPostData) => res.json(dbPostData))
	  .catch((err) => {
		console.log(err);
		res.status(500).json(err);
	  });
  });


module.exports = router;