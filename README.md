# gluckapi
api de prueba con node para gluck

# en el root, agregar db.js
const db = require('mongoose');

db.Promise = global.Promise;

async function connect(){

  const user = '';
  const pass = '';
  const host = 'cluster0-rtrgp.mongodb.net';
  const database = '';
  const uri = `mongodb+srv://${user}:${pass}@${host}/${database}?retryWrites=true&w=majority`;

  await db.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('[db connection] Database connected')
  })
  .catch( error => {
    console.error('[db connection] Connection failed', error.message) 
  });

}

module.exports = connect;

