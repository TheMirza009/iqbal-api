import { Pool } from "pg";

const pool = new Pool({
    host: 'localhost',
    port: '8888',
    database: 'Iqbal_api',
    user: 'postgres',
    password: '12345678910',
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log('DB connection failed:', err)
  } else {
    console.log('DB connected:', res.rows[0])
  }
})

export default pool;
