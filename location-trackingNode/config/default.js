module.exports = {
  server: {
    port: process.env.PORT,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  database: {
    connection: {
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      host: process.env.DATABASE_HOST,
    },
    pool: {
      min: process.env.DATABASE_POOL_MIN || 2,
      max: process.env.DATABASE_POOL_MAX || 20,
    },
  },
};
