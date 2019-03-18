// Update with your config settings.

module.exports = {

  development: {
    client: 'pg', //connect using postgres driver
    connection: 'postgres://postgres:admin@localhost/Dapo' //dapo name of the database
    },
    production: {
      client: 'pg',
      connection: process.env.DATABASE_URL
    },
};

  