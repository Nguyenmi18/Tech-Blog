const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, (req, res) => {
  const body = req.body;
  Post.create({
    ...body,
    userId: req.session.userId,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.put("/:id", withAuth, (req, res) => {
 
  Post.update(
    req.body,
    {
      where: {
        id: req.params.id
      }
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res)=>{
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
})


module.exports = router;
