
const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

// TODO - create a POST route for creating a new post
// This should be a protected route, so you'll need to use the withAuth middleware
router.post('/', withAuth, async (req, res) => {
    const body = req.body;
    try {
        const submitPost = await Post.create({ body, userId: req.session.userid });
        console.log(" Here is what was posted", submitPost)
        res.json(submitPost);
    }catch (err) {
        console.log("Something went wrong", err);
        res.status(500).json(err);
    }
});

// TODO - create a PUT route for updating a post's title or body
// This should be a protected route, so you'll need to use the withAuth middleware
router.put('/:id', withAuth, async (req, res,) => {
    try{
        const updatedBody = await Post.update({ 
            body: req.body,
        },{
            where: {
            Id: req.params.id,
            }
        });
        if (!updatedBody) {
            res.status(404).json({ message: "invalid post" + req.params.id})
        }
        restore.status(200).json(updatedBody); 
    } catch (err) {
        res.status(500).json(err);
    }
    });

// TODO - create a DELETE route for deleting a post with a specific id
// This should be a protected route, so you'll need to use the withAuth middleware
router.delete('/:id', async (req, res) => {
    // delete on tag by its `id` value
    try {
      const deletePost = await Post.destroy({
        where : {
          id: req.params.id
        }
      });

    if (!deletePost) {
      res.status(404).json({ message: "There is no post with this id. Please try again!" });
      return;
    }
    res.status(200).json(deletePost);
  } catch (err) {
    res.status(500).json(err);
  }
  });
  
module.exports = router;
