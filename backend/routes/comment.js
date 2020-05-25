const express = require('express');

const Comment = require('../models/comment');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();


router.post("", checkAuth, (req, res, next) => {
  console.log("Posted");
  const comment = new Comment({
    productId: req.body.productId,
    userId: req.body.userId,
    content: req.body.content
  });
  console.log("the comment is " + comment);
  //return  res.status(201).json({});
  comment.save().then(addedComment => {
    res.status(201).json({
      message: 'Comment Added successfully',
      commentId: addedComment._id
    });
  });
});

router.get("", (req, res, next) => {
  Comment.find().then(comments => {
    //console.log(products);
    res.status(200).json({
      message: 'Comments fetched successfully',
      comments: comments
    });
  });
});

router.delete('/:id', checkAuth, (req, res, next) => {
  Comment.deleteOne({ _id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Comment Deleted"});
  });
});

module.exports = router;
