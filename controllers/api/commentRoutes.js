
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
  
  router.post("/", withAuth, (req, res) => {
    Comment.create({ ...req.body, userId: req.session.userId })
      .then(newComment => {
        res.json(newComment);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });




module.exports = router;

