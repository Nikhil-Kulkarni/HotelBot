const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  
const queryDb = (query, params) => {
    client.query(query, params, (error, response) => {
        if (error) throw error;
        return response.rows;
    });
};

module.exports = {
    queryDb,
};

client.connect();