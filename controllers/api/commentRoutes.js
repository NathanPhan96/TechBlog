const router = require("express").Router();
const { Comment } = require("../../models/");
const withAuth = require("../../utils/auth");

// TODO - create a POST route for creating a new comment
// This should be a protected route, so you'll need to use the withAuth middleware

router.post("/", withAuth, async (req, res) => {
    try {
      console.log(req.body);
      await Comment.create({
        body: req.body.body,
        userId: req.session.userId,
        postId: req.body["comment-id"],
      });
     
      res.redirect("/dashboard");
    } catch (err) {
      res.status(500).json(err);
    }
  });



module.exports = router;