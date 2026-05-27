import mysql from 'mysql2/promise';

async function run() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'zooapp',
    password: 'Zoo@12345',
    database: 'zoo_management',
  });

  try {
    await connection.query('ALTER TABLE tickets ADD COLUMN visitor_name VARCHAR(255)');
    console.log('Successfully added visitor_name to tickets table');
  } catch (err) {
    if (err.code === 'ER_DUP_FIELDNAME') {
      console.log('visitor_name column already exists');
    } else {
      console.error('Error altering table:', err);
    }
  } finally {
    await connection.end();
  }
}

run();
