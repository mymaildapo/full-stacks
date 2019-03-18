const environment = process.env.NODE_ENV || 'development'; //to figuure out which connection we running in, are we on heroku or local
//development is from knexfile.js
//when are code is running its in development
//when we running production we are goin to connect to differnt databse

const config = require ('../knexfile'); // we require full object/code from knexfile.js, we bring knexfile
const environmentConfig = config[environment]// config for this page,we grab which one from line 1(process.env.NODE_ENV || 'development')

const knex = require('knex'); // we require knex
const connection = knex(environmentConfig);//after line 9 we pass it to knex which connect to the database

module.exports = connection; // now we export that connection so we can use it elsewhere /in another page


