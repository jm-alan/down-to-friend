module.exports = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  db: {
    username: process.env.USER,
    password: process.env.PASS,
    database: process.env.DATABASE,
    host: process.env.HOST
  },
  jwtConfig: {
    secret: process.env.JWT_SECRET,
    expiresIn: parseInt(process.env.JWT_EXPIRES_IN)
  }
};
