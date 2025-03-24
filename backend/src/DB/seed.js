const DBSQL=require('./mysqlDB.js')

const seedDB=async()=>{
    const users = [
        ['Alice', 25,'nothing', 'alice@example.com'],
        ['Bob', 30, 'nothing', 'bob@example.com'],
        ['Charlie', 35, 'nothing', 'charlie@example.com']
    ];

    const userQuery = 'INSERT INTO users (name, age,description, email) VALUES ?';

    DBSQL.query(userQuery, [users], (err, result) => {
        if (err) throw err;
        console.log('Users Inserted:', result.affectedRows);

        const entities = [
            ['Lost Phone', 'Black iPhone 12', 1],
            ['Wallet', 'Brown leather wallet', 2],
            ['Backpack', 'Blue Nike backpack', 3]
        ];

        const entityQuery = 'INSERT INTO entities (name, description, created_by) VALUES ?';

        DBSQL.query(entityQuery, [entities], (err, result) => {
            if (err) throw err;
            console.log('Entities Inserted:', result.affectedRows);
            db.end();
        });
    });
}