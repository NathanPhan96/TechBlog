
const router = require('express').Router();
const { Comment, User } = require('../../models/');
const withAuth = require('../../utils/auth');

// TODO - create a POST route for creating a new comment
// This should be a protected route, so you'll need to use the withAuth middleware
router.post('/comment', withAuth, async (req, res) => {
    const body = req.body;
    try{
        const addComment = await Comment.create({
            body: req.body.body,
            userId: req.session.userId,
        });
        res.json(addComment);
    }catch(err){
        res.status(400).json(err);
        }
    });




module.exports = router;

