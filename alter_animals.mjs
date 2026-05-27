import mysql from 'mysql2/promise';

async function run() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'zooapp',
    password: 'Zoo@12345',
    database: 'zoo_management',
  });

  try {
    // 1. Alter table ENUM
    await connection.query("ALTER TABLE animals MODIFY COLUMN category ENUM('bird','mammal','reptile') NOT NULL");
    console.log('Successfully altered ENUM category in animals table to include reptile');

    // 2. Find any reptiles in the DB (based on name or species)
    const [rows] = await connection.query("SELECT id, name, species, category FROM animals");
    const reptiles = rows.filter(a => 
      ['snake', 'lizard', 'turtle', 'crocodile', 'alligator', 'gecko', 'iguana', 'chameleon', 'tortoise', 'python', 'cobra'].some(r => 
        a.name.toLowerCase().includes(r) || a.species.toLowerCase().includes(r)
      )
    );
    console.log('Found potential reptiles:', reptiles.map(r => r.name));
    
    if (reptiles.length > 0) {
      for (const r of reptiles) {
        await connection.query("UPDATE animals SET category = 'reptile' WHERE id = ?", [r.id]);
        console.log(`Updated ${r.name} to reptile`);
      }
    } else {
      console.log('No existing reptiles found in the database to update.');
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await connection.end();
  }
}

run();
