const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "posts",
  authPlugins: {
    mysql_native_password: () => require('mysql2/lib/auth/plugins/mysql_native_password'),
  },
}
);
// Create a new post
const createPost = async (req, res) => {
    try {
      const { disc} = req.body;
      const connection = await pool.getConnection();
      const [result] = await connection.query('INSERT INTO post (disc) VALUES (?)', [disc]);
      connection.release();
      res.json({ id: result.insertId, disc});
    } catch (err) {
      console.error('Error creating post:', err);
      res.status(500).send('Error creating post');
    }
  };
  
  // Get all posts
  const getAllPosts = async (req, res) => {
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query('SELECT * FROM post');
      connection.release();
      res.json(results);
    } catch (err) {
      console.error('Error retrieving post:', err);
      res.status(500).send('Error retrieving post');
    }
  };
  
  // Get a single post by ID
  const getPostById = async (req, res) => {
    try {
      const postId = req.params.id;
      const connection = await pool.getConnection();
      const [results] = await connection.query('SELECT * FROM post WHERE id = ?', [postId]);
      connection.release();
      if (results.length === 0) {
        return res.status(404).send('Post not found');
      }
      res.json(results[0]);
    } catch (err) {
      console.error('Error retrieving post:', err);
      res.status(500).send('Error retrieving post');
    }
  };
  
  // Update a post by ID
  const updatePostById = async (req, res) => {
    try {
      const postId = req.params.id;
      const { disc } = req.body;
      const connection = await pool.getConnection();
      await connection.query('UPDATE post SET disc = ? WHERE id = ?', [disc, postId]);
      connection.release();
      res.json({ id: postId, disc }); // Fixed: Changed `body` to `disc`
    } catch (err) {
      console.error('Error updating post:', err);
      res.status(500).send('Error updating post');
    }
  };
  
  
  // Delete a post by ID
  const deletePostById = async (req, res) => {
    try {
      const postId = req.params.id;
      const connection = await pool.getConnection();
      await connection.query('DELETE FROM post WHERE id = ?', [postId]);
      connection.release();
      res.json({ id: postId, message: 'Post deleted successfully' });
    } catch (err) {
      console.error('Error deleting post:', err);
      res.status(500).send('Error deleting post');
    }
  };
  
  module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePostById,
    deletePostById,
  };