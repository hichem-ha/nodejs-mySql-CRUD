const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
} = require("./postController");


// Get all posts
router.get("/getposts", getAllPosts);

// Create a new post
router.post("/addpost", createPost);

// Get a single post by ID
router.get("/post/:id", getPostById);

// Update a post by ID
router.put("/updatepost/:id", updatePostById);

// Delete a post by ID
router.delete("/deletepost/:id", deletePostById);

module.exports = router;
