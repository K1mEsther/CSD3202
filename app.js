const mysql = require('mysql');

// Database connection configuration
const dbConfig = {
    host: 'esther-db.cfccqygekpem.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'esther2003',
    database: 'esther'
};

const connection = mysql.createConnection(dbConfig);

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');

    // Query the Students table
    connection.query('SELECT Students.StudentID, Students.FirstName,Students.LastName,Students.Gender, Students.DateOfBirth , Subject.subject_name FROM Students JOIN Subject ON Students.StudentID = Subject.subject_ID;', (error, results) => {
        if (error) {
            console.error('Error querying the database:', error.stack);
            return;
        }
        console.log('Results: ', JSON.stringify(results, null, 4));
        console.log('Total Record:',results.length)
        console.log('Female:',results.filter(c=>c.Gender === "Female").length)


        // Close the database connection
        connection.end(() => {
            console.log('Database connection closed.');
        });
    });
});
