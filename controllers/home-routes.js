const router = require("express").Router();

const { Post, User, Comment } = require("../models");

router.get("/", async (req, res) => {
  try {

	const postData =  await Post.findAll({
		include: [User]
	});

	const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", {posts, loggedIn: req.session.loggedIn});
  } catch (err) {}
});

router.get("/posts/:id", async (req, res) => {
	try {
  
	  const postData =  await Post.findByPk(req.params.id, {
		  include: [User, 
		{
			model: Comment,
			include:[User]
		}]
	  });
  
	  const posts = postData.get({ plain: true });
  
	  res.render("comments", {posts, loggedIn: req.session.loggedIn});
	} catch (err) {}
  });



router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
