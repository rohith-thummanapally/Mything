import mysql from 'mysql2/promise';

const db=await mysql.createConnection({
    'host':'localhost',
    'user':'root',
    'database':'mything',
    'waitForConnections': true,
    'port':3306,
    'dateStrings': true,
});


db.connect(err=>{
    if(err)
    {
        console.log('Database connection failed, please try again later');
    }
    else
    {
        console.log('Database connection is successfull.');
    }
});

export default db;