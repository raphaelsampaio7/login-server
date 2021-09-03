module.exports = [
  {
    "type": "postgres",
    "url": process.env.DATABASE_URL,

    "entities": [
      process.env.ENTITIES
    ],
    "migrations": [
      process.env.MIGRATIONS
    ],
    "cli": {
      "entitiesDir": "src/app/entity",
      "migrationsDir": "./src/shared/infra/typeorm/migrations",
      "subscribersDir": "src/app/subscriber"
    }
  }
]
