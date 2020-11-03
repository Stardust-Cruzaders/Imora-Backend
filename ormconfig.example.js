module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "entities": [
		"./dist/models/*.js"
	],
  "migrations": [
    "./dist/database/migrations/*.js"
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations/"
  }
}
/* old configuration
{
  "type": "postgres",
	"host": "localhost",
  "port": 5434,
  "username": "postgres",
  "password": "docker",
  "database": "imora",
  "entities": [
		"./src/models/*.ts"
	],
  "migrations": [
    "./src/database/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations/"
  }
}
*/
