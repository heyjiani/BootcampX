const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
  SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
  FROM teachers
  JOIN assistance_requests ON teacher_id = teachers.id
  JOIN students ON students.id = student_id
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name = '${process.argv[2]}'
  ORDER BY teacher;
`)
  .then((res) => {
    res.rows.forEach(row => {
      console.log(`${row.cohort}: ${row.teacher}`)
    })
  })
  .catch((err) => {
    console.log(err.stack);
  });