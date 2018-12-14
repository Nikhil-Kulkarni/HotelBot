const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  
const queryDb = (query, params) => {
    try {
        client.query(query, params, (error, response) => {
            if (error) throw error;
            return response.rows;
        });
    } catch (e) {
        console.log(e);
        return [];
    }
};

module.exports = {
    queryDb,
};

await client.connect();