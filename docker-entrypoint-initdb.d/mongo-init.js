use admin;
db = db.getSiblingDB('jts');
db.createUser(
    {
        user: 'jts',
        pwd: 'password',
        roles: [{ role: 'readWrite', db: 'jts' }]
    }
);
