export default () => ({
    database: {
        url: process.env.DATABASE_URL || 'postgresql://username:password@localhost:5432/ibyiwacu?schema=public',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-here-change-this-in-production',
        expiresIn: '24h',
    },
}); 