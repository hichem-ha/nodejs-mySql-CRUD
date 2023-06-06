const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "posts",
  authPlugins: {
    mysql_native_password: () => require('mysql2/lib/auth/plugins/mysql_native_password'),
  },
});
module.exports=pool