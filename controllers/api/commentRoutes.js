
const router = require('express').Router();
const { Comment, User } = require('../../models/');
const withAuth = require('../../utils/auth');

// TODO - create a POST route for creating a new comment
// This should be a protected route, so you'll need to use the withAuth middleware
router.get("/", withAuth, async (req, res) => {
    const comment = await Comment.findAll({ ...req.body, userId: req.session.user})
    .then(allComments => {
      res.render(allComments.map(comment));
    })
    .catch(err => {
      res.status(500).json(err);
  });
  });
  
  router.post("/", withAuth, async (req, res) => {
    console.log(req.body)
    await Comment.create({ body: req.body.body, userId: req.session.userId })
      .then(newComment => {
        res.redirect("/")
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });




module.exports = router;

