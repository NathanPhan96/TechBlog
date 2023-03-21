const router = require("express").Router();
const { Post, Comment, User } = require("../models/");


router.get("/", async (req, res) => {


try {
  const postData = await Post.findAll({

    order: [["createdAt", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        order: [["createdAt", "DESC"]],
        include: [{ model: User, attributes: ["username"] }],
      },
    ],
  });
  const posts = postData.map((post) => post.get({ plain: true }));
  console.log(posts);
  res.render("homepage", {
    posts,
  });
} catch (err) {
  console.log(err, "stringerr");
  res.render("homepage", {
    posts: [],
  });
}
});


router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: ["title", "body", "id"],
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const post = postData.get({ plain: true });
    res.render("single-post", {
      post,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


  router.get("/login", (req, res) => {

  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {

  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }


  res.render("signup");
});

module.exports = router;



 