const db = require('mongoose');

// db.Promise = global.Promise;
// //mongodb+srv://db_blito_platzichat:3255Blito@cluster0-rtrgp.mongodb.net/db_telegromplatzi
// db.connect('mongodb+srv://db_blito_platzichat:3255Blito@cluster0-rtrgp.mongodb.net/db_telegromplatzi',{
//   useNewUrlParser: true,
// });

db.Promise = global.Promise;

async function connect(){

  const user = 'db_blito_platzichat';
  const pass = '3255Blito';
  const host = 'cluster0-rtrgp.mongodb.net';
  const database = 'db_gluck3d';
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





  