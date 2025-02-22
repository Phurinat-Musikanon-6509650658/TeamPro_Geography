const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '141414',
    database:'my_database'
});

function query(queryString, callback)
{
    pool.getConnection((error, connection) => {
        if(error)
        {
            console.error('Error establishing database connection', error);
            callback(error, null);
            return;
        }

        connection.query(queryString,(err, results) => {
            connection.release();

            if(err)
            {
                console.error('Error executing database connection', err);
                callback(err, null);
                return;
            }

            callback(null,results)
        });
    });
}

module.exports = {
    query
}