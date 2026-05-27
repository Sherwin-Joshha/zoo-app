import mysql from 'mysql2/promise';

async function run() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'zooapp',
    password: 'Zoo@12345',
    database: 'zoo_management',
  });

  try {
    await connection.query("UPDATE users SET name = 'Badawala' WHERE email = 'visitor@example.com'");
    await connection.query("UPDATE users SET name = 'Raghavendra' WHERE email = 'admin@zoo.com'");
    console.log('Successfully updated user names');
  } catch (err) {
    console.error('Error updating user names:', err);
  } finally {
    await connection.end();
  }
}

run();
