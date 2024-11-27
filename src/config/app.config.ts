export const EnvConfiguration = () => ({
    environment: process.env.ENVIRONMENT || 'dev',
    host: process.env.DB_HOST,
    app_port: process.env.APP_PORT || 3000,
    db_port: process.env.DB_PORT,
    database: process.env.database,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: process.env.SYNCHRONIZE,
    jwt_secret: process.env.JWT_SECRET,
})