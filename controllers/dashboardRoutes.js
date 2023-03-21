const router = require("express").Router();
const { Post, User, Comment } = require("../models/");
const withAuth = require("../utils/auth");


router.get("/", withAuth, async (req, res) => {

  try {
    const userPost = await Post.findAll({
      where: { userId: req.session.userId },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });
    const posts = userPost.map((post) => post.get({ plain: true }));
    console.log(JSON.stringify(posts), "posts");
    res.render("admin-all-posts", { layout: "dashboard", posts });
  } catch (error) {
    res.redirect("/login");
  }

});
router.get("/create", withAuth, async (req, res) => {
  res.render("admin-create-post", { layout: "dashboard" });
  
  });
  

router.get("/new", withAuth, async (req, res) => {
  res.render("new-post", { layout: "dashboard" });
});



module.exports = router;