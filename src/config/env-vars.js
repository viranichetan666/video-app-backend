require('dotenv').config();

module.exports = {
    db: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOSTNAME,
        dialect: 'postgresql',
        logger: false
    },
    redis: {
        url: process.env.REDIS_URL
    },
    aws_access_key: process.env.AWS_ACCESS_KEY,
    aws_secret_key: process.env.AWS_SECRET_KEY,
    bucket: process.env.BUCKET,
}