const router = require("express").Router();
const { Post, User, Comment } = require("../../models/");
const withAuth = require("../../utils/auth");

// TODO - create a POST route for creating a new post
// This should be a protected route, so you'll need to use the withAuth middleware

router.post("/", withAuth, async (req, res) => {
  const body = req.body;
  try {
    await Post.create({
      title: req.body.title,
      body: req.body.body,
      userId: req.session.userId,
    });
    res.redirect("/dashboard");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", withAuth, async (req, res) => {
  try {
    const singlePost = await Post.findOne({
      where: { id: req.params.id },
      attributes: ["id", "body", "title", "createdAt"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["body"],
        },
      ],
    });
    const post = singlePost;
    res.render("single-post", {
      posts: post,
      id: req.params.id,
      body: req.body,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// TODO - create a PUT route for updating a post's title or body
// This should be a protected route, so you'll need to use the withAuth middleware

router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedBody = await Post.update(
      {
        body: req.body,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updatedBody) {
      res.status(404).json({ message: "invalid post" + req.params.id });
    }
    restore.status(200).json(updatedBody);
  } catch (err) {
    res.status(500).json(err);
  }
});

// TODO - create a DELETE route for deleting a post with a specific id
// This should be a protected route, so you'll need to use the withAuth middleware

router.post("/delete/:id", withAuth, async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletePost) {
      res
        .status(404)
        .json({ message: "There is no post with this id. Please try again!" });
      return;
    }
    res.redirect("/dashboard");
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
