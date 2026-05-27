import mysql from 'mysql2/promise';

async function run() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'zooapp',
    password: 'Zoo@12345',
    database: 'zoo_management',
  });

  try {
    const [rows] = await connection.query("SELECT id, name, species, class FROM animals");
    const reptiles = rows.filter(a => 
      ['snake', 'lizard', 'turtle', 'crocodile', 'alligator', 'gecko', 'iguana', 'chameleon', 'tortoise'].some(r => 
        a.name.toLowerCase().includes(r) || a.species.toLowerCase().includes(r)
      )
    );
    console.log('Found potential reptiles:', reptiles);
    if (reptiles.length > 0) {
      for (const r of reptiles) {
        await connection.query("UPDATE animals SET class = 'reptile' WHERE id = ?", [r.id]);
        console.log(`Updated ${r.name} to reptile`);
      }
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await connection.end();
  }
}

run();
