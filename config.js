module.exports = {
    root: process.cwd(),
    env: 'dev',
    security: {
        secretKey: 'hellosanbao',
        expiresIn: 10
    },
    db: {
        dbname:'hellosanbao_blog',
        host:'localhost',
        port:'3306',
        user:'root',
        password:'123456'
    }
}