import { Pool } from "pg";

const pool = new Pool({
   host:       process.env.DB_HOST,
   port:       process.env.DB_PORT,
   database:   process.env.DB_NAME,
   user:       process.env.DB_USER,
   password:   process.env.DB_PASSWORD
})

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log('DB connection failed:', err)
  } else {
    console.log('DB connected:', res.rows[0])
  }
})

export default pool;
