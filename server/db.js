import { Database } from '@sqlitecloud/drivers';

const db = new Database('sqlitecloud://cuyjjkhank.g3.sqlite.cloud:8860/db-my-crud?apikey=UjGssKdbbaFRnY76i4Hs9TF2fYMbYBisAOogWbk41fw', (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite.');
  }
});

export default db;