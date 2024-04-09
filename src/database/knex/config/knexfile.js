const path = require('node:path');
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, '..', '..', 'foodexplorer.db')
    },
    pool: {
      afterCreate: (conn, callBack) => conn.run('PRAGMA foreign_keys = ON', callBack)
    },
    migrations: {
      directory: path.resolve(__dirname, '..', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, '..', 'seeds')
    },
    useNullAsDefault: true,    
  },
};
