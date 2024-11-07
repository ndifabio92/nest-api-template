export const EnvConfiguration = () => ({
    environment: process.env.ENVIRONMENT || 'dev',
    postgres: process.env.POSTGRES,
    port: process.env.PORT || 3000
})