import inquirer from 'inquirer';
// import Connection from 'mysql2/typings/mysql/lib/Connection.js';
import db from './config/config.js';
import checkForQuit from './quitApp.js';

function viewRoles() {
  const role = [];
  db.query(`SELECT * FROM roles;`, (err, results) => {
    if (err) throw err;
    results.forEach((result) => {
      role.push({ name: result.title, value: result.id });
    });
  });
  return role;
}

function viewDepartment() {
  const departments = [];
  db.query(`SELECT * FROM department`, (err, results) => {
    if (err) throw err;
    results.forEach((result) => {
      departments.push({
        name: result.department_name,
        value: result.id,
      });
    });
  });
  return departments;
}

function selectManager() {
  const people = [];
  const sql = `(SELECT * FROM employee WHERE role_id = 1)`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    results.forEach((result) => {
      people.push({ name: result.first_name, value: result.id });
    });
  });
  return people;
}
// NOTE: ADDS DEPARTMENT
const addDepartment = () => {
  const departmentQuestions = [
    {
      type: 'input',
      message: 'Enter the department name',
      name: 'department_name',
    },
  ];

  inquirer.prompt(departmentQuestions).then((answers) => {
    const sqlDepartment = `INSERT INTO department (department_name) VALUES(?)`;

    db.promise()
      .query(sqlDepartment, answers.department_name)
      .then(([results]) => {
        console.log('Successfully Added New Department');
      })
      .catch()
      .then(() => checkForQuit());
  });
};
//NOTE: ADDS ROLE
const addRole = () => {
  const roleQuestions = [
    {
      type: 'input',
      message: 'Enter the role you would like to add',
      name: 'title',
    },
    {
      type: 'input',
      message: 'What is the annual salary for this role?',
      name: 'salary',
    },
    {
      type: 'list',
      message: 'Select a department for this role',
      name: 'department_id',
      choices: viewDepartment(),
    },
  ];

  inquirer.prompt(roleQuestions).then((answers) => {
    let { title, salary, department_id } = answers;
    const sqlRole = `INSERT INTO roles (title, salary, department_id) VALUES(?, ?, ? );`;
    // employeeQuestions[2].choices.push({ name: title, value: (employeeQuestions[2].choices.at(2).value) += 101})
    db.promise()
      .query(sqlRole, [title, salary, department_id])
      .then(([results]) => {
        console.table('Successfully Added New Role To Database');
      })
      .catch(console.log())
      .then(() => checkForQuit());
  });
};
//NOTE: ADDS EMPLOYEE
const addEmployee = () => {
  const employeeQuestions = [
    {
      type: 'input',
      message: 'Enter the employees first name',
      name: 'first_name',
    },
    {
      type: 'input',
      message: 'Enter the employees last name',
      name: 'last_name',
    },
    {
      type: 'list',
      message: 'What is the employees role?',
      name: 'role_id',
      choices: viewRoles(),
    },
    {
      type: 'list',
      message: 'Choose this employees manager',
      name: 'manager_id',
      choices: selectManager(),
    },
  ];
  inquirer.prompt(employeeQuestions).then((answers) => {
    const { first_name, last_name, role_id, manager_id } = answers;
    const sqlEmployee = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)`;
    db.promise()
      .query(sqlEmployee, [first_name, last_name, role_id, manager_id])
      .then(([results]) => {
        console.log(`Welcome to the company!`);
      })
      .catch()
      .then(() => checkForQuit());
  });
};

const updateEmployee = () => {
  db.query(`(SELECT * FROM employee);`, (err, results) => {
    if (err) throw err;
    // console.table(results);
    inquirer
      .prompt([
        {
          name: 'chooseEmployee',
          type: 'list',
          message: 'Which employee would you like to update?',
          choices: function () {
            const employee = [];
            results.forEach((result) => {
              employee.push({
                name: `${result.first_name} ${result.last_name}`,
                value: result.id,
              });

              if (result.first_name === null) {
                employee.pop(result);
              }
            });
            return employee;
          },
        },

        {
          name: 'newEmployeeRole',
          type: 'list',
          message: 'Select a new role for this employee:',
          choices: viewRoles(),
        },
      ])
      .then((answers) => {
        const { newEmployeeRole, chooseEmployee } = answers;
        db.promise().query(`UPDATE employee SET role_id = ? WHERE id = ?;`, [
          newEmployeeRole,
          chooseEmployee,
        ]);
        console.log('Updated Employee');
        checkForQuit();
      });
  });
};

export { addDepartment, addRole, addEmployee, updateEmployee };
